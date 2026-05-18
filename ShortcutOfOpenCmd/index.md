---
title: 打开cmd的快捷方式
published: 2026-01-16
description: "autohotkey定义快捷键打开cmd，实现类Linux效果"
image: "assets/image.png"
tags: ["Windows", "Autohotkey", "cmd"]
category: Note
draft: false
---

> [!NOTE]
>
> Image by <a href="https://pixabay.com/users/qiaominxu_橋茗旭-18717949/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=8459936">qiaominxu 橋茗旭</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=8459936">Pixabay</a>

## 前言

很多时候，我们打开 cmd，都是 Win+R 输入 cmd，然后回车，或者在 explore 的路径栏输入 cmd，然后回车。这样还是略显麻烦，认识 Autohotkey 的我，就会想到用它定义一个快捷键，来打开 cmd。

有一点 Linux 基础的我，选择了`Ctrl + Alt + T`。

## 代码

~~高手~~何必自己下场写代码？全部交给 AI 做就行了，which called "sprite codding"

<details>
    <summary>Autohotkey 代码</summary>

```autohotkey
#Requires AutoHotkey v2.0

^!t:: {
    ; 获取资源管理器当前路径
    try {
        path := GetExplorerPath()
        Run("cmd.exe", path)
    } catch {
        Run("cmd.exe")
    }
}

GetExplorerPath() {
    ; 尝试获取活动资源管理器窗口的路径
    if WinExist("ahk_class CabinetWClass") {
        ; 适用于经典资源管理器
        for window in ComObject("Shell.Application").Windows {
            if window.hwnd = WinExist("ahk_class CabinetWClass") {
                return window.Document.Folder.Self.Path "\"
            }
        }
    }
    ; 如果没有找到路径，使用用户桌面
    return A_Desktop
}
```

</details>

## 成果

然后用某种方式使其开机自启动，我们就能随时按下 `Ctrl + Alt + T` 打开 cmd 了，且 cmd 的路径是当前资源管理器的路径。
