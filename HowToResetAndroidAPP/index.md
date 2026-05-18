---
title: 如何重置一个安卓APP
published: 2026-05-13
description: "【小剧场】清缓存不就得了"
image: "assets/image.png"
tags: ["Android"]
category: Daily
draft: false
---

> [!NOTE]
> Image by <a href="https://pixabay.com/users/felix-mittermeier-4397258/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3625405">Felix Mittermeier</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3625405">Pixabay</a>

<style>
/* ========== 聊天消息容器 ========== */
.cq-chat {
  max-width: 80%;
  margin: 0 auto;
  padding: 16px 12px;
  background-color: #f5f5f5;       /* 浅灰聊天背景 */
  border-radius: 24px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

/* 单条消息行 */
.cq-msg-row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
}

/* 对方消息：头像在左，气泡在右 */
.cq-msg-row--other {
  flex-direction: row;
}

/* 自己消息：头像在右，气泡在左 */
.cq-msg-row--self {
  flex-direction: row-reverse;
}

/* ========== 头像 ========== */
.cq-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;            /* 圆形裁剪，透明贴图不规则形状可保留 */
  background-color: #d9d9d9;    /* 占位底色，用图片后可透明 */
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
  /* 如果希望头像形状不规则，可用透明png，然后去掉 border-radius 或改为 30% 等 */
}

/* ========== 气泡 ========== */
.cq-bubble {
  max-width: 65%;
  padding: 10px 14px;
  font-size: 15px;
  line-height: 1.5;
  word-break: break-word;
  border-radius: 18px;
  background-color: #ffffff;   /* 默认对方浅灰白气泡 */
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}

/* 对方气泡靠左，加了头像间距 */
.cq-msg-row--other .cq-bubble {
  margin-left: 10px;
  background-color: #ededed;   /* 对方气泡浅灰 */
}

/* 自己气泡靠右，颜色稍深以区分 */
.cq-msg-row--self .cq-bubble {
  margin-right: 10px;
  background-color: #d5d5d5;   /* 自己气泡中灰 */
  text-align: left;
}
</style>

<div class="cq-chat">

  <!-- 对方消息（头像左，气泡右） -->
  <div class="cq-msg-row cq-msg-row--other">
    <div class="cq-avatar" style="background-image: url('/posts/HowToResetAndroidAPP/assets/O.png');"></div>
    <div class="cq-bubble">
      彩叶彩叶，最近我遇到一个流氓软件，它没有退出登录的按钮，我拿它没办法，求求你帮帮我！</div>
  </div>
    <div class="cq-msg-row cq-msg-row--other">
    <div class="cq-avatar" style="background-image: url('/posts/HowToResetAndroidAPP/assets/O.png');"></div>
    <div class="cq-bubble">

![alt text](assets/help.png)

</div>
  </div>

  <!-- 自己消息（头像右，气泡左） -->
  <div class="cq-msg-row cq-msg-row--self">
    <div class="cq-avatar" style="background-image: url('/posts/HowToResetAndroidAPP/assets/len.png');"></div>
    <div class="cq-bubble">
      其实很简单的</div>
  </div>

  <!-- 继续复制上面的行来增加对话 -->
  <div class="cq-msg-row cq-msg-row--other">
    <div class="cq-avatar" style="background-image: url('/posts/HowToResetAndroidAPP/assets/O.png');"></div>
    <div class="cq-bubble">

![alt text](assets/e.gif)

</div>
  </div>

<div class="cq-msg-row cq-msg-row--other">
    <div class="cq-avatar" style="background-image: url('/posts/HowToResetAndroidAPP/assets/O.png');"></div>
    <div class="cq-bubble">
你别卖关子嘛~</div></div>
  <div class="cq-msg-row cq-msg-row--self">
    <div class="cq-avatar" style="background-image: url('/posts/HowToResetAndroidAPP/assets/len.png');"></div>
    <div class="cq-bubble">
      首先，打开应用管理，找到这个软件</div></div>
    <div class="cq-msg-row cq-msg-row--self">
    <div class="cq-avatar" style="background-image: url('/posts/HowToResetAndroidAPP/assets/len.png');"></div>
    <div class="cq-bubble">

![alt text](assets/1000203460.jpg)

</div>
  </div>
<div class="cq-msg-row cq-msg-row--self">
    <div class="cq-avatar" style="background-image: url('/posts/HowToResetAndroidAPP/assets/len.png');"></div>
    <div class="cq-bubble">然后点击「Clear Data」，注意我这里是已经点了的</div></div>
<div class="cq-msg-row cq-msg-row--self">
    <div class="cq-avatar" style="background-image: url('/posts/HowToResetAndroidAPP/assets/len.png');"></div>
    <div class="cq-bubble">

![alt text](assets/1000203461.jpg)

</div>
  </div>
  <div class="cq-msg-row cq-msg-row--other">
    <div class="cq-avatar" style="background-image: url('/posts/HowToResetAndroidAPP/assets/O.png');"></div>
    <div class="cq-bubble">
哇，真的有效果欸，彩叶好厉害！！！</div></div>
<div class="cq-msg-row cq-msg-row--other">
    <div class="cq-avatar" style="background-image: url('/posts/HowToResetAndroidAPP/assets/O.png');"></div>
    <div class="cq-bubble">

![alt text](assets/1000203462.jpg)</div></div>

<div class="cq-msg-row cq-msg-row--other">
    <div class="cq-avatar" style="background-image: url('/posts/HowToResetAndroidAPP/assets/O.png');"></div>
    <div class="cq-bubble">没想到这么简单，我感觉自己强得可怕</div></div>
<div class="cq-msg-row cq-msg-row--other">
    <div class="cq-avatar" style="background-image: url('/posts/HowToResetAndroidAPP/assets/O.png');"></div>
    <div class="cq-bubble">

![alt text](assets/y.gif)

</div></div>
<div class="cq-msg-row cq-msg-row--self">
    <div class="cq-avatar" style="background-image: url('/posts/HowToResetAndroidAPP/assets/len.png');"></div>
    <div class="cq-bubble">但愿你是真的会了</div></div>

<div class="cq-msg-row cq-msg-row--self">
    <div class="cq-avatar" style="background-image: url('/posts/HowToResetAndroidAPP/assets/len.png');"></div>
    <div class="cq-bubble">

![alt text](assets/w.gif)

</div>
  </div>

</div>
