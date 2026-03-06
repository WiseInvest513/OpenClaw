import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import mammoth from "mammoth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  const decoded = decodeURIComponent(filename);
  const safe = decoded.replace(/\.\./g, "").replace(/[/\\]/g, "");
  if (!safe.endsWith(".docx")) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "public", "docs", safe);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  try {
    const result = await mammoth.convertToHtml(
      { path: filePath },
      {
        styleMap: [
          "p[style-name='1'] => h2:fresh",
          "p[style-name='2'] => h3:fresh",
          "p[style-name='标题 1'] => h1:fresh",
          "p[style-name='标题 2'] => h2:fresh",
          "p[style-name='标题1'] => h1:fresh",
          "p[style-name='标题2'] => h2:fresh",
        ],
      }
    );
    let html = result.value;
    // 飞书导出：将带 heading 书签的段落转为 h2
    html = html.replace(
      /<p><a id="(heading_\d+)"[^>]*><\/a><strong>([\s\S]*?)<\/strong><\/p>/g,
      '<h2 id="$1" class="doc-heading">$2</h2>'
    );
    // 单列表格（引用块）转为 blockquote
    html = html.replace(
      /<table><tr><td[^>]*>([\s\S]*?)<\/td><\/tr><\/table>/g,
      (_, content) => {
        const trimmed = content.trim();
        if (trimmed && !trimmed.includes("<table")) {
          return `<blockquote class="doc-quote">${trimmed}</blockquote>`;
        }
        return `<table><tr><td>${content}</td></tr></table>`;
      }
    );
    // 为无 id 的标题补充 id，便于目录锚点
    let idx = 0;
    html = html.replace(/<h([1-6])(\s[^>]*)?>/g, (m, lvl, attrs) => {
      const a = attrs || "";
      if (/id\s*=/.test(a)) return m;
      return `<h${lvl}${a} id="heading-${idx++}">`;
    });
    return NextResponse.json({
      html,
      title: safe.replace(/\.docx$/i, ""),
    });
  } catch (e) {
    console.error("[docs parse]", e);
    return NextResponse.json(
      { error: "Failed to parse document" },
      { status: 500 }
    );
  }
}
