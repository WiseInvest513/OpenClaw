"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, ArrowRight, ShieldAlert, LineChart, Wallet } from "lucide-react";
import Link from "next/link";

export default function CryptoPage() {
  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-1">
      {/* 头部标题区 */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl mb-6 text-emerald-600 dark:text-emerald-400">
          <Code className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold font-nunito mb-6 tracking-tight text-slate-900 dark:text-white">
          Web3 & 加密实战
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          利用 OpenClaw 强大的自动化能力，打破繁琐的交易监控与链上交互。
          在这里，我们提供了针对主要交易所与 Web3 环境的深度整合方案。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Binance Section */}
        <Link href="/crypto/binance" className="block">
        <Card className="border-t-4 border-t-[#FCD535] dark:bg-slate-900/50 backdrop-blur-sm relative overflow-hidden group hover:shadow-lg hover:shadow-[#FCD535]/10 transition-all cursor-pointer h-full">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#FCD535]/10 rounded-full blur-3xl group-hover:bg-[#FCD535]/20 transition-all duration-500"></div>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden bg-white shadow-lg shadow-[#FCD535]/20">
                <img src="/binance-logo.png" alt="Binance" className="w-8 h-8 object-contain" />
              </div>
              <Badge variant="outline" className="border-[#FCD535] text-[#FCD535]">API Integration</Badge>
            </div>
            <CardTitle className="text-2xl mb-2">币安 (Binance) 自动化</CardTitle>
            <CardDescription className="text-base">
              结合 OpenClaw 实现量化辅助、现货/合约数据监控与风险预警。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex gap-3">
              <ShieldAlert className="w-5 h-5 text-slate-400 shrink-0" />
              <div>
                <strong className="text-slate-900 dark:text-slate-200 block mb-1">安全的 API Key 管理</strong>
                了解如何在 OpenClaw 的本地沙盒中安全配置和调用交易所 API，拒绝私钥泄漏。
              </div>
            </div>
            <div className="flex gap-3">
              <LineChart className="w-5 h-5 text-slate-400 shrink-0" />
              <div>
                <strong className="text-slate-900 dark:text-slate-200 block mb-1">自动化指标监控</strong>
                编写简单的 JS/Python 脚本，定时拉取 K 线数据计算指标，并推送到 Telegram。
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-6">
            <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white" disabled>
              教程筹备中...
            </Button>
          </CardFooter>
        </Card>
        </Link>

        {/* OKX Section */}
        <Link href="/crypto/okx" className="block">
        <Card className="border-t-4 border-t-slate-800 dark:border-t-slate-200 dark:bg-slate-900/50 backdrop-blur-sm relative overflow-hidden group hover:shadow-lg hover:shadow-slate-400/10 transition-all cursor-pointer h-full">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-slate-400/10 rounded-full blur-3xl group-hover:bg-slate-400/20 transition-all duration-500"></div>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden bg-white dark:bg-slate-100 shadow-lg shadow-slate-900/20">
                <img src="/okx-logo.png" alt="OKX" className="w-8 h-8 object-contain" />
              </div>
              <Badge variant="outline" className="border-slate-500 text-slate-500">Web3 Wallet</Badge>
            </div>
            <CardTitle className="text-2xl mb-2">欧易 (OKX) 链上交互</CardTitle>
            <CardDescription className="text-base">
              利用自动化脚本完成测试网交互、资产归集与空投埋伏。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex gap-3">
              <Wallet className="w-5 h-5 text-slate-400 shrink-0" />
              <div>
                <strong className="text-slate-900 dark:text-slate-200 block mb-1">多钱包状态巡检</strong>
                一键查询多个 EVM/Solana 地址的余额、Gas 消耗以及特定 Token 的授权状态。
              </div>
            </div>
            <div className="flex gap-3">
              <Code className="w-5 h-5 text-slate-400 shrink-0" />
              <div>
                <strong className="text-slate-900 dark:text-slate-200 block mb-1">测试网水龙头自动化</strong>
                整合验证码识别或无头浏览器，定时领取各大测试网络的水龙头测试币。
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-6">
            <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white">
              进入教程
            </Button>
          </CardFooter>
        </Card>
        </Link>
      </div>

      {/* 风险提示 */}
      <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/50 text-center text-amber-800 dark:text-amber-500/80">
        <h3 className="font-bold mb-2 flex items-center justify-center gap-2">
          <ShieldAlert className="w-5 h-5" />
          安全与风险声明
        </h3>
        <p className="text-sm max-w-2xl mx-auto">
          加密货币投资存在极高风险。本板块提供的所有自动化脚本与教程仅供技术交流与学习参考，
          绝对不构成任何投资建议。在使用任何涉及资产操作的自动化脚本前，请务必完全理解其代码逻辑，并在测试网进行充分验证。
        </p>
      </div>
    </div>
  );
}