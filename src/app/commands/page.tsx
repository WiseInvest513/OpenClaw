"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Terminal,
  Copy,
  Check,
  Search,
  Server,
  Settings,
  MessageSquare,
  Zap,
  BookOpen,
  Download,
  Bot,
  Clock,
  Wrench,
  ArrowRight,
  ExternalLink,
  Globe,
  Box,
  Network
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type CommandItem = {
  id: string;
  cmd: string;
  title: string;
  explain: string;
  tags?: string[];
};

type CategoryMeta = {
  id: string;
  name: string;
  subtitle: string;
  Icon: LucideIcon;
};

type CategoryContent = {
  intro: string;
  flowTitle: string;
  flowSteps: string[];
  commands: CommandItem[];
};

const commandCategories: CategoryMeta[] = [
  { id: "install", name: "安装与部署", subtitle: "基础安装、静默安装、快速上手", Icon: Download },
  { id: "config", name: "核心配置", subtitle: "读取/写入配置、恢复默认", Icon: Settings },
  { id: "gateway", name: "服务与网关", subtitle: "启动、守护、日志、连通性", Icon: Server },
  { id: "model", name: "AI 模型管理", subtitle: "模型列表、认证、默认模型", Icon: Zap },
  { id: "channel", name: "通信渠道", subtitle: "接入平台、登录、探针检测", Icon: MessageSquare },
  { id: "agent", name: "智能体与消息", subtitle: "Agent、会话、主动推送", Icon: Bot },
  { id: "automation", name: "自动化与扩展", subtitle: "定时任务、Hook、插件/技能", Icon: Clock },
  { id: "browser", name: "浏览器与 Web", subtitle: "启停浏览器、快照、网页操作", Icon: Globe },
  { id: "sandbox", name: "沙盒与安全", subtitle: "安全隔离、策略配置、沙盒管理", Icon: Box },
  { id: "nodes", name: "集群与节点", subtitle: "远程节点发现、配对、集群状态", Icon: Network },
  { id: "system", name: "诊断与维护", subtitle: "健康检查、修复、安全、记忆", Icon: Wrench },
];

