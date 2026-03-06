"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Download, Search, Tag, TrendingUp, Sparkles } from "lucide-react";

const categories = ["全部技能", "效率工具", "Web3 / 监控", "社交媒体", "开发辅助", "数据抓取"];

const skillsData = [
  { id: 1, name: "Twitter Auto-Post", author: "@wise-invest", uses: "1.2k", category: "社交媒体", desc: "自动抓取 RSS 内容并生成总结推文发送至 Twitter。", tags: ["Twitter", "RSS", "AI"] },
  { id: 2, name: "Notion Sync", author: "@openclaw", uses: "850", category: "效率工具", desc: "将本地 Markdown 文件与 Notion 数据库进行双向同步。", tags: ["Notion", "Markdown"] },
  { id: 3, name: "Crypto Price Alert", author: "@balala", uses: "2.3k", category: "Web3 / 监控", desc: "实时监控币安价格，达到阈值自动发送 Telegram 通知。", tags: ["Binance", "Telegram", "Bot"] },
  { id: 4, name: "GitHub Repo Summarizer", author: "@tech-bro", uses: "500", category: "开发辅助", desc: "一键分析 GitHub 仓库代码并生成架构解析文档。", tags: ["GitHub", "Doc"] },
  { id: 5, name: "News Scraper", author: "@data-miner", uses: "920", category: "数据抓取", desc: "定时抓取各大新闻网站头条并推送到指定 Webhook。", tags: ["Scrape", "Webhook"] },
  { id: 6, name: "Email Assistant", author: "@office-pro", uses: "1.5k", category: "效率工具", desc: "接入 Gmail，自动对未读邮件进行重要性排序并生成摘要。", tags: ["Gmail", "AI"] },
];

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState("全部技能");

  const filteredSkills = activeCategory === "全部技能" 
    ? skillsData 
    : skillsData.filter(s => s.category === activeCategory);

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-1 flex flex-col lg:flex-row gap-8">
      {/* 左侧：分类目录 */}
      <aside className="w-full lg:w-64 shrink-0">
        <div className="sticky top-24">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索技能..." 
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
            />
          </div>
          <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 px-2">分类</h2>
          <div className="flex flex-col gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                  activeCategory === cat
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {cat}
                <span className="text-xs opacity-50">
                  {cat === "全部技能" ? skillsData.length : skillsData.filter(s => s.category === cat).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* 中间：技能列表展示 */}
      <main className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold font-nunito flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-500" /> {activeCategory}
          </h1>
          <Tabs defaultValue="popular" className="w-[200px] hidden sm:block">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="popular">最受欢迎</TabsTrigger>
              <TabsTrigger value="newest">最新发布</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSkills.map((skill) => (
            <Card key={skill.id} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:border-yellow-400/50 transition-colors flex flex-col h-full">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {skill.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs font-medium text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-current" /> {skill.uses}
                  </div>
                </div>
                <CardTitle className="text-lg">{skill.name}</CardTitle>
                <CardDescription className="text-xs">by {skill.author}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-slate-600 dark:text-slate-400 flex-grow">
                {skill.desc}
                <div className="flex flex-wrap gap-2 mt-4">
                  {skill.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full gap-2 border-slate-200 dark:border-slate-700 hover:border-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-400">
                  <Download className="w-4 h-4" /> 获取命令
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      {/* 右侧：推荐榜单 */}
      <aside className="w-full lg:w-72 shrink-0">
        <div className="sticky top-24">
          <Card className="border-yellow-200 dark:border-yellow-900/50 bg-gradient-to-b from-yellow-50/50 to-white dark:from-yellow-900/10 dark:to-slate-900">
            <CardHeader className="pb-4 border-b border-yellow-100 dark:border-slate-800">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                本周飙升榜单
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col divide-y divide-yellow-100 dark:divide-slate-800">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="p-4 flex items-center gap-3 hover:bg-yellow-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shadow-sm ${
                      i === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' : 
                      i === 2 ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300' :
                      i === 3 ? 'bg-orange-200/50 dark:bg-orange-900/50 text-orange-700 dark:text-orange-400' :
                      'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      #{i}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{skillsData[i]?.name || `热门技能 ${i}`}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" /> {1000 - i * 150} 次使用
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>
    </div>
  );
}