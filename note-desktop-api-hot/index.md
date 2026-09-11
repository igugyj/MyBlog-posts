---
title: 急速实现一个桌面API热搜程序
published: 2026-03-27
description: "我花了不到2小时用AI写了一个桌面热搜程序"
image: "assets/image-1.png"
tags: ["GitHub", "Python", "Qt", "Windows", "cmd"]
category: Note
draft: false
---

> [!NOTE]
> Image by <a href="https://pixabay.com/users/dg-ra-4854875/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6669461">Rafael Javier</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6669461">Pixabay</a>

## 前言

每次群友在群里发消息，我都反应不过来：“这些东西是什么？”

从黑客事件到时事热点，再到各种八卦新闻，第一眼看到时总是一脸懵——完全不知道前因后果。
比如昨天还在讨论的罗技事件，我直到今天才搞清楚来龙去脉。等我弄明白了，央视的公众号也开始推送了。

这让我深刻意识到，自己信息太闭塞了，而且时效性也完全跟不上。

于是我问了问 DeepSeek，有没有什么工具能帮我解决这个问题。
它推荐了三个工具，我看了一下：
第一个和第三个是同一个作者，第一个已经停更了；第三个需要注册登录，还有月卡会员。
我果断放弃——怕注册完用起来也不顺手，也不想折腾这么功能繁杂的软件。

第二个工具我用过，体验一般。窗口太多，自定义程度低，我也不会改它那个框架的代码。

| 工具名称                   | 核心特点                                                           | 轻量与开源情况             | 获取方式                                                                        |
| :------------------------- | :----------------------------------------------------------------- | :------------------------- | :------------------------------------------------------------------------------ |
| **七仔的桌面工具**         | 功能最全面，集成热搜、AI对话、音乐播放、文件搜索等众多模块         | 约30MB的单文件便携版，开源 | GitHub: [baby7/baby7-desktop-tool](https://github.com/baby7/baby7-desktop-tool) |
| **Widgets桌面组件**        | 高度自定义，支持拖拽布局和开发者模式，包含热搜、天气、倒计时等组件 | 基于Vue3构建，开源         | GitHub可下载源码                                                                |
| **灵卡面板 (Agile Tiles)** | 简洁实用，定位为侧边栏工具集，包含热搜、翻译、系统监控等卡片       | 开源                       | GitHub: [baby7/agile-tiles](https://github.com/baby7/agile-tiles)               |

---

既然没有现成的工具能完美满足需求，我就想：能不能自己弄一个，一个窗口就能看多个热搜榜？
我想应该是有的，但 AI 搜不到。
于是，我决定自己写一个——毕竟我还会一点点代码。

我让 AI 帮我找找有没有那种聚合 API 的项目，然后把提示词写好，发给了 Claude。
一天的机会一次性用完了，但结果还不错，代码能直接跑。
中间有点小瑕疵，我让 AI 帮我改掉了。其实自己也能改，就是懒——估计以后连代码都懒得写了。

---

## 实现过程

兜兜转转，我找到了这个仓库：<https://github.com/kuole-o/dailyhot-api>
文档写得详细，功能也符合我的需求。试了一下调用过程，体验不错。

接着我开始写提示词。
具体内容我放在了 DailyAPI 仓库的 `docs/ai` 目录下。提示词写得不算完美，Claude 输出的代码也带了些小问题，但整体上，它确实把我想要的东西实现了。

不过，我不能一直开着两个黑窗口来跑项目。
于是我又问 AI 怎么把它们关掉。折腾了半天，AI 告诉我用 PowerShell 能直接搞定——也就是现在项目里那个启动脚本。

考虑到把项目放上 GitHub，万一有人用（虽然可能没人），我还是写了个配置脚本。
当然，也是让 AI 代劳的。这里 AI 那里 AI 的，感觉自己都像“AI 预制人”了。

---

## 结果

![alt text](assets/image.png)

---

## 项目地址

这是我的仓库链接：
<https://github.com/igugyj/DailyAPI>