const commandsData: Record<string, CategoryContent> = {
  install: {
    intro:
      "这部分解决“把 OpenClaw 装起来并跑通一次”的问题。你可以走交互式流程，也可以用无人值守方式在服务器/CI 环境部署。",
    flowTitle: "推荐流程（从零开始）",
    flowSteps: [
      "安装 CLI（npm 或一键脚本）",
      "运行初始化向导（onboard）完成基础配置",
      "执行健康检查（health/status）确认环境可用",
      "按需安装网关服务（gateway install）并保持常驻",
    ],
    commands: [
      {
        id: "install-npm",
        cmd: "npm i -g openclaw",
        title: "全局安装 CLI",
        explain: "安装命令行工具本体。后续所有操作都通过 `openclaw ...` 进行。",
        tags: ["基础"],
      },
      {
        id: "install-onboard",
        cmd: "openclaw onboard",
        title: "交互式初始化",
        explain: "首次使用推荐：按步骤完成模型凭证、默认设置、工作区等基础项。",
        tags: ["推荐"],
      },
      {
        id: "install-onboard-quick",
        cmd: "openclaw onboard --flow quickstart",
        title: "快速初始化",
        explain: "减少交互步骤，优先跑通链路；之后再用 `configure` 做精细调整。",
        tags: ["快速"],
      },
      {
        id: "install-onboard-noninteractive",
        cmd: "openclaw onboard --non-interactive --auth-choice token --token-provider <provider> --token \"$TOKEN\"",
        title: "无人值守初始化（CI/服务器）",
        explain: "适合脚本化部署：通过环境变量提供 Token，不进入交互界面。",
        tags: ["自动化"],
      },
      {
        id: "install-help",
        cmd: "openclaw --help",
        title: "查看主命令帮助",
        explain: "遇到不确定的子命令/参数时，先从总览帮助开始。",
        tags: ["常用"],
      },
      {
        id: "install-version",
        cmd: "npm i -g openclaw@latest",
        title: "安装指定版本（最新稳定版）",
        explain: "显式安装 latest 标签，确保拿到当前稳定版。",
        tags: ["版本"],
      },
      {
        id: "install-beta",
        cmd: "npm i -g openclaw@beta",
        title: "安装 Beta 通道",
        explain: "提前体验新功能，适合测试环境。",
        tags: ["版本"],
      },
      {
        id: "install-update",
        cmd: "openclaw update",
        title: "检查并更新 CLI",
        explain: "从当前通道拉取新版本并执行升级，不影响本地配置与数据。",
        tags: ["维护"],
      },
      {
        id: "install-update-status",
        cmd: "openclaw update status",
        title: "查看更新状态",
        explain: "查看当前安装版本与可用更新信息。",
        tags: ["维护"],
      },
      {
        id: "install-reset",
        cmd: "openclaw reset --scope config",
        title: "重置配置（保留 CLI）",
        explain: "仅清空配置恢复默认，不卸载命令行工具。",
        tags: ["排障"],
      },
      {
        id: "install-uninstall",
        cmd: "openclaw uninstall --all --yes",
        title: "完全卸载（慎用）",
        explain: "移除 CLI 及本地数据；执行前请确认已备份需要保留的内容。",
        tags: ["维护"],
      },
    ],
  },
  config: {
    intro:
      "配置是 OpenClaw 的“总开关面板”。你可以用交互式界面管理，也可以用 `config get/set/unset` 精准改某一个键。",
    flowTitle: "推荐流程（改配置不迷路）",
    flowSteps: [
      "先用 `config get` 查看当前值",
      "确认键路径后用 `config set` 写入",
      "写复杂结构时使用 `--json`",
      "出现混乱时用 `config unset` 回到默认",
    ],
    commands: [
      {
        id: "config-configure",
        cmd: "openclaw configure",
        title: "交互式配置中心",
        explain: "适合新手：像设置面板一样浏览并调整关键选项。",
        tags: ["推荐"],
      },
      {
        id: "config-get",
        cmd: "openclaw config get <key>",
        title: "读取某个配置键",
        explain: "例：`openclaw config get gateway.port` 或 `openclaw config get agents.defaults.model.primary`。",
        tags: ["常用"],
      },
      {
        id: "config-set",
        cmd: "openclaw config set <key> <value>",
        title: "写入某个配置键",
        explain: "将配置精确写入。写数组/对象时可加 `--json` 避免转义问题。",
        tags: ["常用"],
      },
      {
        id: "config-set-json",
        cmd: "openclaw config set channels.telegram.groups '[\"*\"]' --json",
        title: "写入 JSON 值（示例）",
        explain: "把 JSON 字符串按结构写入配置（如白名单/列表类配置）。",
        tags: ["示例"],
      },
      {
        id: "config-unset",
        cmd: "openclaw config unset <key>",
        title: "删除自定义配置",
        explain: "移除你手动写入的值，让它回退到系统默认。",
        tags: ["排障"],
      },
      {
        id: "config-get-port",
        cmd: "openclaw config get gateway.port",
        title: "读取网关端口（示例）",
        explain: "常用键示例：查看网关监听端口。",
        tags: ["示例"],
      },
      {
        id: "config-set-port",
        cmd: "openclaw config set gateway.port 19001 --json",
        title: "设置网关端口（示例）",
        explain: "将网关端口改为 19001，需重启网关后生效。",
        tags: ["示例"],
      },
      {
        id: "config-set-groups",
        cmd: "openclaw config set channels.whatsapp.groups '[\"*\"]' --json",
        title: "设置渠道白名单（示例）",
        explain: "允许所有群组接入；可按需改为具体 ID 列表。",
        tags: ["示例"],
      },
    ],
  },
  gateway: {
    intro:
      "网关相当于本地“控制中枢”。CLI、桌面端或外部渠道通常都会依赖它来执行任务、收发消息、调度技能。",
    flowTitle: "推荐流程（让网关稳定跑起来）",
    flowSteps: [
      "前台启动验证能跑：`gateway run`",
      "安装为系统服务：`gateway install`",
      "用 `gateway status/health` 验证稳定性",
      "通过 `logs --follow` 实时观察问题",
    ],
    commands: [
      {
        id: "gateway-run",
        cmd: "openclaw gateway run --bind loopback --port 18789",
        title: "前台运行网关（调试）",
        explain: "开发/排障时推荐先前台启动；端口可按需调整。",
        tags: ["调试"],
      },
      {
        id: "gateway-run-force",
        cmd: "openclaw gateway run --port 18789 --force",
        title: "强制接管端口",
        explain: "当已有进程占用端口时用；会尝试接管并确保网关可用。",
        tags: ["排障"],
      },
      {
        id: "gateway-install",
        cmd: "openclaw gateway install --port 18789",
        title: "安装为后台服务（生产）",
        explain: "适合长期运行：注册为系统服务，让网关随系统启动并自动守护。",
        tags: ["生产"],
      },
      {
        id: "gateway-status",
        cmd: "openclaw gateway status --deep",
        title: "查看网关状态（深度）",
        explain: "比普通 status 更详细，适合排查端口、绑定、内部组件状态。",
        tags: ["常用"],
      },
      {
        id: "gateway-health",
        cmd: "openclaw gateway health",
        title: "网关健康检查",
        explain: "快速判断网关是否可用；适合自动化脚本中做 ready check。",
        tags: ["常用"],
      },
      {
        id: "gateway-logs",
        cmd: "openclaw logs --follow",
        title: "实时查看日志",
        explain: "追踪启动失败、认证失败、渠道收发异常等问题最直接。",
        tags: ["排障"],
      },
      {
        id: "gateway-start",
        cmd: "openclaw gateway start",
        title: "启动网关服务",
        explain: "在已安装为系统服务的前提下，启动网关守护进程。",
        tags: ["常用"],
      },
      {
        id: "gateway-stop",
        cmd: "openclaw gateway stop",
        title: "停止网关服务",
        explain: "优雅停止当前运行的网关进程。",
        tags: ["常用"],
      },
      {
        id: "gateway-restart",
        cmd: "openclaw gateway restart",
        title: "重启网关服务",
        explain: "先停止再启动，配置变更后常用。",
        tags: ["常用"],
      },
      {
        id: "gateway-uninstall",
        cmd: "openclaw gateway uninstall",
        title: "卸载网关系统服务",
        explain: "从系统服务中移除网关注册，不再随系统自启。",
        tags: ["维护"],
      },
      {
        id: "gateway-discover",
        cmd: "openclaw gateway discover",
        title: "发现局域网 / Tailnet 网关",
        explain: "在同一网络或 Tailscale 下自动发现其他节点上的网关。",
        tags: ["进阶"],
      },
      {
        id: "gateway-probe",
        cmd: "openclaw gateway probe",
        title: "网关探针检测",
        explain: "轻量探测网关是否在线、响应是否正常。",
        tags: ["排障"],
      },
      {
        id: "gateway-call",
        cmd: "openclaw gateway call status",
        title: "低级 RPC 调用（示例）",
        explain: "直接调用网关内部接口，高级调试时使用。",
        tags: ["进阶"],
      },
      {
        id: "logs-limit",
        cmd: "openclaw logs --limit 200 --json",
        title: "查看最近 N 条日志（JSON）",
        explain: "不跟随时，拉取最近若干条日志，便于脚本分析。",
        tags: ["排障"],
      },
    ],
  },
  model: {
    intro:
      "模型管理聚焦“我现在能用哪些模型、默认用哪个、凭证是否可用”。建议先把默认主模型和图像模型配置好，再去接入渠道与技能。",
    flowTitle: "推荐流程（把模型配到能跑）",
    flowSteps: [
      "列出可用模型：`models list`",
      "添加/更新凭证：`models auth add`",
      "探测连通性：`models status --probe`",
      "设置默认模型：`models set` / `models set-image`",
    ],
    commands: [
      {
        id: "models-list",
        cmd: "openclaw models list",
        title: "列出可用模型",
        explain: "查看当前环境支持哪些 provider/模型 ID，后续 `models set` 会用到。",
        tags: ["常用"],
      },
      {
        id: "models-auth-add",
        cmd: "openclaw models auth add",
        title: "添加/更新模型凭证",
        explain: "把 API Key/Token 写入安全存储，避免散落在脚本里。",
        tags: ["推荐"],
      },
      {
        id: "models-status-probe",
        cmd: "openclaw models status --probe",
        title: "在线探测模型可用性",
        explain: "会发起真实请求验证认证与连通性（可能消耗少量 token）。",
        tags: ["排障"],
      },
      {
        id: "models-set",
        cmd: "openclaw models set <model-id>",
        title: "设置默认主模型",
        explain: "把你常用的大语言模型设为默认，智能体会优先使用它。",
        tags: ["常用"],
      },
      {
        id: "models-set-image",
        cmd: "openclaw models set-image <model-id>",
        title: "设置默认图像模型",
        explain: "当技能或工作流涉及图像生成/识别时，会用到这里的默认设置。",
        tags: ["可选"],
      },
      {
        id: "models-list-provider",
        cmd: "openclaw models list --provider volcengine-coding-plan",
        title: "按提供商列出模型",
        explain: "只查看某一提供商下的模型列表，便于筛选。",
        tags: ["常用"],
      },
      {
        id: "models-aliases-list",
        cmd: "openclaw models aliases list",
        title: "列出模型别名",
        explain: "查看已配置的简短别名，便于在 set 时使用。",
        tags: ["可选"],
      },
      {
        id: "models-aliases-add",
        cmd: "openclaw models aliases add fast <model-id>",
        title: "添加模型别名",
        explain: "为长模型 ID 设置简短别名，例如 fast。",
        tags: ["可选"],
      },
      {
        id: "models-fallbacks-list",
        cmd: "openclaw models fallbacks list",
        title: "列出回退模型",
        explain: "主模型不可用时的备用模型链。",
        tags: ["可选"],
      },
      {
        id: "models-fallbacks-add",
        cmd: "openclaw models fallbacks add <model-id>",
        title: "添加回退模型",
        explain: "当主模型失败时依次尝试这些模型。",
        tags: ["可选"],
      },
      {
        id: "models-scan",
        cmd: "openclaw models scan --provider openrouter --set-default",
        title: "扫描并设置默认模型",
        explain: "自动探测某提供商下的可用模型，并可设为默认。",
        tags: ["进阶"],
      },
      {
        id: "models-auth-setup",
        cmd: "openclaw models auth setup-token",
        title: "Claude Code Token 设置",
        explain: "交互式配置 Claude Code 类 token。",
        tags: ["可选"],
      },
    ],
  },
  channel: {
    intro:
      "通信渠道让你在 WhatsApp/Telegram/Discord 等聊天工具里直接和 OpenClaw 对话。建议先 `channels list` 看现状，再逐个接入并用 `status --probe` 做连通性验证。",
    flowTitle: "推荐流程（接入一个新渠道）",
    flowSteps: [
      "查看已有渠道：`channels list`",
      "添加渠道配置：`channels add`（按平台填写 token 等）",
      "需要登录的渠道执行登录：`channels login`",
      "用探针检查收发：`channels status --probe`",
      "查看渠道日志定位问题：`channels logs`",
    ],
    commands: [
      {
        id: "channels-list",
        cmd: "openclaw channels list",
        title: "列出所有已配置渠道",
        explain: "查看当前所有已配置的社交通讯渠道及其连接状态。",
        tags: ["常用"],
      },
      {
        id: "channels-status",
        cmd: "openclaw channels status",
        title: "渠道状态检查（快速）",
        explain: "快速查看是否已连接、是否有明显异常；适合日常巡检。",
        tags: ["常用"],
      },
      {
        id: "channels-status-probe",
        cmd: "openclaw channels status --probe",
        title: "渠道深度探测（推荐）",
        explain: "对每个渠道做更深入的连通性验证，适合接入后确认、或排障时使用。",
        tags: ["排障", "推荐"],
      },
      {
        id: "channels-add",
        cmd: "openclaw channels add --channel <telegram|discord|slack|whatsapp>",
        title: "添加一个渠道",
        explain: "按渠道类型新增接入配置；不同平台需要不同 token/参数。",
        tags: ["上手"],
      },
      {
        id: "channels-login",
        cmd: "openclaw channels login --channel whatsapp",
        title: "登录/配对（示例：WhatsApp）",
        explain: "某些渠道需要扫码/授权才能收发消息，登录成功后再做探针检测。",
        tags: ["示例"],
      },
      {
        id: "channels-logs",
        cmd: "openclaw channels logs --channel all --lines 200",
        title: "查看渠道日志",
        explain: "当收发异常/权限不足/回调失败时，优先查看这里的日志定位问题。",
        tags: ["排障"],
      },
      {
        id: "channels-remove",
        cmd: "openclaw channels remove --channel <name>",
        title: "移除一个渠道",
        explain: "不再使用的渠道建议移除，减少噪音与潜在的误触发。",
        tags: ["维护"],
      },
      {
        id: "channels-add-telegram",
        cmd: "openclaw channels add --channel telegram --token \"$TELEGRAM_BOT_TOKEN\"",
        title: "添加 Telegram 渠道（示例）",
        explain: "使用环境变量中的 Bot Token 添加 Telegram。",
        tags: ["示例"],
      },
      {
        id: "channels-add-discord",
        cmd: "openclaw channels add --channel discord --token \"$DISCORD_BOT_TOKEN\"",
        title: "添加 Discord 渠道（示例）",
        explain: "使用 Bot Token 接入 Discord 服务器。",
        tags: ["示例"],
      },
      {
        id: "channels-add-slack",
        cmd: "openclaw channels add --channel slack --token \"$SLACK_TOKEN\" --app-token \"$SLACK_APP_TOKEN\"",
        title: "添加 Slack 渠道（示例）",
        explain: "Slack 通常需要 Bot Token 与 App-Level Token。",
        tags: ["示例"],
      },
      {
        id: "channels-capabilities",
        cmd: "openclaw channels capabilities",
        title: "查看渠道能力",
        explain: "了解各渠道是否支持媒体、投票、回复等能力。",
        tags: ["进阶"],
      },
      {
        id: "channels-capabilities-target",
        cmd: "openclaw channels capabilities --channel discord --target channel:123456",
        title: "查看指定目标能力",
        explain: "针对某一频道或会话查看其支持的能力。",
        tags: ["进阶"],
      },
      {
        id: "channels-list-json",
        cmd: "openclaw channels list --json",
        title: "列出渠道（JSON）",
        explain: "机器可读格式，便于脚本或监控集成。",
        tags: ["常用"],
      },
    ],
  },
  agent: {
    intro:
      "智能体（Agent）是“不同角色/不同工作区/不同权限”的容器。你可以为工作、生活、测试环境分别创建智能体，并在需要时切换或并行运行。",
    flowTitle: "推荐流程（创建一个工作智能体）",
    flowSteps: [
      "列出已有智能体：`agents list`",
      "创建新智能体并绑定工作区：`agents add`",
      "设置身份信息（名称/头像等）：`agents set-identity`",
      "用 `agent --message` 做一次单次对话验证",
    ],
    commands: [
      {
        id: "agents-list",
        cmd: "openclaw agents list --json",
        title: "列出智能体（JSON）",
        explain: "用机器可读格式查看 agent、workspace、bindings 等信息，方便脚本处理。",
        tags: ["常用"],
      },
      {
        id: "agents-add",
        cmd: "openclaw agents add work --workspace ~/clawd-work",
        title: "创建智能体（示例）",
        explain: "把工作相关的技能/记忆/提示放进独立目录，更新或迁移更安全。",
        tags: ["示例"],
      },
      {
        id: "agents-delete",
        cmd: "openclaw agents delete <name>",
        title: "删除智能体",
        explain: "清理不再需要的 agent；执行前建议备份其 workspace（如有重要记忆/技能）。",
        tags: ["维护"],
      },
      {
        id: "agents-identity",
        cmd: "openclaw agents set-identity --agent <name> --name \"Claw\"",
        title: "设置身份信息",
        explain: "自定义智能体呈现与人格标签（例如名字/emoji）。",
        tags: ["可选"],
      },
      {
        id: "agent-once",
        cmd: "openclaw agent --message \"你好，帮我做一次自检\" --local",
        title: "单次对话调用（本地）",
        explain: "不经过聊天渠道也能直接验证模型、网关、工具链是否可用。",
        tags: ["排障"],
      },
      {
        id: "message-send",
        cmd: "openclaw message send --channel telegram --target \"<chatId>\" --message \"Hello\"",
        title: "主动发送消息",
        explain: "用于通知/提醒/系统告警推送（例如配合 cron/hook）。",
        tags: ["常用"],
      },
      {
        id: "sessions",
        cmd: "openclaw sessions --json --verbose",
        title: "查看会话列表",
        explain: "查看历史对话会话与元数据，排查“上下文为什么没记住/去哪了”。",
        tags: ["排障"],
      },
      {
        id: "message-send-media",
        cmd: "openclaw message send --channel telegram --target \"<chatId>\" --media ./photo.jpg",
        title: "发送媒体消息",
        explain: "向指定会话发送图片或文件。",
        tags: ["常用"],
      },
      {
        id: "message-poll",
        cmd: "openclaw message poll --channel discord --target channel:123 --poll-question \"午饭吃什么?\" --poll-option \"披萨\" --poll-option \"寿司\"",
        title: "发送投票（示例）",
        explain: "在支持的渠道（如 Discord）下发投票消息。",
        tags: ["示例"],
      },
      {
        id: "message-react",
        cmd: "openclaw message react --channel discord --target channel:123 --message-id 456 --emoji \"👍\"",
        title: "消息表情回应",
        explain: "对某条消息添加 emoji 反应。",
        tags: ["可选"],
      },
      {
        id: "message-search",
        cmd: "openclaw message search --channel slack --target \"channel:C123\" --query \"部署\"",
        title: "搜索消息",
        explain: "在指定渠道/会话中按关键词搜索历史消息。",
        tags: ["进阶"],
      },
      {
        id: "agent-deliver",
        cmd: "openclaw agent --message \"提醒内容\" --to \"+15555550123\" --deliver",
        title: "单次对话并投递到指定目标",
        explain: "执行一次对话并将结果发送到指定渠道/用户。",
        tags: ["进阶"],
      },
      {
        id: "agents-list-bindings",
        cmd: "openclaw agents list --json --bindings",
        title: "列出智能体及绑定信息",
        explain: "包含渠道绑定等详细信息，便于排查路由。",
        tags: ["排障"],
      },
    ],
  },
  automation: {
    intro:
      "自动化与扩展是 OpenClaw 的“生产力倍增器”。cron 负责定时/周期任务，hooks 负责事件触发，plugins/skills 则负责能力扩展。",
    flowTitle: "推荐流程（做一个每天自动汇总）",
    flowSteps: [
      "确认系统健康：`status` / `doctor`",
      "创建一个 cron：`cron add`",
      "查看运行情况：`cron runs` 或日志",
      "按需安装插件/技能：`plugins install` / `skills list`",
    ],
    commands: [
      {
        id: "cron-status",
        cmd: "openclaw cron status",
        title: "查看计划任务系统状态",
        explain: "确认 cron 运行器是否正常工作，是排查“为什么没触发”的第一步。",
        tags: ["排障"],
      },
      {
        id: "cron-list",
        cmd: "openclaw cron list",
        title: "列出所有计划任务",
        explain: "查看任务 ID、频率与启用状态，便于管理与审计。",
        tags: ["常用"],
      },
      {
        id: "cron-add",
        cmd: "openclaw cron add --name \"日报\" --every 24h --system-event \"生成今日工作日报\"",
        title: "新增周期任务（示例）",
        explain: "把你希望系统定期执行的事情变成计划任务（如日报/巡检/清理）。",
        tags: ["示例"],
      },
      {
        id: "hooks-list",
        cmd: "openclaw hooks list --eligible",
        title: "查看可用 Hooks",
        explain: "展示当前环境可启用的事件钩子，适合快速发现系统能力。",
        tags: ["可选"],
      },
      {
        id: "hooks-enable",
        cmd: "openclaw hooks enable <hook-name>",
        title: "启用某个 Hook",
        explain: "当你希望某类事件自动触发行为（如保存记忆、记录审计）时使用。",
        tags: ["自动化"],
      },
      {
        id: "plugins-install",
        cmd: "openclaw plugins install <path-or-npm-spec>",
        title: "安装插件",
        explain: "插件用于扩展系统工具链能力；可来自官方源、npm、或本地路径。",
        tags: ["扩展"],
      },
      {
        id: "skills-list",
        cmd: "openclaw skills list --eligible",
        title: "列出可用技能",
        explain: "查看当前可用技能，确认能力是否加载成功，以及是否满足运行条件。",
        tags: ["常用"],
      },
      {
        id: "skills-info",
        cmd: "openclaw skills info <skill-name>",
        title: "查看技能详情",
        explain: "查看某一技能的说明、参数与依赖。",
        tags: ["常用"],
      },
      {
        id: "skills-check",
        cmd: "openclaw skills check",
        title: "技能就绪检查",
        explain: "汇总各技能是否就绪、缺失哪些条件。",
        tags: ["排障"],
      },
      {
        id: "cron-enable",
        cmd: "openclaw cron enable <job-id>",
        title: "启用计划任务",
        explain: "将已禁用的定时任务重新启用。",
        tags: ["常用"],
      },
      {
        id: "cron-disable",
        cmd: "openclaw cron disable <job-id>",
        title: "禁用计划任务",
        explain: "暂时关闭某一定时任务而不删除。",
        tags: ["常用"],
      },
      {
        id: "cron-edit",
        cmd: "openclaw cron edit <job-id> --every 12h",
        title: "编辑计划任务",
        explain: "修改已有任务的周期、命令等。",
        tags: ["常用"],
      },
      {
        id: "cron-rm",
        cmd: "openclaw cron rm <job-id>",
        title: "删除计划任务",
        explain: "永久移除某一定时任务。",
        tags: ["维护"],
      },
      {
        id: "cron-run",
        cmd: "openclaw cron run <job-id>",
        title: "手动触发计划任务",
        explain: "不等到下次调度时间，立即执行一次。",
        tags: ["排障"],
      },
      {
        id: "cron-runs",
        cmd: "openclaw cron runs --id <job-id>",
        title: "查看任务运行历史",
        explain: "查看某任务的最近执行记录与结果。",
        tags: ["排障"],
      },
      {
        id: "cron-add-at",
        cmd: "openclaw cron add --name \"提醒\" --at \"2026-03-03T09:00:00\" --message \"开会提醒\"",
        title: "添加单次定时任务（示例）",
        explain: "在指定时间点执行一次消息推送。",
        tags: ["示例"],
      },
      {
        id: "hooks-disable",
        cmd: "openclaw hooks disable <hook-name>",
        title: "禁用某个 Hook",
        explain: "关闭不再需要的事件钩子。",
        tags: ["维护"],
      },
      {
        id: "hooks-info",
        cmd: "openclaw hooks info session-memory",
        title: "查看 Hook 详情",
        explain: "查看某一钩子的说明与触发条件。",
        tags: ["可选"],
      },
      {
        id: "plugins-list",
        cmd: "openclaw plugins list",
        title: "列出已安装插件",
        explain: "查看当前已加载的插件及其状态。",
        tags: ["常用"],
      },
      {
        id: "plugins-enable",
        cmd: "openclaw plugins enable <plugin-id>",
        title: "启用插件",
        explain: "启用已安装但被禁用的插件。",
        tags: ["常用"],
      },
      {
        id: "plugins-disable",
        cmd: "openclaw plugins disable <plugin-id>",
        title: "禁用插件",
        explain: "暂时关闭某插件而不卸载。",
        tags: ["维护"],
      },
      {
        id: "plugins-update",
        cmd: "openclaw plugins update --all",
        title: "更新全部插件",
        explain: "从源拉取并更新所有已安装插件。",
        tags: ["维护"],
      },
    ],
  },
  browser: {
    intro:
      "使用 OpenClaw 强大的无头浏览器控制能力，自动访问网页、截图或与网页元素进行交互。该能力常用于 RPA 或技能中的 Web 数据抓取。",
    flowTitle: "推荐流程（自动截图网页）",
    flowSteps: [
      "启动浏览器：`browser start`",
      "打开标签页：`browser open <url>`",
      "执行截图：`browser screenshot --full-page`",
      "关闭浏览器释放资源：`browser stop`"
    ],
    commands: [
      {
        id: "browser-start",
        cmd: "openclaw browser start",
        title: "启动浏览器引擎",
        explain: "在后台启动受控的无头浏览器进程。",
        tags: ["常用"],
      },
      {
        id: "browser-stop",
        cmd: "openclaw browser stop",
        title: "停止浏览器引擎",
        explain: "终止所有关联的浏览器进程，释放内存。",
        tags: ["维护"],
      },
      {
        id: "browser-status",
        cmd: "openclaw browser status",
        title: "查看浏览器状态",
        explain: "检查当前是否有运行中的浏览器实例。",
        tags: ["排障"],
      },
      {
        id: "browser-tabs",
        cmd: "openclaw browser tabs",
        title: "列出当前所有标签页",
        explain: "查看正在活动或已打开的网页列表。",
        tags: ["常用"],
      },
      {
        id: "browser-open",
        cmd: "openclaw browser open https://example.com",
        title: "在新标签打开网页",
        explain: "在浏览器中新开标签页并跳转到指定地址。",
        tags: ["常用"],
      },
      {
        id: "browser-screenshot",
        cmd: "openclaw browser screenshot --full-page",
        title: "页面截长图",
        explain: "对当前活跃标签页进行完整页面滚动截图。",
        tags: ["示例"],
      },
      {
        id: "browser-snapshot",
        cmd: "openclaw browser snapshot --format ai",
        title: "页面 AI 结构快照",
        explain: "提取用于大模型阅读的结构化 DOM 快照，便于提取页面信息。",
        tags: ["进阶"],
      },
      {
        id: "browser-navigate",
        cmd: "openclaw browser navigate https://example.com",
        title: "当前标签页跳转",
        explain: "让当前活动的标签页导航至新地址。",
        tags: ["常用"],
      },
      {
        id: "browser-click",
        cmd: "openclaw browser click <ref>",
        title: "模拟点击网页元素",
        explain: "通过传入的元素引用 (ref) 或选择器，在页面中触发点击事件。",
        tags: ["进阶"],
      },
      {
        id: "browser-type",
        cmd: "openclaw browser type <ref> \"Hello\"",
        title: "网页表单输入",
        explain: "在指定的输入框内模拟键盘输入文字内容。",
        tags: ["进阶"],
      },
    ],
  },
  sandbox: {
    intro:
      "沙盒（Sandbox）保障了 OpenClaw 执行未知脚本或危险代码时的安全性。所有复杂的代码执行默认都在沙盒容器中完成隔离。",
    flowTitle: "推荐流程（排查沙盒环境异常）",
    flowSteps: [
      "查看当前沙盒：`sandbox list`",
      "检查沙盒策略：`sandbox explain`",
      "环境损坏时重置：`sandbox recreate`"
    ],
    commands: [
      {
        id: "sandbox-list",
        cmd: "openclaw sandbox list",
        title: "查看运行中的沙盒",
        explain: "列出当前与智能体关联的沙盒环境及资源占用。",
        tags: ["进阶"],
      },
      {
        id: "sandbox-list-json",
        cmd: "openclaw sandbox list --json",
        title: "查看沙盒详细信息",
        explain: "以 JSON 格式输出沙盒内部端口、挂载目录等底层信息。",
        tags: ["排障"],
      },
      {
        id: "sandbox-explain",
        cmd: "openclaw sandbox explain",
        title: "查看全局沙盒策略",
        explain: "展示目前系统所应用的沙盒权限级别与安全配置。",
        tags: ["安全"],
      },
      {
        id: "sandbox-explain-agent",
        cmd: "openclaw sandbox explain --agent work",
        title: "查看特定智能体沙盒",
        explain: "专门查看针对某一具体 agent 应用的沙盒限制策略。",
        tags: ["排障"],
      },
      {
        id: "sandbox-recreate-all",
        cmd: "openclaw sandbox recreate --all",
        title: "重建所有沙盒容器",
        explain: "当容器损坏、依赖卡死时，强行清空并重新初始化所有沙盒。",
        tags: ["排障", "维护"],
      },
      {
        id: "sandbox-recreate-agent",
        cmd: "openclaw sandbox recreate --agent work",
        title: "重建指定沙盒容器",
        explain: "仅对特定智能体进行沙盒重置，不影响其他正在运行的任务。",
        tags: ["维护"],
      },
    ]
  },
  nodes: {
    intro:
      "OpenClaw 具备多节点集群能力。允许你在手机上通过主节点，远程调度运行在另一台电脑（边缘节点）上的摄像头、Shell 乃至其他智能体。",
    flowTitle: "推荐流程（接入一个新的从节点）",
    flowSteps: [
      "从节点发起连接",
      "主节点查看待审批：`nodes pending`",
      "主节点同意接入：`nodes approve <id>`",
      "验证节点状态并执行命令：`nodes run --node <id> -- <cmd>`"
    ],
    commands: [
      {
        id: "nodes-status",
        cmd: "openclaw nodes status",
        title: "集群网络状态",
        explain: "查看整体 P2P/Tailnet 集群运行状况及节点总数。",
        tags: ["监控"],
      },
      {
        id: "nodes-list",
        cmd: "openclaw nodes list --connected",
        title: "列出在线节点",
        explain: "展示当前处于可用连接状态的全部远程节点。",
        tags: ["常用"],
      },
      {
        id: "nodes-pending",
        cmd: "openclaw nodes pending",
        title: "查看待审批节点",
        explain: "当有新的外部节点尝试接入你的主节点时，在这列出请求。",
        tags: ["安全"],
      },
      {
        id: "nodes-approve",
        cmd: "openclaw nodes approve <requestId>",
        title: "批准节点接入",
        explain: "校验 requestId 后，允许该远程节点正式加入你的网络。",
        tags: ["安全"],
      },
      {
        id: "nodes-run",
        cmd: "openclaw nodes run --node <id> -- ls -la",
        title: "远程执行 Shell 命令",
        explain: "直接让远程的指定节点执行一段命令并带回执行结果。",
        tags: ["示例", "进阶"],
      },
      {
        id: "nodes-invoke",
        cmd: "openclaw nodes invoke --node <id> --command status",
        title: "调用远程 OpenClaw",
        explain: "在指定节点上远程触发一段特定的 OpenClaw CLI 指令。",
        tags: ["进阶"],
      },
      {
        id: "nodes-camera-snap",
        cmd: "openclaw nodes camera snap --node <id>",
        title: "远程摄像头抓拍",
        explain: "触发远程节点的摄像头进行单张照片抓拍并传回本地。",
        tags: ["示例"],
      },
      {
        id: "nodes-camera-clip",
        cmd: "openclaw nodes camera clip --node <id> --duration 10s",
        title: "远程摄像头录像",
        explain: "让指定节点录制一段视频（如 10 秒）后发送回来。",
        tags: ["示例"],
      },
    ],
  },
  system: {
    intro:
      "这部分是“运维工具箱”。当你遇到：连不上、收不到消息、模型不可用、任务不触发——优先从 `doctor/status/health/logs` 这几条开始。",
    flowTitle: "推荐流程（出现问题怎么查）",
    flowSteps: [
      "跑一遍自动诊断：`doctor`",
      "看全量状态报告：`status --all`",
      "查看日志：`logs --follow`",
      "做安全审计：`security audit`（必要时修复）",
      "记忆相关问题：`memory status/index/search`",
    ],
    commands: [
      {
        id: "status",
        cmd: "openclaw status --all",
        title: "全量状态报告",
        explain: "输出系统、网关、模型、渠道、插件等整体状态，是排障最常用入口。",
        tags: ["排障", "常用"],
      },
      {
        id: "health",
        cmd: "openclaw health --json",
        title: "健康检查（JSON）",
        explain: "适合脚本/监控：用机器可读格式判断系统是否健康。",
        tags: ["监控"],
      },
      {
        id: "doctor",
        cmd: "openclaw doctor --repair",
        title: "自动诊断与修复",
        explain: "扫描常见问题并尝试修复（如依赖、权限、端口冲突等）。",
        tags: ["推荐"],
      },
      {
        id: "security",
        cmd: "openclaw security audit --fix",
        title: "安全审计与加固",
        explain: "检查风险配置并尝试修复，建议在对外暴露服务前执行。",
        tags: ["安全"],
      },
      {
        id: "memory-status",
        cmd: "openclaw memory status --deep",
        title: "记忆系统状态（深度）",
        explain: "排查“为什么搜不到/记不住”：从向量索引、embedding 到存储状态一并检查。",
        tags: ["排障"],
      },
      {
        id: "memory-index",
        cmd: "openclaw memory index --verbose",
        title: "重建/更新记忆索引",
        explain: "当你导入了新资料或更换了 embedding 配置时，建议重新 index。",
        tags: ["维护"],
      },
      {
        id: "memory-search",
        cmd: "openclaw memory search \"发布流程\"",
        title: "记忆搜索（示例）",
        explain: "像搜索知识库一样按语义查找资料，用于快速定位已保存的上下文。",
        tags: ["常用"],
      },
      {
        id: "status-deep",
        cmd: "openclaw status --deep",
        title: "状态报告（深度探测）",
        explain: "对渠道等做深度探测，输出更详细，耗时稍长。",
        tags: ["排障"],
      },
      {
        id: "status-usage",
        cmd: "openclaw status --usage",
        title: "状态报告（含用量）",
        explain: "在状态中附带模型用量等信息。",
        tags: ["监控"],
      },
      {
        id: "doctor-deep",
        cmd: "openclaw doctor --deep",
        title: "深度诊断",
        explain: "更全面的环境与配置扫描，不自动修复。",
        tags: ["排障"],
      },
      {
        id: "security-audit-deep",
        cmd: "openclaw security audit --deep",
        title: "安全审计（深度）",
        explain: "包含在线网关探测的深度安全扫描。",
        tags: ["安全"],
      },
      {
        id: "memory-index-agent",
        cmd: "openclaw memory index --agent main --verbose",
        title: "为指定智能体建索引",
        explain: "仅对某一 agent 的记忆做索引更新。",
        tags: ["维护"],
      },
      {
        id: "dashboard",
        cmd: "openclaw dashboard",
        title: "打开 Web 控制面板",
        explain: "在浏览器中打开本地 Web UI，进行可视化操作。",
        tags: ["常用"],
      },
      {
        id: "tui",
        cmd: "openclaw tui",
        title: "终端 UI",
        explain: "在终端内使用简易 TUI 与智能体交互。",
        tags: ["可选"],
      },
      {
        id: "docs",
        cmd: "openclaw docs \"如何配置 Telegram\"",
        title: "文档搜索",
        explain: "在本地或在线文档中搜索关键词。",
        tags: ["常用"],
      },
      {
        id: "reset-full",
        cmd: "openclaw reset --scope full --yes",
        title: "完全重置（慎用）",
        explain: "清空配置与数据，恢复出厂状态；务必先备份。",
        tags: ["排障"],
      },
      {
        id: "pairing-list",
        cmd: "openclaw pairing list whatsapp",
        title: "查看配对列表（示例：WhatsApp）",
        explain: "查看待审批或已完成的设备配对请求。",
        tags: ["示例"],
      },
      {
        id: "pairing-approve",
        cmd: "openclaw pairing approve whatsapp <code>",
        title: "审批配对（示例）",
        explain: "通过配对码完成设备授权。",
        tags: ["示例"],
      },
      {
        id: "sandbox-list",
        cmd: "openclaw sandbox list",
        title: "查看沙盒容器",
        explain: "列出当前与智能体关联的沙盒环境。",
        tags: ["进阶"],
      },
      {
        id: "nodes-status",
        cmd: "openclaw nodes status",
        title: "远程节点状态",
        explain: "查看已连接的远程节点（多机部署时使用）。",
        tags: ["进阶"],
      },
    ],
  },
};

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600">
      {label}
    </span>
  );
}

