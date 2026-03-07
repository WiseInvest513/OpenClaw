"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, FileText, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cryptoConfig, type CryptoPlatform } from "@/config/crypto";
import Link from "next/link";
import staticCrypto from "@/data/crypto.json";

type TocItem = { id: string; text: string; level: number };

type DocItem = { name: string; documentId: string };

type StaticDoc = { title: string; html: string };

function getStaticHtml(documentId: string): StaticDoc | null {
  const t = (staticCrypto as Record<string, StaticDoc>)[documentId];
  return t ?? null;
}

export default function CryptoPlatformPage() {
  const params = useParams();
  const platform = params.platform as string;
  const config = platform && platform in cryptoConfig ? cryptoConfig[platform as CryptoPlatform] : null;

  const [docs, setDocs] = useState<DocItem[]>([]);
  const [activeDoc, setActiveDoc] = useState<DocItem | null>(null);
  const [docTitle, setDocTitle] = useState<string>("");
  const [docHtml, setDocHtml] = useState<string | null>(null);
  const [docLoading, setDocLoading] = useState(false);
  const [docToc, setDocToc] = useState<TocItem[]>([]);
  const [zoomedImageSrc, setZoomedImageSrc] = useState<string | null>(null);
  const docContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!config) return;
    const items = config.docIds.map((id, i) => {
      const staticDoc = getStaticHtml(id);
      return {
        name: staticDoc?.title ?? `文档 ${i + 1}`,
        documentId: id,
      };
    });
    setDocs(items);
    if (items.length > 0) setActiveDoc(items[0]);
  }, [config]);

  useEffect(() => {
    if (activeDoc) {
      const staticDoc = getStaticHtml(activeDoc.documentId);
      if (staticDoc) {
        setDocHtml(staticDoc.html);
        setDocTitle(staticDoc.title);
        setDocLoading(false);
        setDocToc([]);
        return;
      }
      setDocLoading(true);
      setDocHtml(null);
      setDocTitle("");
      setDocToc([]);
      fetch(`/api/feishu/docs/${encodeURIComponent(activeDoc.documentId)}`)
        .then((r) => r.json())
        .then((d) => {
          setDocHtml(d.html ?? "");
          setDocTitle(d.title ?? activeDoc.name);
        })
        .catch(() => setDocHtml("<p>加载失败</p>"))
        .finally(() => setDocLoading(false));
    }
  }, [activeDoc?.documentId]);

  const handleDocContentClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const img = target.closest(".doc-image") as HTMLImageElement | null;
    if (img?.src) {
      e.preventDefault();
      setZoomedImageSrc(img.src);
    }
  }, []);

  useEffect(() => {
    if (!activeDoc || !docHtml || !docContentRef.current) return;
    const el = docContentRef.current;
    const headings = el.querySelectorAll("h1, h2, h3");
    const toc: TocItem[] = [];
    headings.forEach((h) => {
      const id = h.id || undefined;
      const text = h.textContent?.trim() || "";
      const level = parseInt(h.tagName[1], 10);
      if (id && text) toc.push({ id, text, level });
    });
    setDocToc(toc);
  }, [docHtml, activeDoc]);

  if (!config) {
    return (
      <div className="max-w-[1400px] w-full mx-auto px-4 py-12 text-center">
        <p className="text-slate-500 mb-4">未找到该平台</p>
        <Link href="/crypto" className="text-yellow-600 hover:underline">
          返回 Web3 实战
        </Link>
      </div>
    );
  }

  if (config.docIds.length === 0) {
    return (
      <div className="max-w-[1400px] w-full mx-auto px-4 py-12 text-center">
        <p className="text-slate-500 mb-4">教程筹备中，敬请期待</p>
        <Link href="/crypto" className="text-yellow-600 hover:underline">
          返回 Web3 实战
        </Link>
      </div>
    );
  }

  return (
    <>
      <Dialog open={!!zoomedImageSrc} onOpenChange={(open) => !open && setZoomedImageSrc(null)}>
        <DialogContent className="!max-w-[95vw] !w-[95vw] max-h-[95vh] p-2 bg-transparent border-0 shadow-none">
          <DialogTitle className="sr-only">图片放大预览</DialogTitle>
          {zoomedImageSrc && (
            <img
              src={zoomedImageSrc}
              alt="放大预览"
              className="w-full max-w-none max-h-[85vh] object-contain rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-1 flex flex-col md:flex-row gap-6">
        {/* 返回 + 左侧教程目录 */}
        <aside className="w-full md:w-64 shrink-0">
          <Link
            href="/crypto"
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-400 mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            返回 Web3 实战
          </Link>
          <nav className="sticky top-24 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/50 p-4">
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
              {config.name}
            </h2>
            <ScrollArea className="h-[calc(100vh-280px)]">
              <ul className="flex flex-col gap-0.5 pr-2">
                {docs.map((doc) => {
                  const isActive = activeDoc?.documentId === doc.documentId;
                  const displayName = doc.name.length > 14 ? doc.name.slice(0, 14) + "……" : doc.name;
                  return (
                    <li key={doc.documentId}>
                      <button
                        onClick={() => setActiveDoc(doc)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-2 group ${
                          isActive
                            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 font-medium"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                        }`}
                        title={doc.name}
                      >
                        <FileText className="w-4 h-4 shrink-0 flex-shrink-0 text-slate-400" />
                        <span className="min-w-0 flex-1 truncate text-left">{displayName}</span>
                        <span className="w-4 shrink-0 flex-shrink-0 flex items-center justify-center">
                          {isActive ? <ChevronRight className="w-4 h-4" /> : null}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </ScrollArea>
          </nav>
        </aside>

        {/* 中间内容区 + 右侧目录 */}
        <div className="flex-1 min-w-0 flex flex-col lg:flex-row gap-6">
          <main className="flex-1 min-w-0">
            <Card className="min-h-[600px] border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                {activeDoc && (
                  <>
                    <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-8">
                      <h1 className="text-3xl md:text-4xl font-bold font-nunito text-slate-900 dark:text-white leading-tight">
                        {docTitle || activeDoc.name}
                      </h1>
                    </div>
                    {docLoading ? (
                      <div className="flex items-center justify-center py-24">
                        <Loader2 className="w-10 h-10 animate-spin text-yellow-500" />
                      </div>
                    ) : docHtml ? (
                      <div
                        ref={docContentRef}
                        className="doc-content prose prose-slate dark:prose-invert prose-yellow max-w-none prose-headings:font-nunito prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-img:rounded-lg [&_.doc-heading]:scroll-mt-24 [&_.doc-image]:cursor-zoom-in"
                        dangerouslySetInnerHTML={{ __html: docHtml }}
                        onClick={handleDocContentClick}
                      />
                    ) : (
                      <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-500 text-center py-12">
                        暂无内容
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </main>
          {activeDoc && docToc.length > 0 && (
            <aside className="w-full lg:w-48 shrink-0 hidden lg:block">
              <nav className="sticky top-24 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/50 p-4">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-200 dark:border-slate-700">
                  本页目录
                </h3>
                <ul className="flex flex-col gap-0.5 text-sm">
                  {docToc.map((item) => {
                    const displayText = item.text.length > 12 ? item.text.slice(0, 12) + "……" : item.text;
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={`block py-1.5 text-slate-600 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors truncate ${
                            item.level === 1 ? "font-medium pl-0" : item.level === 2 ? "pl-3" : "pl-5"
                          }`}
                          title={item.text}
                        >
                          {displayText}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
