import { NextRequest, NextResponse } from "next/server";
import { getFeishuToken } from "@/lib/feishu";

const FEISHU_API = "https://open.feishu.cn/open-apis";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ fileToken: string }> }
) {
  const { fileToken } = await params;
  const safe = decodeURIComponent(fileToken || "").trim();
  if (!safe) {
    return new NextResponse("Invalid file token", { status: 400 });
  }

  try {
    const token = await getFeishuToken();
    const res = await fetch(
      `${FEISHU_API}/drive/v1/medias/batch_get_tmp_download_url?file_tokens=${encodeURIComponent(
        safe
      )}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) {
      return new NextResponse("Failed to get image url", { status: 502 });
    }
    const data = (await res.json()) as {
      data?: { tmp_download_urls?: Array<{ tmp_download_url?: string }> };
      code?: number;
    };
    const url = data.data?.tmp_download_urls?.[0]?.tmp_download_url;
    if (!url) {
      return new NextResponse("Image not found", { status: 404 });
    }
    return NextResponse.redirect(url, {
      status: 302,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (e) {
    console.error("[feishu image]", safe, e);
    return new NextResponse("Server error", { status: 500 });
  }
}