function CodeBlock({
  command,
  title,
  description,
  tags,
}: {
  command: string;
  title: string;
  description: string;
  tags?: string[];
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-slate-900">{title}</p>
            {tags?.length ? (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </div>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
      </div>

      <div className="mt-3 relative rounded-lg bg-slate-950 p-3 font-mono text-[13px] overflow-hidden border border-slate-900">
        <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400"></div>
        <div className="flex items-start justify-between gap-4">
          <code className="text-emerald-300 break-all">
            <span className="text-slate-500 mr-2">$</span>
            {command}
          </code>
          <button
            onClick={handleCopy}
            className="text-slate-400 hover:text-white transition-colors shrink-0 p-1"
            title="复制命令"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CommandsPage() {
  const [activeSection, setActiveSection] = useState("install");
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const results: Array<{
      sectionId: string;
      sectionName: string;
      sectionSubtitle: string;
      item: CommandItem;
    }> = [];

    for (const cat of commandCategories) {
      const content = commandsData[cat.id];
      if (!content) continue;
      for (const item of content.commands) {
        const hay = `${cat.name} ${cat.subtitle} ${item.title} ${item.cmd} ${item.explain} ${(item.tags || []).join(" ")}`.toLowerCase();
        if (hay.includes(q)) {
          results.push({
            sectionId: cat.id,
            sectionName: cat.name,
            sectionSubtitle: cat.subtitle,
            item,
          });
        }
      }
    }

    return results.slice(0, 80);
  }, [query]);

  const activeMeta = commandCategories.find((c) => c.id === activeSection);
  const activeContent = commandsData[activeSection];

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-1">
      {/* 头部标题区 */}
      <div className="mb-10 pb-8 border-b border-slate-200 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-nunito flex items-center justify-center md:justify-start gap-3 mb-4">
            <div className="p-2 bg-slate-900 rounded-lg text-white shadow-sm">
              <Terminal className="w-6 h-6" />
            </div>
            CLI 常用命令速查
          </h1>
          <p className="text-slate-600 max-w-2xl">
            一套“能直接用”的 OpenClaw CLI 速查：按场景整理成连贯流程，每条命令都带用途解释，并支持全局搜索。
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2">
            <a
              href="https://openclaw.ai/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              官方站点 <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索命令 / 解释（如：status、probe、telegram）..." 
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-300"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* 左侧导航导航 */}
        <aside className="w-full md:w-64 shrink-0 z-10">
          {/* 添加最大高度和独立滚动，避免侧边栏过长时随右侧整体滚动 */}
          <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain pb-8 pr-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> 目录指引
            </h3>
            <nav className="flex flex-col gap-1">
              {commandCategories.map((cat) => {
                const isActive = activeSection === cat.id && !query.trim();
                return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setQuery("");
                    setActiveSection(cat.id);
                  }}
                  className={`flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-all border ${
                    isActive
                      ? "bg-yellow-50 border-yellow-200 text-slate-900 shadow-sm"
                      : "border-transparent text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className={isActive ? "text-yellow-700 mt-0.5" : "text-slate-400 mt-0.5"}>
                    <cat.Icon className="w-4 h-4" />
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-sm font-semibold ${isActive ? "text-slate-900" : "text-slate-800"}`}>
                      {cat.name}
                    </span>
                    <span className="block text-xs text-slate-500 mt-0.5 truncate">{cat.subtitle}</span>
                  </span>
                </button>
              )})}
            </nav>
          </div>
        </aside>

        {/* 右侧命令展示区 */}
        <main className="flex-1 min-w-0">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardContent className="p-6 md:p-8">
              {searchResults ? (
                <>
                  <h2 className="text-2xl font-bold font-nunito mb-2 flex items-center gap-2 text-slate-900">
                    搜索结果
                    <span className="text-sm font-medium text-slate-500">
                      （{searchResults.length}）
                    </span>
                  </h2>
                  <p className="text-sm text-slate-600 mb-6">
                    输入关键字即可跨分类查找命令与解释，点击结果会自动切换到对应分类。
                  </p>

                  <div className="space-y-3">
                    {searchResults.length ? (
                      searchResults.map((r) => (
                        <button
                          key={`${r.sectionId}-${r.item.id}`}
                          onClick={() => {
                            setQuery("");
                            setActiveSection(r.sectionId);
                          }}
                          className="w-full text-left rounded-xl border border-slate-200 bg-white p-4 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-900 truncate">{r.item.title}</p>
                              <p className="mt-1 text-xs text-slate-500 truncate">
                                {r.sectionName} · {r.sectionSubtitle}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                          </div>
                          <p className="mt-2 text-sm text-slate-600 line-clamp-2">{r.item.explain}</p>
                          <p className="mt-2 font-mono text-[12px] text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-1 break-all">
                            $ {r.item.cmd}
                          </p>
                        </button>
                      ))
                    ) : (
                      <div className="text-center py-14 text-slate-500 flex flex-col items-center">
                        <Search className="w-10 h-10 mb-3 opacity-30" />
                        <p>没有匹配到结果，换个关键词试试。</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold font-nunito mb-2 flex items-center gap-2 text-slate-900">
                    {activeMeta?.name}
                  </h2>
                  <p className="text-sm text-slate-600 mb-6">{activeContent?.intro}</p>

                  {activeContent?.flowSteps?.length ? (
                    <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-5">
                      <p className="text-sm font-semibold text-slate-900">{activeContent.flowTitle}</p>
                      <ol className="mt-3 grid gap-2">
                        {activeContent.flowSteps.map((s) => (
                          <li key={s} className="flex items-start gap-2 text-sm text-slate-700">
                            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-yellow-500" />
                            <span className="min-w-0">{s}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ) : null}

                  <div className="grid gap-4">
                    {(activeContent?.commands || []).map((item) => (
                      <CodeBlock
                        key={item.id}
                        command={item.cmd}
                        title={item.title}
                        description={item.explain}
                        tags={item.tags}
                      />
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* 提示信息 */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex gap-3 text-sm text-blue-900">
              <div className="shrink-0 mt-0.5">ℹ️</div>
              <div>
                <p className="font-semibold">通用建议</p>
                <p className="mt-1 text-blue-800/90">
                  不确定参数时先用 <code>--help</code>；需要机器可读输出时加 <code>--json</code>；问题排查优先从{" "}
                  <code>doctor</code> / <code>status</code> / <code>logs</code> 开始。
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800">
              <p className="font-semibold flex items-center gap-2">
                快速入口 <ExternalLink className="w-4 h-4 text-slate-500" />
              </p>
              <div className="mt-2 grid gap-2">
                <a
                  className="inline-flex items-center justify-between rounded-xl bg-white border border-slate-200 px-3 py-2 hover:bg-slate-50"
                  href="https://openclaw.ai/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="font-medium">OpenClaw 官方站点</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}