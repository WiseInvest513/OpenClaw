/**
 * 将文档 HTML 中的飞书图片缓存到本地 public/feishu/
 *
 * - 从 src/data/tutorials.json 和 src/data/crypto.json 中扫描图片 src
 * - 支持两种 src：
 *   1) /api/feishu/images/<fileToken> （推荐，新解析器生成）
 *   2) https://internal-api-drive-stream.feishu.cn/...authcode=... （旧静态数据，可能已过期，尽量不依赖）
 *
 * 输出：
 * - 下载图片到 public/feishu/<fileToken>.<ext>
 * - 将 JSON 内 HTML 的 img src 统一替换为 /feishu/<fileToken>.<ext>
 *
 * 运行：
 *   FEISHU_APP_ID=xxx FEISHU_APP_SECRET=yyy node scripts/cache-feishu-images.mjs
 */
import fs from "fs";
import path from "path";

const FEISHU_API = "https://open.feishu.cn/open-apis";

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function writeJson(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2), "utf8");
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function uniq(arr) {
  return Array.from(new Set(arr));
}

function extFromContentType(ct) {
  if (!ct) return "jpg";
  const t = ct.split(";")[0].trim().toLowerCase();
  if (t === "image/png") return "png";
  if (t === "image/webp") return "webp";
  if (t === "image/gif") return "gif";
  if (t === "image/svg+xml") return "svg";
  if (t === "image/jpeg" || t === "image/jpg") return "jpg";
  return "jpg";
}

async function getTenantToken(appId, appSecret) {
  const res = await fetch(`${FEISHU_API}/auth/v3/tenant_access_token/internal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
  });
  const data = await res.json();
  if (data.code !== 0 || !data.tenant_access_token) {
    throw new Error(data.msg || "Failed to get Feishu token");
  }
  return data.tenant_access_token;
}

async function getTmpDownloadUrl(tenantToken, fileToken) {
  const res = await fetch(
    `${FEISHU_API}/drive/v1/medias/batch_get_tmp_download_url?file_tokens=${encodeURIComponent(
      fileToken
    )}`,
    { headers: { Authorization: `Bearer ${tenantToken}` } }
  );
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`tmp_download_url fetch failed (${res.status}): ${text}`);
  }
  const data = await res.json();
  const url = data?.data?.tmp_download_urls?.[0]?.tmp_download_url;
  if (!url) throw new Error(`No tmp_download_url for token: ${fileToken}`);
  return url;
}

async function downloadToFile(url, filePath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download failed (${res.status})`);
  const ct = res.headers.get("content-type") || "";
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(filePath, buf);
  return ct;
}

function collectHtmlEntries(jsonObj) {
  // {id:{title,html}} -> [[id, title, html]]
  return Object.entries(jsonObj).map(([id, v]) => [id, v?.title, v?.html ?? ""]);
}

function extractFileTokensFromHtml(html) {
  const tokens = [];
  const re = /<img[^>]+src="([^"]+)"[^>]*>/g;
  let m;
  while ((m = re.exec(html))) {
    const src = m[1];
    const proxyPrefix = "/api/feishu/images/";
    if (src.startsWith(proxyPrefix)) {
      tokens.push(decodeURIComponent(src.slice(proxyPrefix.length)));
    }
  }
  return tokens;
}

function replaceProxySrcWithLocal(html, tokenToFile) {
  let out = html;
  for (const [token, fileName] of Object.entries(tokenToFile)) {
    const proxySrc = `/api/feishu/images/${encodeURIComponent(token)}`;
    const localSrc = `/feishu/${fileName}`;
    out = out.split(proxySrc).join(localSrc);
  }
  return out;
}

async function main() {
  const appId = process.env.FEISHU_APP_ID;
  const appSecret = process.env.FEISHU_APP_SECRET;
  if (!appId || !appSecret) {
    throw new Error("需要环境变量 FEISHU_APP_ID / FEISHU_APP_SECRET");
  }

  const root = process.cwd();
  const outDir = path.join(root, "public", "feishu");
  ensureDir(outDir);

  const tutorialsPath = path.join(root, "src", "data", "tutorials.json");
  const cryptoPath = path.join(root, "src", "data", "crypto.json");

  const tutorials = fs.existsSync(tutorialsPath) ? readJson(tutorialsPath) : {};
  const crypto = fs.existsSync(cryptoPath) ? readJson(cryptoPath) : {};

  const allHtml = [
    ...collectHtmlEntries(tutorials).map(([, , html]) => html),
    ...collectHtmlEntries(crypto).map(([, , html]) => html),
  ];

  const tokens = uniq(allHtml.flatMap(extractFileTokensFromHtml));
  console.log(`发现图片 token 数量: ${tokens.length}`);
  if (tokens.length === 0) {
    console.log("未发现 /api/feishu/images/<token> 形式的图片，无需缓存。");
    return;
  }

  const tenantToken = await getTenantToken(appId, appSecret);

  const tokenToFile = {};
  for (const t of tokens) {
    // 若已经存在任意后缀文件，直接复用
    const existing = fs
      .readdirSync(outDir)
      .find((name) => name.startsWith(`${t}.`));
    if (existing) {
      tokenToFile[t] = existing;
      continue;
    }

    try {
      const tmpUrl = await getTmpDownloadUrl(tenantToken, t);
      // 先下载到临时文件拿 content-type 决定扩展名
      const tempPath = path.join(outDir, `${t}.tmp`);
      const ct = await downloadToFile(tmpUrl, tempPath);
      const ext = extFromContentType(ct);
      const finalName = `${t}.${ext}`;
      const finalPath = path.join(outDir, finalName);
      fs.renameSync(tempPath, finalPath);
      tokenToFile[t] = finalName;
      console.log(`✓ 缓存图片: ${finalName}`);
    } catch (e) {
      console.warn(`✗ 缓存失败 token=${t}: ${e?.message || e}`);
      // 失败的 token 不替换，保留原代理链接（至少还有机会在线获取）
    }
  }

  // 替换 JSON 里的 HTML
  for (const [id, v] of Object.entries(tutorials)) {
    if (!v?.html) continue;
    tutorials[id].html = replaceProxySrcWithLocal(v.html, tokenToFile);
  }
  for (const [id, v] of Object.entries(crypto)) {
    if (!v?.html) continue;
    crypto[id].html = replaceProxySrcWithLocal(v.html, tokenToFile);
  }

  writeJson(tutorialsPath, tutorials);
  writeJson(cryptoPath, crypto);
  console.log("已更新 src/data/tutorials.json 与 src/data/crypto.json 的图片 src 为本地静态文件。");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

