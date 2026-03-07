/**
 * Web3 加密实战 - 各平台飞书云文档配置
 * 文档 ID 从飞书链接提取，如：https://my.feishu.cn/docx/Vm8VdbTMxo78U6xtistc8uUAnTf
 */
export const cryptoConfig = {
  okx: {
    name: "欧易 (OKX) 链上交互",
    docIds: ["Vm8VdbTMxo78U6xtistc8uUAnTf"],
  },
  binance: {
    name: "币安 (Binance) 自动化",
    docIds: [] as string[],
  },
} as const;

export type CryptoPlatform = keyof typeof cryptoConfig;
