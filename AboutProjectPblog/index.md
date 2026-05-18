---
title: 关于静态网站项目Pblog
published: 2025-11-23
description: "Pblog的一些说明"
image: "assets/f4bbcedd396b8bb0399c05a2e0e5e11f907694c5a15de77522ee1c4eb154bb73.png"
tags: ["Pblog","Python","AI","Markdown","fuwari","html"]
category: Note
draft: false
player:
  source: "local"
  link: "assets/Starting.mp3"
  bottom: "40px"
  left: "40px"
  autoPlay: false
---

>[!NOTE]
>
>封面由AI生成
>
> Music:
> 音乐：Starting – LiQWYD & Waesto (No Copyright Music)
> 厂牌：Audio Library
> 地址：<https://www.youtube.com/watch?v=ZimcxDkcFnM>

**省流**：

+ 基于Python，HTML, CSS, JavaScript从0构建
+ 抄了Fuwari，大部分兼容Fuwari文章目录和内容结构
+ 功能不完善
+ 不想开源
+ 该打原神了

---

## 关于Pblog

Pblog是一个基于Python的静态网站生成器，可以快速生成一个漂亮的个人博客网站。

## 功能特性

它不依赖常规的一些博客框架（Hugo, Jekyll, Gatsby, Next.js），而是使用Python的Jinja2来构建，没有任何模板，一切基于自己的想法和能力。

当然，在这个时代，编写代码也不是一件难事，只需要如下的步骤即可：

```python
import DeepSeek
var=input("ideas:")
output=DeepSeek.chat(var)
save(output)
build()
```

基于以下的表格，Pblog的构建还是需要一定的门槛的，不仅要会Python（Jinja2要略懂，我就不太懂，都是DeepSeek.chat()），知道这种构建方法的原理过程；还要会前端三剑客（HTML, CSS, JavaScript），懂一些基本的代码，做一些小小的修改；以及Markdown语法（用于写文章），这个不用多说，和用杯子喝水一个道理。

### 与主流静态站点生成器的对比

| 特性           | 你的自定义 Jinja2 方案                                   | 主流静态生成器 (如 Hugo, Jekyll)                 |
| :------------- | :------------------------------------------------------- | :----------------------------------------------- |
| **模板引擎**   | Jinja2 (Python 系)                                       | Hugo: Go Templates, Jekyll: Liquid (Ruby 系)     |
| **灵活性**     | **极高**，所有逻辑自己控制，可以轻松添加任何自定义功能。 | **中等**，受限于生成器本身的设计和插件生态。     |
| **学习成本**   | 需要懂 Python 和 Jinja2。                                | 需要学习特定生成器的目录结构、配置和模板语法。   |
| **开发效率**   | **初期较低**，需要自己搭建框架。                         | **初期很高**，开箱即用，有大量主题和插件。       |
| **维护成本**   | **自己负责所有代码**，功能增减都需开发。                 | **由社区和开发者维护**，只需关注内容和配置更新。 |
| **社区和生态** | 依赖 Python 和 Jinja2 的生态，博客主题较少。             | **庞大的社区**，海量主题、插件和教程。           |
| **适用场景**   | 追求极致定制、有特定复杂需求、学习目的。                 | 快速搭建标准博客、文档站，不想写太多代码。       |

### 思路

和一般的模板差不多（实际上是参考了一些看到过/使用过的模板）。

例如主页和about页面，参考了saicaca/Fuwari；归档页的灵感来自Fuwari（中间布局）和CSDN（年度统计）；base页面（大概是所有的页面），这个“回到顶部”按钮参考了Bilibili；标签分类用了词云，效果还不错。目前整个网站没有评论系统，如果架设在GitHub加个评论系统还是非常轻松的。

既然说到参考了Fuwari博客系统，我的过往文章基本上是用Fuwari的标准的，所以要兼容我以前的文章，如这个文件头：

```yaml
---
title: 关于静态网站项目Pblog
published: 2025-11-23
description: "Pblog的一些说明"
image: ""
tags: ["Pblog","Python","AI","Markdown","fuwari"]
category: Note
draft: false
---
```

<!-- 当然，GitHub的一些markdown标准我不是很有时间和能力去实现，可以直接用html来写：
<div style="border-left:4px solid #0969da;background:#ddf4ff;padding:8px 12px;margin:8px 0"><div style="color:#0969da;font-weight:bold">NOTE</div><div>一般信息示例</div></div>

<div style="border-left:4px solid #1a7f37;background:#dafbe1;padding:8px 12px;margin:8px 0"><div style="color:#1a7f37;font-weight:bold">TIP</div><div>提示信息示例</div></div>

<div style="border-left:4px solid #8250df;background:#fbefff;padding:8px 12px;margin:8px 0"><div style="color:#8250df;font-weight:bold">IMPORTANT</div><div>重要信息示例</div></div>

<div style="border-left:4px solid #9a6700;background:#fff8c5;padding:8px 12px;margin:8px 0"><div style="color:#9a6700;font-weight:bold">WARNING</div><div>警告信息示例</div></div>

<div style="border-left:4px solid #cf222e;background:#ffebe9;padding:8px 12px;margin:8px 0"><div style="color:#cf222e;font-weight:bold">CAUTION</div><div>危险警告示例</div></div>

```html
<div style="border-left:4px solid #0969da;background:#ddf4ff;padding:8px 12px;margin:8px 0"><div style="color:#0969da;font-weight:bold">NOTE</div><div>一般信息示例</div></div>

<div style="border-left:4px solid #1a7f37;background:#dafbe1;padding:8px 12px;margin:8px 0"><div style="color:#1a7f37;font-weight:bold">TIP</div><div>提示信息示例</div></div>

<div style="border-left:4px solid #8250df;background:#fbefff;padding:8px 12px;margin:8px 0"><div style="color:#8250df;font-weight:bold">IMPORTANT</div><div>重要信息示例</div></div>

<div style="border-left:4px solid #9a6700;background:#fff8c5;padding:8px 12px;margin:8px 0"><div style="color:#9a6700;font-weight:bold">WARNING</div><div>警告信息示例</div></div>

<div style="border-left:4px solid #cf222e;background:#ffebe9;padding:8px 12px;margin:8px 0"><div style="color:#cf222e;font-weight:bold">CAUTION</div><div>危险警告示例</div></div>

``` -->

基本的大概就这样了。

## 未来计划

如果GitHub对中国区的限制降低，我那被标记的账户就可以恢复，然后就可以用Cloudflare或者Netlify的自动部署，而不是像现在这样拖动文件。至于为什么不重新申请一个，没有必要，如果又给我标记了呢。或者哪天认证成功了就可以了。

这个项目目前（2025-11-23）是闭源的，有开源的想法，但是如果能卖掉的话最好。现实一点，我这个学生真的没什么大追求。

开源的话要自己写一大堆文档，包括安装、配置、使用、开发、部署等等，还要写一些教程，教会别人怎么用，所以——很麻烦，目前自己用用就可以了，开源的用Fuwari的话更好。

大肆宣传这一块儿，我只发了个空间。B站——不是很想发视频/图文，反正也没啥人看，剪视频也累。

消极这一块儿。

该打原神了。
