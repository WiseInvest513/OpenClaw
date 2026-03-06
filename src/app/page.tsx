import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Zap, Target, Shield, Layers } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-100/40 via-slate-50 to-slate-50 dark:from-yellow-900/20 dark:via-[#0f172a] dark:to-[#0f172a]"></div>
        
        {/* 背景装饰图案 */}
        <div className="absolute top-1/4 left-0 -translate-x-1/2 w-96 h-96 bg-yellow-300/10 dark:bg-yellow-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/3 w-[500px] h-[500px] bg-orange-300/10 dark:bg-orange-500/5 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800/50 text-yellow-600 dark:text-yellow-400 text-sm font-medium mb-8 border border-yellow-100 dark:border-slate-700 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
            OpenClaw 生态正在高速发展中
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-nunito mb-6 text-slate-900 dark:text-white leading-[1.1]">
            下一代智能自动化工作流<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
              重塑你的生产力
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            OpenClaw 是一个强大而灵活的 AI 代理框架。通过自定义 Skills 与内置的自动化调度，
            让 AI 真正接管你日常繁琐的加密监控、社交媒体运营与数据同步任务。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 h-12 px-8 text-base shadow-lg shadow-yellow-500/25" asChild>
              <Link href="/tutorials">
                开始学习 <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm" asChild>
              <Link href="/skills">
                探索技能市场
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section - 说明产品能帮到什么 */}
      <section className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-nunito mb-4">为什么选择 OpenClaw？</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            我们不仅仅提供一个命令行工具，更提供了一个完整的生态系统，让大模型（LLM）与你的真实世界应用无缝连接。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Zap className="w-6 h-6 text-yellow-500" />,
              title: "开箱即用的自动化",
              desc: "无需复杂配置，安装 Skills 即可实现社交媒体推文、价格监控等任务的自动化执行。"
            },
            {
              icon: <Layers className="w-6 h-6 text-orange-500" />,
              title: "丰富的技能市场",
              desc: "接入开源社区驱动的 Skills Market，海量场景插件任你选择，并支持一键安装与升级。"
            },
            {
              icon: <Target className="w-6 h-6 text-emerald-500" />,
              title: "专注于 Web3/Crypto",
              desc: "针对加密货币投资者提供深度定制的支持，轻松连接币安、OKX 等交易所与链上交互。"
            },
            {
              icon: <Shield className="w-6 h-6 text-blue-500" />,
              title: "本地优先与隐私安全",
              desc: "所有的 API Keys 与敏感数据都安全地存储在你的本地环境中，拒绝数据泄露。"
            }
          ].map((feature, i) => (
            <Card key={i} className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200/60 dark:border-slate-800/60 hover:shadow-md hover:border-yellow-200 dark:hover:border-yellow-900/50 transition-all group">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-yellow-50 dark:group-hover:bg-yellow-900/20 transition-all">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription className="text-sm mt-2 leading-relaxed">
                  {feature.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-700/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400"></div>
          <h2 className="text-3xl font-bold text-white mb-4">准备好改变工作方式了吗？</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            花 5 分钟阅读我们的安装教程，即可在本地启动你的第一个 OpenClaw AI 代理。
          </p>
          <Button variant="secondary" size="lg" className="rounded-full bg-white text-slate-900 hover:bg-slate-100" asChild>
             <Link href="/tutorials">
               查看安装指南
             </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
