---
title: 为博客接入umami服务
published: 2026-10-21
description: "字数徽章好做，浏览量难求——从被浏览器拦截到自建 Worker 代理的接入实录"
tags: ["Umami", "Cloudflare", "Worker", "Pblog"]
category: Blog
draft: false
---

> 2026-10-21 的一次完整接入记录，按时间顺序流水，想到哪记到哪。

## 1. 起因

- 想给文章详情页加一行徽章：字数 / 阅读时间 / 浏览量，只有图标和数字，含义走 `title` / aria-label 的多语言文案
- 字数和阅读时间构建期算：剥掉代码块和公式，中文逐字、英文按词，`units = cjk + 词数×2`，`minutes = max(1, round(units/400))`，页面直接带出来
- 浏览量只能运行时查 → 选 Umami 免费云版，凭据用分享链接（只读）
- 顺手把页脚也加上全站总浏览量，跟 `Built at ... UTC` 同一行

## 2. 直连探测（Node）

- 拿 Share ID 换 token：成功
- 查 `/websites/{id}/stats?startAt=0&endAt=now`：200，`ACAO: *`
- 当时的结论：稳了，开始写组件

## 3. 浏览器里是 0

- 徽章组件写完（加载中 / 失败 / 未配置一律隐藏，不拿 0 占位），结果浏览量那段直接不出现
- F12 看 Network：`cloud.umami.is`、`gateway.umami.is` 全是「拦截中」
- 元凶：Firefox 增强型跟踪保护，跟 CORS 无关。命令行能通 ≠ 浏览器能通
- 推论：广告拦截用户同样会中招，直连官方域名这条路对部分访客永远不通

## 4. 上 Worker 中转

- 写 `scripts/umami/worker.js`，两个职责：
  - `GET /?path=...` → 查询代理，返回 `{"views": n}`；不带 path 就是全站总量
  - `POST /api/send` → 上报原样转发到 `gateway.umami.is`，浏览器只看到向自己 worker 域名发请求
- Cloudflare Dashboard 粘贴部署，没用 wrangler
- `.env` 加 `NEXT_PUBLIC_UMAMI_PROXY_URL`，`app/layout.tsx` 的 `data-host-url` 指过去；改 env 要重启 dev

## 5. 查询一直是 0 的排查

- 路径过滤：官方是 PostgREST 的 `eq.` 写法，且 Umami 记录的路径**带尾斜杠**
- 实测对比：`eq./posts/xxx/` → 5 条，`eq./posts/xxx` → 0 条，差一个字符
- `pageviews` 返回形态不统一：有时是数字，有时是 `{"value": n}`，两种都得认
- 又踩了自己的边缘缓存：查询结果 `max-age=180`，新数据进来后看到的还是旧值，白排查一轮；想立即看，URL 加个随机参数换缓存键即可

## 6. 上报侧验证

- F12 过滤 `send`：指向 `https://xxx.workers.dev/api/send`，200，不再是「拦截中」
- 查询实测：全站 10 views / 1 visitor，目标文章 5 views，首页 2 views —— 数据链路通了
- Umami 后台 Realtime 能看到访客

## 7. 安全加固

- 原本 `Access-Control-Allow-Origin: *` 等于谁都能来查你的统计，改成：
  - Origin 白名单：来自 `ALLOWED_ORIGINS` 环境变量，按请求来源回显，名单外不给跨域头；缓存 key 按 Origin 隔离，避免串号
  - 上报 Origin 校验：非法 Origin → 403；无 Origin（curl）放行，靠 `payload.website` 必须匹配本站兜底
- 真实 ID 从源码里全部撤出（原来硬编码在文件里，等于钥匙留门上）：
  - `WEBSITE_ID` / `SHARE_ID` / `ALLOWED_ORIGINS` 三项必填，缺任一项真实请求 503 并点名缺什么，校验排在缓存之前
- localhost 示例模式：本地来源只回 `{"views":128,"demo":true}`，上报应答后丢弃，不查不上报，开发不污染统计

## 8. 收尾

- 冒烟测试 22 项全过，含「源码不含真实 ID / 域名」断言
- 文档同步：部署教程新增第七部分《浏览统计》、p2 加配置节、p6 加排查 FAQ、AI 文档 changelog / index 更新
- 入口：[第七部分：浏览统计](/docs/deployment/p7/)

## 遗留

- 徽章数字最多滞后 3 分钟（边缘缓存），暂不打算调
- 本地 dev 永远显示 128，是示例模式，不是 bug
- Cloudflare Web Analytics 的 `static.cloudflareinsights.com` 也被拦，与本篇无关，先放着
