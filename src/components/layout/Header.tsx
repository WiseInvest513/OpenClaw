import Link from "next/link";
import { Home, BookOpen, Terminal, Code, Cpu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* 左侧 Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 font-nunito group-hover:opacity-80 transition-opacity">
              OpenClaw
            </span>
          </Link>
        </div>
        
        {/* 中间导航栏 - 居中且单行横向排布 */}
        <nav className="hidden lg:flex items-center justify-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors flex items-center gap-1.5 whitespace-nowrap">
            <Home className="w-4 h-4" /> 首页
          </Link>
          <Link href="/tutorials" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors flex items-center gap-1.5 whitespace-nowrap">
            <BookOpen className="w-4 h-4" /> 教程
          </Link>
          <Link href="/skills" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors flex items-center gap-1.5 whitespace-nowrap">
            <Cpu className="w-4 h-4" /> 技能市场
          </Link>
          <Link href="/commands" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors flex items-center gap-1.5 whitespace-nowrap">
            <Terminal className="w-4 h-4" /> 命令指南
          </Link>
          <Link href="/crypto" className="hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors flex items-center gap-1.5 whitespace-nowrap">
            <Code className="w-4 h-4" /> Web3实战
          </Link>
        </nav>

        {/* 右侧工具栏 */}
        <div className="flex items-center justify-end gap-3 sm:gap-4">
          {/* Wise Invest 主站图标链接 */}
          <Link
            href="https://www.wise-invest.org/"
            className="text-slate-600 dark:text-slate-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors hidden sm:flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 overflow-hidden"
            target="_blank"
            rel="noopener noreferrer"
            title="返回 Wise Invest 主站"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://www.wise-invest.org/favicon.ico" alt="Wise Invest" className="w-5 h-5 object-contain" />
          </Link>
          
          {/* X (Twitter) 图标 */}
          <Link
            href="https://x.com/WiseInvest513"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 dark:text-slate-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            title="官方 X"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
