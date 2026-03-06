import json
import random

categories = ["效率工具", "Web3 / 监控", "社交媒体", "开发辅助", "数据抓取"]
tags_pool = ["AI", "Bot", "Automation", "Tool", "Analytics", "Notification", "API", "Web3", "Scraper", "Sync"]
authors = ["@wise-invest", "@openclaw", "@balala", "@tech-bro", "@data-miner", "@office-pro", "@community", "@team-tools", "@web3-dev", "@deploy-pro", "@content-curator", "@tg-admin", "@crypto-whale", "@code-ninja", "@ai-researcher"]

verbs = ["自动抓取", "实时监控", "一键分析", "定时推送到", "聚合", "集成", "优化", "生成", "同步", "解析", "管理", "翻译"]
nouns = ["新闻", "代码", "推文", "邮件", "代币价格", "服务器状态", "日志", "RSS 源", "Notion 数据", "Slack 消息", "Discord 频道", "链上数据", "Github 仓库", "Vercel 部署", "会议记录"]
purposes = ["提升效率", "节省时间", "保持最新", "防止遗漏", "方便阅读", "便于分析", "预警风险", "自动化工作流"]

skills = []
id_counter = 1

# Define base ones to keep the original 12
base_skills = [
  {"id": 1, "name": "Twitter Auto-Post", "author": "@wise-invest", "uses": "1.2k", "category": "社交媒体", "desc": "自动抓取 RSS 内容并生成总结推文发送至 Twitter，支持定时发送与热点追踪，非常适合内容创作者。", "tags": ["Twitter", "RSS", "AI"]},
  {"id": 2, "name": "Notion Sync", "author": "@openclaw", "uses": "850", "category": "效率工具", "desc": "将本地 Markdown 文件与 Notion 数据库进行双向同步，保持知识库始终最新，支持多工作区。", "tags": ["Notion", "Markdown"]},
  {"id": 3, "name": "Crypto Price Alert", "author": "@balala", "uses": "2.3k", "category": "Web3 / 监控", "desc": "实时监控币安价格，达到阈值自动发送 Telegram 通知，内置多指标计算，帮助把握交易时机。", "tags": ["Binance", "Telegram", "Bot"]},
  {"id": 4, "name": "GitHub Repo Summarizer", "author": "@tech-bro", "uses": "500", "category": "开发辅助", "desc": "一键分析 GitHub 仓库代码并生成架构解析文档，快速理解开源项目结构与核心逻辑。", "tags": ["GitHub", "Doc"]},
  {"id": 5, "name": "News Scraper", "author": "@data-miner", "uses": "920", "category": "数据抓取", "desc": "定时抓取各大新闻网站头条并推送到指定 Webhook，支持自定义关键词过滤与去重处理。", "tags": ["Scrape", "Webhook"]},
  {"id": 6, "name": "Email Assistant", "author": "@office-pro", "uses": "1.5k", "category": "效率工具", "desc": "接入 Gmail，自动对未读邮件进行重要性排序并生成摘要，让你每天早晨快速处理收件箱。", "tags": ["Gmail", "AI"]},
  {"id": 7, "name": "Discord Bot", "author": "@community", "uses": "3.1k", "category": "社交媒体", "desc": "在 Discord 服务器中集成 AI 助手，支持群聊解答与私聊辅导，活跃社区氛围必备。", "tags": ["Discord", "Bot"]},
  {"id": 8, "name": "Slack 工作流", "author": "@team-tools", "uses": "720", "category": "效率工具", "desc": "将 OpenClaw 接入 Slack，实现消息自动回复与任务提醒，降低团队沟通成本。", "tags": ["Slack", "Workflow"]},
  {"id": 9, "name": "链上 Gas 监控", "author": "@web3-dev", "uses": "1.8k", "category": "Web3 / 监控", "desc": "监控以太坊等主网的 Gas 价格，在低峰时段自动发送通知，助你节省交互成本。", "tags": ["Ethereum", "Gas"]},
  {"id": 10, "name": "Vercel 部署助手", "author": "@deploy-pro", "uses": "650", "category": "开发辅助", "desc": "一键将本地项目部署到 Vercel，自动配置环境变量与自定义域名，简化发布流程。", "tags": ["Vercel", "Deploy"]},
  {"id": 11, "name": "RSS 聚合器", "author": "@content-curator", "uses": "2.1k", "category": "数据抓取", "desc": "聚合数十个独立博客的 RSS 源，每日定时生成精华摘要并推送到微信/Telegram。", "tags": ["RSS", "Summary"]},
  {"id": 12, "name": "Telegram 群管", "author": "@tg-admin", "uses": "980", "category": "社交媒体", "desc": "管理 Telegram 群组，自动回复常见问题、踢出广告发帖者，维持群组健康生态。", "tags": ["Telegram", "Admin"]},
]

skills.extend(base_skills)
id_counter = 13

for i in range(95):
    cat = random.choice(categories)
    verb = random.choice(verbs)
    noun = random.choice(nouns)
    purpose = random.choice(purposes)
    
    desc = f"{verb}{noun}，{purpose}。支持自定义配置和多种输出格式，让工作更加智能化。"
    
    name_prefixes = ["AI", "Auto", "Smart", "Quick", "Pro", "Easy", "Mega", "Super"]
    name_suffixes = ["Bot", "Sync", "Monitor", "Assistant", "Tool", "Tracker", "Reader", "Agent"]
    
    name = f"{random.choice(name_prefixes)} {random.choice(name_suffixes)} {id_counter}"
    
    if cat == "Web3 / 监控":
        name = f"Crypto {random.choice(['Tracker', 'Monitor', 'Bot', 'Alert', 'Whale'])} {id_counter}"
        desc = f"监控{random.choice(['比特币', '以太坊', 'Solana', '各大交易所'])}的{random.choice(['价格波动', '大额转账', '合约动态', '新币上线'])}，及时推送到设备上，{purpose}。"
    
    uses_count = f"{round(random.uniform(0.1, 9.9), 1)}k" if random.random() > 0.5 else str(random.randint(50, 999))
    
    skill = {
        "id": id_counter,
        "name": name,
        "author": random.choice(authors),
        "uses": uses_count,
        "category": cat,
        "desc": desc,
        "tags": random.sample(tags_pool, 2)
    }
    skills.append(skill)
    id_counter += 1

ts_content = f"""export const categories = ["全部技能", "效率工具", "Web3 / 监控", "社交媒体", "开发辅助", "数据抓取"];

export const skillsData = {json.dumps(skills, ensure_ascii=False, indent=2)};
"""

with open("src/data/skills.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Generated 100+ skills.")
