---
title: 2026-02-17 随笔
published: 2026-02-17
description: "关于新年的思考和过去一年的片面总结"
image: "assets/31D7BD422CB61FEDF80020F7D849389B.jpg"
tags: []
category: Daily
draft: false
player:
  source: "netease"
  link: "461074907"
  bottom: "40px"
  left: "40px"
  autoPlay: false
---

<!-- 引入外部烟花脚本 -->
<script src="assets/fireworks.js"></script>

## 2025

依旧是在大学里面消磨时光，浪费着家里面的钱，供养着这魔幻的世界。

如是，浪费着青春，投资着不知所谓的未来。

不论何时都作为分母的平凡人，不必指望他未来有太大的成就。

暑假急速考了个驾照，然而没什么用，大抵只是多了一个可以证明我身份的东西。

CET和NCRE基本标准在去年已通过，今年没参加任何考试。

学校老师手下留情了，没有挂科。

混了个实习证明，一纸空文罢。

将主流社交软件账户NPC化。

其他便没什么了罢。

我在Gitee社区收获了两颗星，GitHub零。

## 2026

本来是想随大流，在QQ空间或朋友圈发个自己风格的“新年快乐”。像下面这样：

```cpp
#include <Year>
...
int main() {
    delete 2025;
    2025=nullptr;
    Year 2026;
    2026.newYear();
    2026.happyNewYear();
    return 0;
}
```

然后再配个`我管你看不看得懂`的文案。思来想去，觉得不妥，于是不发了。

那就算了罢。

---

我会觉得2026比去年更晦暗，我的年轻也一文不值。也不想去拼，我一直都没那么幸运，幸运到有个知己能理解我。渐渐偏执也挺好。

<!--我有个支持我的家庭，这很幸运，但也是不幸的。-->

不囿于过往，不追求未来。

要说梦想啊，我也是想赚很多很多钱，但自己又懒惰，能力又低微，或许可以去缅北，它们的门道似乎不错。我大抵是疯了罢。

若说有个与世隔绝的地方啊，那最好是监狱了。

对了，寄人篱下的感觉与“嗟，来食！”大差不差了。

还是那句话，倘若我没读那么多书，一辈子在蒙昧中度过，倒也不错；如果了读了足够多的书，我是不是会更有话语权了？

![](assets/fool.jpg)

---

好了，就这样罢，祝你新年快乐。<button id="playBtn" style="font-size: 1.2rem; padding: 0.5rem 1.5rem; background: #ff4757; color: white; border: none; border-radius: 30px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">播放祝福</button>

<!-- 绑定按钮点击事件（直接调用全局函数） -->
<script>
    document.getElementById('playBtn')?.addEventListener('click', function() {
        if (typeof window.playFireworks === 'function') {
            window.playFireworks();
        } else {
            console.warn('Fireworks script load failed.');
        }
    });
</script>
