/**
 * 拉取 OKX 飞书文档并保存到 src/data/crypto.json
 * 需要先启动 dev server: npm run dev
 * 运行: node scripts/fetch-crypto-doc.mjs
 */
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const docId = "Vm8VdbTMxo78U6xtistc8uUAnTf";

const res = await fetch(`http://localhost:3000/api/feishu/docs/${docId}`);
const data = await res.json();
if (data.error) throw new Error(data.error);

const output = {
  [docId]: { title: data.title ?? "OKX 文档", html: data.html },
};
const outPath = join(root, "src/data/crypto.json");
writeFileSync(outPath, JSON.stringify(output, null, 0), "utf-8");
console.log("已保存到", outPath);
