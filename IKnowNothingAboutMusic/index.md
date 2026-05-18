---
title: 我对音乐一无所知
published: 2026-04-04
description: "尝试用 Python 来演奏音乐，但是现实是非常沉重的"
image: "assets/image.png"
tags: ["Music", "Python", "Musicpy"]
category: Python
draft: false
---

## 前言

在 B 站上看到有人使用 C++ 调用 Windows 底层音频接口，成功演奏出《勾指起誓》，令我大为震撼。我觉得这种实现方式非常有意思，于是也想尝试一下，用 Python 来实现音乐播放。

[用 visual studio 2022 演奏《勾指起誓》，效果简直炸裂……](https://www.bilibili.com/video/BV1w29KB9E1r)

起初我向 AI 询问是否有可用的第三方库，对方推荐了 musicpy。我随即访问了该库的 GitHub 页面，并简单浏览了其 Wiki，但并未深入学习。

## 过程

下载 musicpy 库后，我又安装了 Pygame 作为音频驱动。经过简单的尝试，程序运行效果尚可，这激发了我进一步探索的兴趣。

```python
import musicpy as mp

sound = (mp.C('CM7', 3, 1 / 4, 1 / 8) ^ 2 |
         mp.C('G7sus', 2, 1 / 4, 1 / 8) ^ 2 |
         mp.C('A7sus', 2, 1 / 4, 1 / 8) ^ 2 |
         mp.C('Em7', 2, 1 / 4, 1 / 8) ^ 2 |
         mp.C('FM7', 2, 1 / 4, 1 / 8) ^ 2 |
         mp.C('CM7', 3, 1 / 4, 1 / 8) @ 1 |
         mp.C('AbM7', 2, 1 / 4, 1 / 8) ^ 2 |
         mp.C('G7sus', 2, 1 / 4, 1 / 8) ^ 2) * 2

mp.play(sound, bpm=100, instrument=1, save_as_file=False, wait=True)
```

随后我选择了一首喜欢的曲子《银河与星斗》，并在网上找到了对应的独奏乐谱。然而问题随之而来：我既看不懂乐谱，也不知道如何将其转换为 musicpy 库所需的代码。毕竟该库的使用需要一定的乐理基础，而我的乐理知识几乎为零。

于是我同时借助豆包和 DeepSeek 进行尝试：豆包负责将乐谱识别为 Markdown 格式，DeepSeek 则在预先学习了下载好的 Wiki 文档后，指导我完成代码编写。经过约一两个小时的反复调试（期间遇到大量报错，不断修正关键词），终于勉强得到了《银河与星斗》的演奏效果。但最终成果并不理想，远不及 B 站上那位作者的呈现质量。原本打算录制视频作为纪念，但鉴于效果太差，最终作罢。

今天本是为了修复博客网站项目中的一些缺陷，顺便将这段经历记录下来，于是有了这篇文章。

## 结果

我把《银河与星斗》和《团子大家族》的代码放在这儿吧。

<details>
<summary>《银河与星斗》</summary>

```python
import musicpy as mp

# 调号：1=bB -> Bb major
scale = mp.S('Bb major')


def expand_notes(num_str, base_dur=1 / 8):
    """将连写数字串（如 "21", "331", "1'7"）拆分为多个音符，时值平分 base_dur"""
    # 先分离数字和八度标记
    tokens = []
    i = 0
    while i < len(num_str):
        ch = num_str[i]
        if ch.isdigit():
            start = i
            while i < len(num_str) and num_str[i].isdigit():
                i += 1
            num = num_str[start:i]
            # 检查后面是否有八度标记
            oct_shift = 0
            if i < len(num_str) and num_str[i] in ("'", '.'):
                if num_str[i] == "'":
                    oct_shift = 1
                else:
                    oct_shift = -1
                i += 1
            tokens.append((num, oct_shift))
        else:
            # 忽略其他字符（如波浪线 ~）
            i += 1
    # 每个音符时长相等
    dur = base_dur / len(tokens)
    result = []
    for num, oct_shift in tokens:
        # 如果 num 长度 >1，还需要进一步拆分（如 "21" 拆成 "2","1"）
        if len(num) > 1:
            for ch in num:
                result.append((ch, dur, oct_shift))
        else:
            result.append((num, dur, oct_shift))
    return result


# 构建整个旋律（空和弦）
full = mp.chord([])

# 小节序列（保持原样，已展开反复）
bars = [
    # 前奏（第一行）
    ["0.", "1", "|", "1'", "7", "5", "3", "5", "5.", "1", "|", "2", "1", "2", "3", "3.", "1", "|", "1'", "7", "5", "3",
     "5", "5", "21", "|", "2", "3", "7.", "12", "1", "-"],
    # 括号内
    ["1'", "7", "5", "3", "5", "5", "|", "2", "1", "2", "3", "3.", "3", "|", "2", "1", "1", "3", "2", "1", "1", "|",
     "2", "2", "2", "1", "1"],
    # 主歌反复段（展开一次）
    ["0", "63", "3", "21", "2123", "3.", "1", "|", "2", "21", "2", "21", "4", "3", "2", "3", "|", "0", "63", "3", "35",
     "533", "3", "21", "|", "2", "23", "211", "1"],
    ["0", "63", "3", "21", "21~3", "3.", "1", "|", "2", "21", "2", "21", "4", "3~2", "2", "3", "|", "5", "1", "5", "1",
     "6", "53", "3", "21", "|", "2123", "2171", "1", "6.", "1"],
    ["5", "55", "5", "1'", "7", "55", "5", "21", "|", "2", "22", "3", "4", "3", "6.", "1", "|", "5", "55~", "5", "1'7",
     "5", "5", "21", "|", "2", "23", "217~", "1.", "D.S", "1"],
    # 副歌（晚风依旧很温柔）
    ["1'", "7", "5", "3", "5", "5.", "1", "|", "2", "1", "23~", "3.", "1", "|", "1'", "7", "5", "3", "5", "5", "21",
     "|", "2", "3", "7", "2", "1.", "1"],
    # 从来都没有理由
    ["1'", "7", "5", "3", "5", "5", "21", "|", "2", "1", "2", "6", "5.", "3", "|", "2116'", "1", "3", "2116'", "1", "|",
     "5'", "2", "1", "1"],
    # 括号内（结尾）
    ["1'", "7", "5", "3", "5", "5", "|", "2", "1", "2", "3", "3.", "3", "|", "2", "1", "6.", "3", "2", "1", "6.", "|",
     "2.", "1", "1"],
    # 结束句（D.S.后）
    ["5'", "2", "1", "1."]
]

for bar in bars:
    for token in bar:
        # 忽略分隔符和记号
        if token in ('|', '-', '~', 'D.S'):
            continue
        # 休止符
        if token == '0':
            full = full | mp.rest(1 / 4)
            continue
        if token == '0.':
            full = full | mp.rest(3 / 8)
            continue

        # 处理附点（注意：附点可能在数字后面，也可能在数字串末尾）
        dotted = False
        if token.endswith('.'):
            dotted = True
            token = token[:-1]

        # 处理高音和低音标记（高音 ' 或低音 . 但低音已处理？这里只处理高音）
        # 注意：低音点已经在 token 中被表示为 '.'，但我们已经把附点去掉了，剩下的 '.' 可能是低音？
        # 实际上在 bars 中，低音是用 "7." 表示的，但附点也是 '.'，容易混淆。
        # 为了解决歧义，约定：如果 token 结尾的 '.' 是附点，则已经在上面去掉了；如果还有 '.' 则是低音标记。
        # 但这里简谱中低音标记是数字右下角的点，在文本中用 "." 表示，且附点也在数字后，所以一个数字后可能同时有附点和低音？不会。
        # 简单处理：检查 token 中是否包含 '.'（除了末尾的附点）
        oct_shift = 0
        if "'" in token:
            oct_shift = 1
            token = token.replace("'", "")
        if '.' in token:  # 低音标记
            oct_shift = -1
            token = token.replace(".", "")

        # 现在 token 应该是纯数字串（可能多位）
        if not token.isdigit():
            # 如果还有非数字，跳过（如波浪线等已过滤）
            continue

        # 处理连写数字（多位数字串）
        # 每个数字对应一个音符，时值平分四分音符
        notes = expand_notes(token)  # 返回 (数字, 时长, 八度偏移) 列表
        for num, dur, oct_shift2 in notes:
            degree = int(num) - 1
            if degree < 0 or degree >= len(scale.notes):
                print(f"警告：数字 {num} 超出音阶范围，已跳过")
                continue
            base_note = scale.notes[degree]
            new_oct = base_note.num + oct_shift + oct_shift2
            note_name = f"{base_note.name}{new_oct}"
            actual_dur = dur * (1.5 if dotted else 1)
            single = mp.translate(f"{note_name}[l:{actual_dur}; i:{actual_dur}]")
            full = full | single if full.notes else single

# 播放
mp.play(full, bpm=81, wait=True, save_as_file=False, instrument=1)
```

</details>

<details>
<summary>《团子大家族》</summary>

```python
import musicpy as mp

# 调号：1=#G -> G# major
scale = mp.S('G# major')


# 辅助函数：将连写数字（如 "331"）拆分为多个音符，时值平分四分音符
def expand_notes(num_str, base_dur=1 / 4):
    """返回 (数字, 时长) 列表，每个时长 = base_dur / len(num_str)"""
    dur = base_dur / len(num_str)
    return [(ch, dur) for ch in num_str]


# 解析一个 token（如 "6̣5̣1"、"4·4"、"17̇711"）
def parse_token(token, default_dur=1 / 4):
    """返回音符列表，每个音符为 (数字, 时长, 是否附点, 八度偏移)"""
    # 先处理低音点（̣）和高音点（̇）
    # 由于这些是 Unicode 组合字符，直接替换为标记
    token = token.replace('̣', 'L')  # L 表示低音
    token = token.replace('̇', 'H')  # H 表示高音
    # 处理附点（·）
    dotted = False
    if '·' in token:
        dotted = True
        token = token.replace('·', '')
    # 分离数字和八度标记
    result = []
    i = 0
    while i < len(token):
        ch = token[i]
        if ch.isdigit():
            # 收集连续数字
            num_start = i
            while i < len(token) and token[i].isdigit():
                i += 1
            num_str = token[num_start:i]
            # 检查后面是否有八度标记
            oct_shift = 0
            if i < len(token) and token[i] in ('L', 'H'):
                if token[i] == 'L':
                    oct_shift = -1
                else:
                    oct_shift = 1
                i += 1
            # 如果数字串长度 >1，需要拆分为多个音符
            if len(num_str) > 1:
                notes = expand_notes(num_str, default_dur)
                for n, dur in notes:
                    result.append((n, dur, dotted, oct_shift))
            else:
                result.append((num_str, default_dur, dotted, oct_shift))
        else:
            # 忽略其他字符（如空格、括号等）
            i += 1
    return result


# 构建旋律（按演奏顺序，已手动展开反复和跳房子）
# 下面列出所有小节（每个小节是一个 token 列表，按谱面顺序）
bars_tokens = [
    # 前奏
    ["6̣5̣1", "1", "2", "2", "3", "1", "5", "6̣5̣1", "1", "2", "2", "331", "0",
     "6̣5̣1", "1", "2", "2", "3", "1", "5", "6̣5̣1", "1", "2", "1", "0", "0", "0",
     "6̣5̣1", "1", "2", "2", "3", "1", "5", "6̣5̣1", "1", "2", "3", "2", "0",
     "6̣5̣1", "1", "2", "2", "3", "1", "5", "6̣5̣1", "1", "2", "1", "0", "0", "0",
     "6̣5̣1", "1", "2", "2", "3", "1", "5", "6̣5̣1", "1", "2", "2", "3", "2", "0",
     "6̣5̣1", "1", "2", "2", "3", "1", "5", "6̣5̣1", "1", "2", "1", "0", "0", "0",
     "431", "6", "126", "1", "5", "6", "1", "4316", "126", "1", "0", "0", "0",
     "4316", "126", "1", "5", "6", "1", "5̣5̣1", "4·4", "0", "0", "2512"],
    # 反复段（展开一次）
    ["2", "16", "123", "52", "3", "1512", "2", "16", "215", "3", "0", "2512",
     "2", "1", "6", "123", "523", "1", "7·6", "67717̇710", "2512", "2", "16", "123",
     "523", "15", "12", "2", "16", "215", "3", "0", "2512", "2", "16", "123",
     "523", "1", "7", "6.", "7", "17̇711", "0", "0"],
    # 跳房子1（展开）
    ["0", "0", "0", "0", "2151", "21", "53", "0", "0", "0", "21", "61", "21", "53", "0",
     "0", "1", "2", "1", "1", "7", "6̣6̣", "5", "21", "61", "21", "53", "0", "0", "6", "21",
     "51", "21", "53", "0", "0", "1", "21", "61", "21", "53", "0", "0", "1", "2", "572", "577",
     "7", "5̣5̣", "0", "0", "25", "1", "2", "2"],
    # 跳房子2（展开）
    ["2", "6", "7", "17̇711", "25", "1", "2"],
    # 跳房子3（展开）
    ["6̣5̣1", "1", "2", "2", "6", "-", "7", "17̇711", "-", "0", "3", "1", "5",
     "6̣5̣1", "1", "2", "2", "331", "0", "6̣5̣1", "1", "2", "2", "3", "1", "5",
     "6̣5̣1", "1", "22", "1", "0", "0", "0", "6̣5̣1", "1", "2", "2", "3", "1", "5",
     "6̣5̣1", "1", "2", "2", "331", "0", "6̣5̣1", "1", "2", "2", "3", "1", "5",
     "6̣5̣1", "1", "22", "1", "0", "0", "0"]
]

# 构建完整旋律
full = mp.chord([])
for bar in bars_tokens:
    for token in bar:
        if token == '0':
            full = full | mp.rest(1 / 4)
            continue
        if token == '-':
            continue  # 延音线忽略
        # 解析 token 得到音符列表
        notes = parse_token(token)
        for num, dur, dotted, oct_shift in notes:
            degree = int(num) - 1
            base_note = scale.notes[degree]
            new_oct = base_note.num + oct_shift
            note_name = f"{base_note.name}{new_oct}"
            actual_dur = dur * (1.5 if dotted else 1)
            single = mp.translate(f"{note_name}[l:{actual_dur}; i:{actual_dur}]")
            full = full | single if full.notes else single

# 播放
mp.play(full, bpm=100, wait=True, save_as_file=False)
```

</details>

---

## 相关参考

[musicpy](https://github.com/Rainbow-Dreamer/musicpy)

[银河与星斗钢琴曲 钢琴简易简谱独奏](https://www.bilibili.com/video/BV1ag411Q7KG/)

[银河与星斗 - 网易云音乐](https://music.163.com/#/song?id=1848190450&uct2=U2FsdGVkX180tLdE5eV9CcQYEQTMNj/lAxSRee3uzRE=)

[《银河与星斗简谱》](https://www.aitanqin.com/jianpu/3a28599b0c.html)

[《\[日\]だんご大家族简谱》](https://www.aitanqin.com/jianpu/3a48344b0c.html)
