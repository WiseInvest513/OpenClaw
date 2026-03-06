import { NextRequest, NextResponse } from "next/server";
import {
  getFeishuDocument,
  getFeishuBlocks,
  feishuBlocksToHtml,
  getCachedDocHtml,
  setCachedDocHtml,
} from "@/lib/feishu";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  const { documentId } = await params;
  const safe = documentId.replace(/[^a-zA-Z0-9_-]/g, "");
  if (!safe) {
    return NextResponse.json({ error: "Invalid document" }, { status: 400 });
  }
  try {
    const doc = await getFeishuDocument(safe);
    const revisionId = doc.data?.document?.revision_id ?? 0;
    const cached = getCachedDocHtml(safe, revisionId);
    if (cached) {
      return NextResponse.json(
        { html: cached, title: doc.data?.document?.title ?? safe },
        {
          headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        }
      );
    }
    const blocks = await getFeishuBlocks(safe);
    const html = await feishuBlocksToHtml(safe, blocks);
    setCachedDocHtml(safe, revisionId, html);
    return NextResponse.json(
      { html, title: doc.data?.document?.title ?? safe },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (e) {
    console.error("[feishu doc]", safe, e);
    return NextResponse.json(
      { error: "Failed to fetch document" },
      { status: 500 }
    );
  }
}
