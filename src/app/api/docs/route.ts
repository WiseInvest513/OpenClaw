import { NextResponse } from "next/server";
import { getFeishuDocument } from "@/lib/feishu";

export async function GET() {
  const files: { name: string; documentId: string; source: "feishu" }[] = [];
  try {
    const feishuIds = process.env.FEISHU_DOC_IDS?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
    for (const documentId of feishuIds) {
      try {
        const doc = await getFeishuDocument(documentId);
        const title = doc.data?.document?.title ?? documentId;
        files.push({ name: title, documentId, source: "feishu" });
      } catch {
        // skip failed feishu docs
      }
    }
    return NextResponse.json({ files });
  } catch (e) {
    console.error("[docs list]", e);
    return NextResponse.json({ error: "Failed to list docs" }, { status: 500 });
  }
}
