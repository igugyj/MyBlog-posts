---
title: 在Windows任务栏上显示歌词
published: 2026-06-11
description: "利用TrafficMonitor插件 + LX Music API在Windows任务栏上实时显示歌词"
image: "assets/image.png"
tags: ["Windows", "TrafficMonitor", "LX_Music", "Web", "Net", "Cpp", "NCM"]
category: Note
draft: false
---

### 前言

`betterlyrics`很好，但是我不太喜欢它的哲学设计，美学是值得肯定的，不过太过华丽，我就不用了，但是我依然推荐，它的功能十分强大，任务栏的话，在我的系统（win 10）上似乎不那么好用。

那么，有什么软件可以在任务栏上显示内容的？答案是`TrafficMonitor`，我用了快两年了，甚至能看到我去年用了3TB的数据，这没什么的，不及一些大佬的零头，扯远了。

我（用AI）开发了这个插件：

[![igugyj/TrafficMonitorLyricPlugin - GitHub](https://gh-card.dev/repos/igugyj/TrafficMonitorLyricPlugin.svg?fullname=)](https://github.com/igugyj/TrafficMonitorLyricPlugin)

目前问题比较多，但我是将就用，哪天有精力和技术了再来打磨。

---

### 原理

参考：[LX Music 开放 API 服务](https://lxmusic.toside.cn/desktop/open-api)，插件后端用C++来调用LX的API，效果不错：

![alt text](assets/PixPin_2026-06-11_16-03-39.gif)

总体起到一个情绪价值的作用。

---

### 想法

其实也不是突然想到开发一个这样的插件，主要是在GitHub上关注了一个朋友，看到他开发了一个TrafficMonitor的插件：

[![Jursin/TrafficMonitorPlugin_AIBalance - GitHub](https://gh-card.dev/repos/Jursin/TrafficMonitorPlugin_AIBalance.svg?fullname=)](https://github.com/Jursin/TrafficMonitorPlugin_AIBalance)

我就想啊：他能做到，为何我不能做一个？于是就A出来了一个简陋的插件。

---

### 关于其他音乐软件

只适配LX是不够的，我在设计伊始就是优先设计的核心，本来是想用SMTC来做的，但发现这个功能似乎不支持歌词，只是简单的元数据：歌曲名、软件名、歌手。似乎有时间戳，但是具体原理我没深入，终究是做不到啊！

或许可以加功能，使其支持SMTC，用于控制曲目的播放。

NCM我也是才发现有个插件社区，具体的不透露，可以自己查查。

我也交了个PR给他们，但是[我做的插件](https://github.com/igugyj/ncmapi)似乎不太好，颜色不太对，就闭源了，如果有人收藏了我就发个release吧，反正也不会来人吧。倒是review源，我正在申请，~~不过作者可能忘了GitHub账号密码……（怎么可能忘）~~

---

![alt text](assets/image-1.png)

我的开发能力大部分是社区养出来的啊（& AI）
