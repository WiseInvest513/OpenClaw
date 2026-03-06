"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

const articles = [
  {
    id: 1,
    title: "如何利用 OpenClaw 在阿里云上构建 Serverless 自动化脚本",
    source: "阿里云开发者社区",
    author: "云端架构师",
    date: "2026-03-01",
    desc: "本文详细介绍了将 OpenClaw 与阿里云函数计算 (FC) 结合，实现低成本、高可用的日常数据抓取与处理流水线...",
    tags: ["Serverless", "阿里云"],
    link: "#"
  },
  {
    id: 2,
    title: "从零单排：我的第一个 OpenClaw 插件开发实战记录",
    source: "知乎",
    author: "全栈小白",
    date: "2026-02-28",
    desc: "作为一名刚接触 AI 代理框架的新手，我用周末两天时间开发了一个简单的 Notion 同步工具，分享踩坑经验...",
    tags: ["插件开发", "实战记录"],
    link: "#"
  },
  {
    id: 3,
    title: "腾讯云轻量级服务器部署 OpenClaw 最佳实践",
    source: "腾讯云技术博客",
    author: "运维老兵",
    date: "2026-02-20",
    desc: "在 2 核 4G 的轻量应用服务器上如何稳定运行 OpenClaw 后台任务，并配置宝塔面板进行可视化管理...",
    tags: ["部署", "腾讯云"],
    link: "#"
  },
  {
    id: 4,
    title: "深度解析：OpenClaw 核心架构设计与源码分析",
    source: "掘金",
    author: "架构随想",
    date: "2026-02-15",
    desc: "深入探讨 OpenClaw 内部的任务调度机制、Agent 通信模型以及插件系统的生命周期...",
    tags: ["源码分析", "架构设计"],
    link: "#"
  }
];

export default function ArticlesPage() {
  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-1">
      {/* 头部标题区 */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6 text-blue-600 dark:text-blue-400">
          <FileText className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold font-nunito mb-6 tracking-tight text-slate-900 dark:text-white">
          社区好文推荐
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          收录了全网优质的 OpenClaw 相关教程、架构解析与最佳实践。
          无论是知乎的踩坑记录，还是云厂商社区的部署方案，在这里你都能找到。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {articles.map((article) => (
          <Card key={article.id} className="flex flex-col dark:bg-slate-900/50 hover:border-blue-400/50 transition-colors group">
            <CardHeader>
              <div className="flex justify-between items-start mb-3">
                <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-0">
                  {article.source}
                </Badge>
                <span className="text-xs text-slate-400">{article.date}</span>
              </div>
              <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {article.title}
              </CardTitle>
              <CardDescription className="mt-2 text-slate-500">
                作者：{article.author}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                {article.desc}
              </p>
              <div className="flex gap-2">
                {article.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button variant="ghost" className="w-full text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 justify-between" asChild>
                <Link href={article.link} target="_blank" rel="noopener noreferrer">
                  阅读全文 <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}