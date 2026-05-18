---
title: 如何在Windows上部署kokoro-v1_1-zh
published: 2026-05-05
description: "在Windows上部署kokoro-v1_1-zh"
image: "assets/image.png"
tags: ["Windows", "Python", "TTS", "HuggingFace", "Github"]
category: Note
draft: false
player:
  source: "local"
  link: "assets/HEARME_zf_001.wav"
  bottom: "40px"
  left: "40px"
  autoPlay: false
---

> [!NOTE]
> Cover From <https://github.com/hexgrad/kokoro>

<https://github.com/hexgrad/kokoro>

<https://huggingface.co/hexgrad/Kokoro-82M-v1.1-zh>

## python essential

```shell
python -m venv .venv
call .venv/scripts/activate
pip install kokoro>=0.8.2 misaki[zh]>=0.8.2 soundfile
```

## model download(need python env)

```shell
hf download hexgrad/Kokoro-82M-v1.1-zh --local-dir .\kokoro_model --force-download
```

## run

```shell
python .\kokoro_model\samples\make_zh.py
```

then you can see the changes in the folder samples.

## caption

data in .cache is just links and real files is in the root.

## structure

[Snapshot of D:\\repos\\Pelr\\kokoro](kokoro.html)

## MyKokoro

[![igugyj/MyKokoro - GitHub](https://gh-card.dev/repos/igugyj/MyKokoro.png?fullname=)](https://github.com/igugyj/MyKokoro)

---

enjoy!
