import json
import random

# Load the raw github api response
with open("/Users/balala/.cursor/projects/Users-balala-Persona-Blog-OpenClaw/agent-tools/65dc954f-ed7a-4a7a-a9d7-3c8c1d6aa2b3.txt", "r") as f:
    try:
        data = json.load(f)
    except Exception as e:
        print("Error parsing json:", e)
        exit(1)

categories = ["效率工具", "Web3 / 监控", "社交媒体", "开发辅助", "数据抓取", "全部技能"]
tags_pool = ["AI", "Bot", "Automation", "Tool", "Analytics", "Notification", "API", "Web3", "Scraper", "Sync", "Utility", "CLI"]

skills = []
id_counter = 1

def determine_category_and_tags(name):
    name_lower = name.lower()
    
    # Web3 / 监控
    if any(k in name_lower for k in ["crypto", "btc", "eth", "solana", "binance", "okx", "wallet", "coin", "token", "web3", "chain", "swap", "gas"]):
        return "Web3 / 监控", ["Web3", "Crypto", "DeFi"]
    
    # 社交媒体
    if any(k in name_lower for k in ["twitter", "x", "telegram", "tg", "discord", "slack", "wechat", "social", "post", "tweet"]):
        return "社交媒体", ["Social", "Bot", "Community"]
        
    # 数据抓取
    if any(k in name_lower for k in ["scrape", "spider", "crawler", "rss", "news", "fetch", "search", "google", "bing"]):
        return "数据抓取", ["Scraper", "Data", "Search"]
        
    # 开发辅助
    if any(k in name_lower for k in ["git", "github", "code", "dev", "deploy", "vercel", "aws", "docker", "k8s", "sql", "db", "json", "yaml"]):
        return "开发辅助", ["DevOps", "Code", "Tool"]
        
    # 效率工具
    if any(k in name_lower for k in ["notion", "mail", "email", "gmail", "calendar", "todo", "task", "note", "sync", "pdf", "csv", "excel"]):
        return "效率工具", ["Productivity", "Office", "Sync"]
        
    # Default
    return "效率工具", ["Utility", "Automation"]

def generate_desc(name, category):
    name_lower = name.lower()
    if category == "Web3 / 监控":
        return f"自动化处理 {name} 相关的 Web3 与加密货币任务，支持链上数据查询与监控。"
    elif category == "社交媒体":
        return f"集成 {name} 平台功能，实现消息自动发送、回复与社群管理。"
    elif category == "数据抓取":
        return f"提供针对 {name} 的数据抓取与信息搜集能力，自动化获取网络资源。"
    elif category == "开发辅助":
        return f"开发者专属的 {name} 辅助工具，加速代码开发、测试与部署流程。"
    else:
        return f"强大的 {name} 效率自动化脚本，帮助你节省时间、提高工作效率。"

# Filter to get only directories (skills)
directories = [item for item in data if item.get("type") == "dir"]

# Sort alphabetically to have a stable order
directories.sort(key=lambda x: x["name"])

# Let's take the first 120 or so, or randomly sample 120 so we get a good mix
if len(directories) > 120:
    random.seed(42) # deterministic
    selected_dirs = random.sample(directories, 120)
else:
    selected_dirs = directories
    
selected_dirs.sort(key=lambda x: x["name"])

for item in selected_dirs:
    skill_name = item["name"]
    # github raw url or tree url
    html_url = item["html_url"]
    
    cat, tags = determine_category_and_tags(skill_name)
    desc = generate_desc(skill_name, cat)
    
    # Fake some uses
    uses_count = f"{round(random.uniform(0.1, 5.0), 1)}k" if random.random() > 0.7 else str(random.randint(10, 999))
    
    # Fake author
    author = "@" + skill_name.split("-")[0].lower() if "-" in skill_name else f"@community"
    if len(author) < 4:
        author = "@openclaw-dev"
    
    skill = {
        "id": id_counter,
        "name": skill_name,
        "author": author,
        "uses": uses_count,
        "category": cat,
        "desc": desc,
        "tags": tags,
        "link": html_url
    }
    skills.append(skill)
    id_counter += 1

ts_content = f"""export const categories = ["全部技能", "效率工具", "Web3 / 监控", "社交媒体", "开发辅助", "数据抓取"];

export const skillsData = {json.dumps(skills, ensure_ascii=False, indent=2)};
"""

with open("src/data/skills.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Generated {len(skills)} real skills from GitHub.")
