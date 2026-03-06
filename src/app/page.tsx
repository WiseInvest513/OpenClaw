import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TypingEffect } from "@/components/ui/typing-effect";
import { ArrowRight, Zap, Target, Shield, Layers, MessageCircle, Terminal, CheckCircle2, XCircle } from "lucide-react";
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
            <TypingEffect
              texts={["重塑你的生产力", "重构你的信息获取方式", "重构你的交易方式", "实现 AI 自动炒币"]}
              typingSpeed={150}
              deletingSpeed={80}
              pauseAfterTyping={2000}
              pauseAfterDeleting={600}
              gradient
            />
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
            },
            {
              icon: <MessageCircle className="w-6 h-6 text-indigo-500" />,
              title: "多端聊天渠道接入",
              desc: "支持 Telegram, WhatsApp, Discord 等多种平台，随时随地通过聊天驱动你的专属 AI。"
            },
            {
              icon: <Terminal className="w-6 h-6 text-purple-500" />,
              title: "极客友好的可编程性",
              desc: "底层全面开源且支持高度客制化，懂代码的你可以用 Python/TypeScript 轻松编写专属工作流。"
            }
          ].map((feature, i) => (
            <Card key={i} className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-yellow-300 dark:hover:border-yellow-900/50 transition-all duration-300 group">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-yellow-50 dark:group-hover:bg-yellow-900/20 group-hover:border-yellow-200 dark:group-hover:border-yellow-700/50 transition-all duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-semibold tracking-wider uppercase mb-4">
            全维度对比
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-nunito mb-4 text-slate-900 dark:text-white">重新定义个人 AI 助手</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            与传统的网页版对话模型和云端自动化工具相比，OpenClaw 给了你前所未有的控制权与执行力。
          </p>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="min-w-[800px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
            <div className="grid grid-cols-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 p-5 md:p-6 font-bold text-slate-700 dark:text-slate-200">
              <div className="col-span-1 flex items-center text-base">核心能力</div>
              <div className="col-span-1 text-center flex flex-col items-center justify-center">
                <span className="text-2xl mb-1">🦞</span>
                <span className="text-yellow-600 dark:text-yellow-400 text-lg">OpenClaw</span>
              </div>
              <div className="col-span-1 text-center flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                <span className="text-2xl mb-1">💬</span>
                <span>传统网页对话 AI<br/><span className="text-xs font-normal">(如 ChatGPT/Claude)</span></span>
              </div>
              <div className="col-span-1 text-center flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                <span className="text-2xl mb-1">⚙️</span>
                <span>传统云端自动化<br/><span className="text-xs font-normal">(如 Zapier/Make)</span></span>
              </div>
            </div>
            
            {[
              { feature: "执行本地脚本与终端命令", ours: true, ai: false, auto: false },
              { feature: "全自动无头浏览器操作", ours: true, ai: false, auto: false },
              { feature: "聊天软件直接唤起 (TG/WA/Discord)", ours: true, ai: false, auto: false },
              { feature: "系统级持久化记忆与上下文", ours: true, ai: false, auto: false },
              { feature: "随时编写与挂载自定义插件", ours: true, ai: false, auto: true },
              { feature: "数据与 API 密钥完全私有化", ours: true, ai: false, auto: false },
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-4 p-5 md:p-6 border-b border-slate-100 dark:border-slate-800/50 last:border-0 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors items-center">
                <div className="col-span-1 text-slate-800 dark:text-slate-200 font-medium text-base">{row.feature}</div>
                <div className="col-span-1 flex justify-center">
                  {row.ours ? <CheckCircle2 className="w-7 h-7 text-emerald-500" /> : <XCircle className="w-6 h-6 text-slate-300 dark:text-slate-700" />}
                </div>
                <div className="col-span-1 flex justify-center">
                  {row.ai ? <CheckCircle2 className="w-7 h-7 text-emerald-500" /> : <XCircle className="w-6 h-6 text-slate-300 dark:text-slate-700" />}
                </div>
                <div className="col-span-1 flex justify-center">
                  {row.auto ? <CheckCircle2 className="w-7 h-7 text-emerald-500" /> : <XCircle className="w-6 h-6 text-slate-300 dark:text-slate-700" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investor Use Cases Section */}
      <section className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
        <div className="bg-slate-50 dark:bg-slate-900/40 rounded-[2.5rem] p-8 md:p-16 border border-slate-200/60 dark:border-slate-800/60">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-nunito mb-4 text-slate-900 dark:text-white">为什么投资者需要 OpenClaw？</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              拒绝被垃圾信息轰炸。让 AI 龙虾成为你不知疲倦的专属交易助理，按你的策略精准盯盘、汇总情报。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            <div className="flex flex-col min-w-0 bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 h-full">
              <div className="w-12 h-12 shrink-0 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl mb-6">1</div>
              <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">全天候智能资产监控</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed flex-1">
                盯紧你关心的核心资产（BTC、ETH、NVDA等），在触及关键点位时主动推送，并附加当时的市场背景。
              </p>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 text-sm font-mono text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 mt-auto">
                <span className="text-blue-500">"</span>当比特币跌破6万，立即在 Telegram 上通知我，并总结最近半小时的突发新闻。<span className="text-blue-500">"</span>
              </div>
            </div>

            <div className="flex flex-col min-w-0 bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 h-full">
              <div className="w-12 h-12 shrink-0 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold text-xl mb-6">2</div>
              <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">高度定制的投资者早报</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed flex-1">
                取代千篇一律的新闻 APP。自行配置包含的数据源和新闻偏好，每天定时送到你的聊天窗口。
              </p>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 text-sm font-mono text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 mt-auto">
                <span className="text-orange-500">"</span>早上7:30发我早报：昨晚纳指异动前三、链上大额转账异常，以及 X 上最新热门情绪词。<span className="text-orange-500">"</span>
              </div>
            </div>

            <div className="flex flex-col min-w-0 bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 h-full">
              <div className="w-12 h-12 shrink-0 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xl mb-6">3</div>
              <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">私人仓位整体风险管家</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed flex-1">
                告诉它你的资产配比，它会帮你计算回撤、检测相关性，并在黑天鹅来临时拉响警报。
              </p>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 text-sm font-mono text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 mt-auto">
                <span className="text-emerald-500">"</span>我持仓BTC 40%, 现金 15%。每天收盘告诉我最大回撤。如整体跌超10%，提醒我检查减仓。<span className="text-emerald-500">"</span>
              </div>
            </div>

            <div className="flex flex-col min-w-0 bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 h-full">
              <div className="w-12 h-12 shrink-0 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-xl mb-6">4</div>
              <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">深度研报与链上追踪</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed flex-1">
                不再受限信息壁垒。遇到陌生代币或宏观事件，直接让 AI 龙虾抓取白皮书与链上资金动向并整理。
              </p>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 text-sm font-mono text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 mt-auto">
                <span className="text-purple-500">"</span>帮我追踪近期解锁超 10% 的代币项目，并从 Etherscan 提取它们的筹码集中度进行分析。<span className="text-purple-500">"</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-2">
              未来设想 Vision
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-nunito leading-tight text-slate-900 dark:text-white">
              不止是工具，<br/>更是你的数字分身。
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              今天的 OpenClaw 可以帮你盯盘、回邮件、刷网页。但我们的愿景远不止于此。
              我们设想的未来，是每一个数字生命都拥有独立的“思考中枢”与“四肢”。
            </p>
            <ul className="space-y-4 pt-4">
              {[
                { title: "跨设备意图接力", desc: "在手机上随口布置的任务，家里的闲置 Mac 会自动唤醒执行，执行完毕后在手表上给你轻声反馈。" },
                { title: "自治的金融代理池", desc: "不再是单个脚本，而是由宏观分析 Agent、链上监控 Agent 和交易执行 Agent 组成的小型私人基金会，24小时为你打工。" },
                { title: "数字永生与记忆流", desc: "随着时间的推移，你的专属 AI 将彻底学习你的行文风格、风险偏好与决策逻辑，最终成为一个真正“懂你”的数字伙伴。" }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 bg-yellow-100 dark:bg-yellow-900/30 p-1.5 rounded-full">
                    <Zap className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">{item.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-3xl blur-3xl -z-10"></div>
            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="font-mono text-sm space-y-4 text-slate-300">
                <p className="text-indigo-400"># 2027_vision_system_log</p>
                <p><span className="text-emerald-400">➜</span> [08:00] <span className="text-slate-400">Macro_Agent:</span> VIX index spikes.</p>
                <p><span className="text-emerald-400">➜</span> [08:01] <span className="text-slate-400">Risk_Agent:</span> Analyzing portfolio...</p>
                <p><span className="text-emerald-400">➜</span> [08:02] <span className="text-slate-400">Exec_Agent:</span> Hedging ETH exposure.</p>
                <p className="text-yellow-400 flex items-center gap-2">
                  <span className="animate-pulse">_</span>
                  Awaiting owner confirmation via Telegram
                </p>
              </div>
            </div>
          </div>
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
