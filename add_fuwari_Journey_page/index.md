---
title: 为fuwari添加一个时间线Journey界面
published: 2025-08-03
description: "为fuwari添加一个时间线Journey界面"
image: "assets/image-1.png"
tags: ["Astro", "fuwari", "AI"]
category: Note
draft: false
---

> [!NOTE]
> Image by <a href="https://pixabay.com/users/andsproject-26081561/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=8435339">ANDRI TEGAR MAHARDIKA</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=8435339">Pixabay</a>

详细更改：参见——[Commit 003123f
](https://github.com/Pfolg/fuwari/commit/003123f42fedaf0ea847c464500a18c08ed472e7#diff-a353ba9ddbb64fa9d79f963992a557ea165b687ad4161459954297ce5796bcdf)

预览：
![](assets/image.png)

或者go: [Journey](../../journey/)

主要思路是：更改博客基本设置，添加一个链接标题，再在`src/pages/journey.astro`中修改样式、函数等实现读取`src/content/spec/journey/index.md`中的内容，最后渲染成页面。不涉及组件的安装，代码编写由AI完成。时间线模板可参考`src/content/spec/journey/index.md`中的内容。
