# 飞书云文档解析器

将飞书云文档（docx）解析为 HTML 的独立可复用模块。可直接复制 `feishu-parser` 文件夹到其他项目使用。

## 功能

- 获取飞书文档元信息（标题、版本号）
- 将文档块（blocks）解析为 HTML
- 支持标题、段落、引用、代码块、图片等
- URL 自动转可点击链接（排除代码块内）
- 图片获取临时下载链接

## 使用方式

### 1. 在本项目中

```ts
import { createFeishuParser, linkifyUrls } from "@/lib/feishu-parser";

const parser = createFeishuParser({
  appId: process.env.FEISHU_APP_ID!,
  appSecret: process.env.FEISHU_APP_SECRET!,
});

// 一站式：文档 ID → HTML
const { title, html, revisionId } = await parser.docToHtml("Vm8VdbTMxo78U6xtistc8uUAnTf");

// 或分步调用
const doc = await parser.getDocument(documentId);
const blocks = await parser.getBlocks(documentId);
const html = await parser.blocksToHtml(documentId, blocks);

// 单独使用 linkify（处理已有 HTML）
const linked = linkifyUrls(rawHtml);
```

### 2. 复制到其他项目

1. 复制整个 `feishu-parser` 文件夹
2. 配置 appId、appSecret（飞书开放平台创建应用后获取）
3. 确保应用有云文档读取权限
4. 文档需分享给应用或应用有权限访问

### 3. 环境变量

```
FEISHU_APP_ID=your_app_id
FEISHU_APP_SECRET=your_app_secret
```

## 文档 ID 获取

飞书文档链接格式：`https://xxx.feishu.cn/docx/{documentId}`

例如：`https://my.feishu.cn/docx/Vm8VdbTMxo78U6xtistc8uUAnTf`  
文档 ID 为：`Vm8VdbTMxo78U6xtistc8uUAnTf`

## 输出 HTML 的 CSS 类名

- `.doc-heading` - 标题
- `.doc-quote` - 引用块
- `.doc-spacer` - 空行
- `.doc-link` - 链接
- `.doc-image-wrap` / `.doc-image` - 图片

## 依赖

无外部依赖，仅使用原生 `fetch`。
