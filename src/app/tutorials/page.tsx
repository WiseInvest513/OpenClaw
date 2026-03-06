"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronRight } from "lucide-react";

// Mock data for tutorials
const tutorialsList = [
  {
    id: "install-guide",
    title: "小白安装教程｜打造系列最落地教程！",
    date: "2026-02-24",
    category: "基础入门",
    content: "在这里将会展示详细的安装步骤，从环境准备到命令行工具的配置，确保你能顺利运行 OpenClaw。内容正在补充中..."
  },
  {
    id: "basic-concepts",
    title: "OpenClaw 基础概念解析",
    date: "2026-03-01",
    category: "基础入门",
    content: "理解 Agents, Skills, Tools 之间的区别和联系。内容正在补充中..."
  },
  {
    id: "first-skill",
    title: "如何编写你的第一个 Skill",
    date: "2026-03-05",
    category: "进阶开发",
    content: "实战演练：编写一个自动读取本地文件并总结摘要的简单 Skill。内容正在补充中..."
  }
];

export default function TutorialsPage() {
  const [activeTutorial, setActiveTutorial] = useState(tutorialsList[0]);

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-1 flex flex-col md:flex-row gap-8">
      {/* 左侧目录栏 */}
      <aside className="w-full md:w-80 shrink-0">
        <div className="sticky top-24">
          <h2 className="text-2xl font-bold font-nunito mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
            系列教程
          </h2>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="flex flex-col gap-2 pr-4">
              {tutorialsList.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTutorial(item)}
                  className={`text-left p-3 rounded-lg text-sm transition-all flex items-start justify-between group ${
                    activeTutorial.id === item.id
                      ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 font-medium"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex flex-col gap-1 pr-2">
                    <span className="line-clamp-2">{item.title}</span>
                    <span className="text-[10px] opacity-60 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {item.date}
                    </span>
                  </div>
                  {activeTutorial.id === item.id && (
                    <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </aside>

      {/* 右侧内容区 */}
      <main className="flex-1 min-w-0">
        <Card className="min-h-[600px] border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:hover:bg-yellow-900/50 border-0">
                  {activeTutorial.category}
                </Badge>
                <span className="text-sm text-slate-500 flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> 发布于 {activeTutorial.date}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-nunito text-slate-900 dark:text-white leading-tight">
                {activeTutorial.title}
              </h1>
            </div>
            
            <div className="prose prose-slate dark:prose-invert prose-yellow max-w-none">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                <p>{activeTutorial.content}</p>
                <p className="mt-4 italic opacity-70">提示：具体的 Markdown 内容渲染后续将接入对应的 MDX 组件。</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}