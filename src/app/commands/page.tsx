"use client";

import { useState } from "react";
import { Terminal, Copy, Check, Search, Server, Settings, MessageSquare, Zap, Shield, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const commandCategories = [
  { id: "install", icon: <DownloadIcon />, name: "安装与初始化" },
  { id: "config", icon: <Settings />, name: "配置管理" },
  { id: "gateway", icon: <Server />, name: "网关 (Gateway)" },
  { id: "model", icon: <Zap />, name: "模型管理" },
  { id: "channel", icon: <MessageSquare />, name: "渠道管理" },
  { id: "security", icon: <Shield />, name: "状态与安全" },
];

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
  );
}

const commandsData = {
  install: [
    { cmd: "sudo npm i -g openclaw@latest", desc: "全局安装稳定版 OpenClaw。" },
    { cmd: "openclaw onboard", desc: "交互式引导初始化（首次使用推荐）。" },
    { cmd: "openclaw onboard --flow quickstart", desc: "快速引导（最少交互）。" },
  ],
  config: [
    { cmd: "openclaw configure", desc: "启动交互式配置向导。" },
    { cmd: "openclaw config get gateway.port", desc: "读取指定的配置项。" },
    { cmd: "openclaw config set gateway.port 19001", desc: "设置特定的配置值。" },
  ],
  gateway: [
    { cmd: "openclaw gateway run --bind loopback --port 18789", desc: "在前台运行网关。" },
    { cmd: "openclaw gateway status", desc: "查看网关状态与健康检查。" },
    { cmd: "openclaw logs --follow", desc: "实时查看网关日志。" },
  ],
  model: [
    { cmd: "openclaw models list", desc: "列出所有可用的 AI 模型。" },
    { cmd: "openclaw models set <model-id>", desc: "设置全局默认使用的主模型。" },
    { cmd: "openclaw models status --probe", desc: "在线探测所有模型的认证与可用状态。" },
  ],
};

function CodeBlock({ command, description }: { command: string, description: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-6 last:mb-0 group">
      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{description}</p>
      <div className="relative bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-hidden border border-slate-800">
        <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
        <div className="flex items-start justify-between gap-4">
          <code className="text-emerald-400 break-all">
            <span className="text-slate-500 mr-2">$</span>
            {command}
          </code>
          <button 
            onClick={handleCopy}
            className="text-slate-400 hover:text-white transition-colors shrink-0 p-1"
            title="复制代码"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CommandsPage() {
  const [activeSection, setActiveSection] = useState("install");

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-1">
      {/* 头部标题区 */}
      <div className="mb-10 pb-8 border-b border-slate-200 dark:border-slate-800 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-nunito flex items-center justify-center md:justify-start gap-3 mb-4">
            <div className="p-2 bg-slate-800 rounded-lg text-white">
              <Terminal className="w-6 h-6" />
            </div>
            CLI 常用命令速查
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            本文档是 OpenClaw 命令行工具 (CLI) 的快速参考手册。包含了从安装、配置到高阶运维的所有常用命令。
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="搜索命令 (如: status)..." 
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* 左侧导航导航 */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-24">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> 目录指引
            </h3>
            <nav className="flex flex-col gap-1">
              {commandCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveSection(cat.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeSection === cat.id
                      ? "bg-slate-900 text-white dark:bg-yellow-500/10 dark:text-yellow-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className={activeSection === cat.id ? "text-yellow-400" : "opacity-60"}>
                    {cat.icon}
                  </span>
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* 右侧命令展示区 */}
        <main className="flex-1 min-w-0">
          <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold font-nunito mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                {commandCategories.find(c => c.id === activeSection)?.name}
              </h2>
              
              {/* @ts-ignore - for simplicity in this demo */}
              {(commandsData[activeSection] || []).length > 0 ? (
                // @ts-ignore
                commandsData[activeSection].map((item, idx) => (
                  <CodeBlock key={idx} command={item.cmd} description={item.desc} />
                ))
              ) : (
                <div className="text-center py-12 text-slate-500 flex flex-col items-center">
                  <Terminal className="w-12 h-12 mb-4 opacity-20" />
                  <p>该分类下的命令整理中...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 提示信息 */}
          <div className="mt-8 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 flex gap-4 text-sm text-blue-800 dark:text-blue-300">
            <div className="shrink-0 mt-0.5">ℹ️</div>
            <div>
              <strong>提示：</strong> 所有命令均支持全局选项，例如附加 <code>--json</code> 以输出机器可读格式，或使用 <code>--help</code> 查看该命令的具体参数说明。
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}