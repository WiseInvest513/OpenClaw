"use client";

import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, FileText, Loader2 } from "lucide-react";

type TocItem = { id: string; text: string; level: number };

type DocItem = {
  name: string;
  documentId: string;
  source: "feishu";
};

export default function TutorialsPage() {
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [activeDoc, setActiveDoc] = useState<DocItem | null>(null);
  const [docHtml, setDocHtml] = useState<string | null>(null);
  const [docLoading, setDocLoading] = useState(false);
  const [docToc, setDocToc] = useState<TocItem[]>([]);
  const docContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/docs")
      .then((r) => r.json())
      .then((d) => {
        const files = d.files ?? [];
        setDocs(files);
        if (files.length > 0) {
          setActiveDoc((prev) => (prev ? prev : files[0]));
        }
      })
      .catch(() => setDocs([]));
  }, []);

  useEffect(() => {
    if (activeDoc) {
      setDocLoading(true);
      setDocHtml(null);
      setDocToc([]);
      fetch(`/api/feishu/docs/${encodeURIComponent(activeDoc.documentId)}`)
        .then((r) => r.json())
        .then((d) => setDocHtml(d.html ?? ""))
        .catch(() => setDocHtml("<p>加载失败</p>"))
        .finally(() => setDocLoading(false));
    }
  }, [activeDoc]);

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

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-1 flex flex-col md:flex-row gap-6">
      {/* 左侧教程目录 */}
      <aside className="w-full md:w-64 shrink-0">
        <nav className="sticky top-24 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/50 p-4">
          <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
            教程目录
          </h2>
          <ScrollArea className="h-[calc(100vh-220px)]">
            <ul className="flex flex-col gap-0.5 pr-2">
              {docs.map((doc) => {
                const isActive = activeDoc?.documentId === doc.documentId;
                const displayName = doc.name.length > 14 ? doc.name.slice(0, 14) + "……" : doc.name;
                return (
                  <li key={doc.documentId}>
                    <button
                      onClick={() => setActiveDoc(doc)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between gap-2 group ${
                        isActive
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 font-medium"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                      }`}
                      title={doc.name}
                    >
                      <FileText className="w-4 h-4 shrink-0 text-slate-400" />
                      <span className="min-w-0 truncate">{displayName}</span>
                      {isActive && <ChevronRight className="w-4 h-4 shrink-0" />}
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
              {activeDoc ? (
                <>
                  <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-8">
                    <h1 className="text-3xl md:text-4xl font-bold font-nunito text-slate-900 dark:text-white leading-tight">
                      {activeDoc.name}
                    </h1>
                  </div>
                  {docLoading ? (
                    <div className="flex items-center justify-center py-24">
                      <Loader2 className="w-10 h-10 animate-spin text-yellow-500" />
                    </div>
                  ) : docHtml ? (
                    <div
                      ref={docContentRef}
                      className="doc-content prose prose-slate dark:prose-invert prose-yellow max-w-none prose-headings:font-nunito prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-img:rounded-lg [&_.doc-heading]:scroll-mt-24"
                      dangerouslySetInnerHTML={{ __html: docHtml }}
                    />
                  ) : (
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-500 text-center py-12">
                      暂无内容
                    </div>
                  )}
                </>
              ) : (
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-500 text-center py-24">
                  {docs.length === 0 ? "暂无云文档，请在 .env.local 中配置 FEISHU_DOC_IDS" : "请选择文档"}
                </div>
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
  );
}
