---
title: Jinja2模板与变量的用法
published: 2026-02-23
description: "关于本博客构建时一些关于Jinja2的新收获"
image: "assets/image.png"
tags: ["Pblog", "Jinja2", "Python"]
category: Note
draft: false
---

> [!NOTE]
>
> Image by <a href="https://pixabay.com/users/qiaominxu_橋茗旭-18717949/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=8581177">qiaominxu 橋茗旭</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=8581177">Pixabay</a>

## 写在前面

2026年了，我总会去细细端详自己的作品，这不，今天逛自己博客的时候，发现这个版权年份没有更新，就是下面那行字还停留在2025年，如果我没改的话，我今年还有版权吗？

鉴于之前的代码基本上是AI完成的，我直接把要改的东西扔给AI，叫他给我建议，我自己改代码。

当然，喜欢简单的可以一次性将字符串硬编码在文件里面。

## 更改点

在类的初始化函数中添加生成版权字符串的代码：

```python
# 初始化Jinja2环境
self.env = Environment(loader=FileSystemLoader(self.templates_dir))
# 计算动态版权年份
start_year = 2025
current_year = datetime.now().year
if current_year > start_year:
year_str = f"{start_year}-{current_year}"
else:
year_str = str(start_year)
self.copyright_text = (
f"&copy; {year_str} Pblog. Build by Python + Jinja2 + Markdown."
)
```

`self.copyright_text` 将会在之后用到。

---

然后是在`index.html`模板中添加jinja2变量：

```html
<footer>
  <p>{{copyright_text}}</p>
</footer>
```

`{{copyright_text}}`属于Jinja2语法，将会在渲染时被替换为传入的值。

---

然后在需要的页面上传入变量：

```python
def generate_index_page(self):
    """生成新的首页"""
    template = self.env.get_template('index.html')  # 获取模板
    output_path = os.path.join(self.output_dir, 'index.html')  #
    # 传入变量
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(template.render(base_url='', copyright_text=self.copyright_text))
    print("已生成新的首页")

```

> [!NOTE]
> `self.copyright_text`可以的值是任意字符串，变量名也不一定非要这个，可以取自己喜欢的。
> `render`函数的参数名要与模板中的变量名一致。

---

好了，基本上就是这样了，如果还有什么问题，欢迎在评论区提出。
