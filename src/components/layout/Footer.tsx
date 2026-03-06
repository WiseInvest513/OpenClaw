"use client";

import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function Footer() {
  const [showWechat, setShowWechat] = useState(false);

  return (
    <>
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mt-auto">
        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
            {/* 左侧：品牌与社交链接 */}
            <div className="flex items-center gap-6">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 font-nunito">
                OpenClaw
              </span>
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/WiseInvest513/OpenClaw" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-slate-400 hover:text-yellow-500 transition-colors flex items-center gap-1.5 text-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                
                <button 
                  onClick={() => setShowWechat(true)}
                  className="text-slate-400 hover:text-green-500 transition-colors flex items-center gap-1.5 text-sm"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.28 2C3.72 2 0 5.16 0 9.17c0 2.22 1.13 4.23 2.87 5.56l-.64 2.12c-.08.28.16.53.43.43l2.45-.9c.8.23 1.66.36 2.56.36 4.56 0 8.28-3.16 8.28-7.17S12.84 2 8.28 2zm14.33 13.06c0-2.8-2.67-5.08-6-5.08s-6 2.28-6 5.08 2.67 5.08 6 5.08c.64 0 1.25-.1 1.83-.28l1.74.65c.2.07.38-.1.32-.3l-.46-1.54c1.23-.96 2.05-2.4 2.05-4.01h.52zm-3.66-2.07c.37 0 .67.3.67.67s-.3.67-.67.67-.67-.3-.67-.67.3-.67.67-.67zm-4.67 0c.37 0 .67.3.67.67s-.3.67-.67.67-.67-.3-.67-.67.3-.67.67-.67zm-3.7-4.47c.56 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-4.66 0c.56 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                  </svg>
                  <span>微信</span>
                </button>
              </div>
            </div>

            {/* 右侧：精简的导航 */}
            <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <a href="https://docs.openclaw.ai/" target="_blank" rel="noreferrer" className="hover:text-yellow-500 transition-colors">
                OpenClaw 官方文档
              </a>
              <a href="https://github.com/openclaw/skills" target="_blank" rel="noreferrer" className="hover:text-yellow-500 transition-colors">
                Skills 仓库
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <p>© {new Date().getFullYear()} Wise Invest. 保留所有权利。</p>
            <p>本网站提供的内容部分来源于网络，如果有侵权，请联系站长进行交涉</p>
          </div>
        </div>
      </footer>

      {/* 微信二维码弹窗 */}
      <Dialog open={showWechat} onOpenChange={setShowWechat}>
        <DialogContent className="sm:max-w-sm flex flex-col items-center justify-center p-6">
          <DialogTitle className="text-center font-nunito mb-4">关注公众号</DialogTitle>
          <div className="w-48 h-48 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700 relative">
            <Image
              src="/wechat-qr.png"
              alt="微信公众号二维码"
              width={192}
              height={192}
              className="object-contain"
              unoptimized
            />
          </div>
          <p className="mt-4 text-sm text-slate-500 text-center">扫描二维码，获取最新动态与技术支持</p>
        </DialogContent>
      </Dialog>
    </>
  );
}