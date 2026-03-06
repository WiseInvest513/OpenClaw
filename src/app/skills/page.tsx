"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, Download, Search, Tag, TrendingUp, Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";
import { categories, skillsData } from "@/data/skills";

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState("全部技能");

  const filteredSkills = activeCategory === "全部技能" 
    ? skillsData 
    : skillsData.filter(s => s.category === activeCategory);

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-1 flex flex-col lg:flex-row gap-6">
      {/* 左侧：分类目录 - 更窄 */}
      <aside className="w-full lg:w-48 shrink-0">
        <div className="sticky top-24">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索技能..." 
              className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
            />
          </div>
          <h2 className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 px-1">分类</h2>
          <div className="flex flex-col gap-0.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-left px-2 py-1.5 rounded-md text-xs font-medium transition-all flex items-center justify-between ${
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
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold font-nunito flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500" /> {activeCategory}
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <Card key={skill.id} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:border-yellow-400/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 flex flex-col h-full group">
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] px-1.5 py-0 shrink-0">
                    {skill.category}
                  </Badge>
                  <div className="flex items-center gap-0.5 text-[10px] font-medium text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 px-1.5 py-0.5 rounded-full shrink-0">
                    <Star className="w-2.5 h-2.5 fill-current" /> {skill.uses}
                  </div>
                </div>
                <CardTitle className="text-sm leading-tight group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">{skill.name}</CardTitle>
                <CardDescription className="text-[10px]">by {skill.author}</CardDescription>
              </CardHeader>
              <CardContent className="px-4 py-2 text-xs text-slate-600 dark:text-slate-400 flex-grow flex flex-col">
                <p className="line-clamp-3 flex-grow">{skill.desc}</p>
                <div className="flex flex-wrap gap-1 mt-3 shrink-0">
                  {skill.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 mt-auto">
                <Button variant="outline" size="sm" className="w-full h-8 text-xs gap-1 border-slate-200 dark:border-slate-700 group-hover:border-yellow-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors" asChild>
                  {/* @ts-ignore */}
                  <Link href={skill.link || "#"} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3 h-3" /> 查看详情
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      {/* 右侧：推荐榜单 - 更窄 */}
      <aside className="w-full lg:w-56 shrink-0">
        <div className="sticky top-24">
          <Card className="border-yellow-200 dark:border-yellow-900/50 bg-gradient-to-b from-yellow-50/50 to-white dark:from-yellow-900/10 dark:to-slate-900">
            <CardHeader className="py-3 px-4 border-b border-yellow-100 dark:border-slate-800">
              <CardTitle className="flex items-center gap-1.5 text-sm">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                本周飙升
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col divide-y divide-yellow-100 dark:divide-slate-800">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="px-3 py-2 flex items-center gap-2 hover:bg-yellow-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      i === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' : 
                      i === 2 ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300' :
                      i === 3 ? 'bg-orange-200/50 dark:bg-orange-900/50 text-orange-700 dark:text-orange-400' :
                      'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      #{i}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium truncate">{skillsData[i]?.name || `热门技能 ${i}`}</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-0.5 mt-0.5">
                        <Star className="w-2.5 h-2.5 text-yellow-500 fill-current" /> {1000 - i * 150}
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