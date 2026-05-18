---
title: Git的ssh密钥配置
published: 2025-10-31
description: "Git的ssh密钥配置记录"
image: "logo@2x.png"
tags: ["Git","ssh","Gitee","GitHub"]
category: Note
draft: false
---

git用户全局配置：https://blog.csdn.net/bandaoyu/article/details/112968504

#### 配置
```bash
git config --global user.name "username"

git config --global user.email  example@domain.com
```

#### 验证
```bash
git config user.name

git config user.email
```


---

```
git push
remote: [session-50418b87] Two-factor authentication (2FA) is enabled for your account. To use HTTPS-based password authentication, please use a personal access token instead of your password.
remote: For more details, visit https://help.gitee.com/account/two-factor-authentication.
fatal: unable to access 'https://gitee.com/user/repo/': The requested URL returned error: 403
```

你在 `git push` 时遇到的错误，是因为你的 Gitee 账户启用了**双因素认证 (2FA)** ，此时不能再使用账户密码进行 HTTPS 操作，需要改用更安全的认证方式。

你可以选择以下两种主流方案来解决这个问题。

### 🛠️ 解决方案对比

| 解决方案                     | 优点                                         | 缺点                                                                                |
| :--------------------------- | :------------------------------------------- | :---------------------------------------------------------------------------------- |
| **① 使用个人访问令牌 (PAT)** | 设置相对简单，无需生成密钥对；适合临时授权。 | 需妥善保管令牌，因为它相当于密码； HTTPS 方式每次推送可能需输入凭证（可配置缓存）。 |
| **② 配置 SSH 密钥**          | 一次配置，长期免密使用；安全性更高。         | 初始配置步骤稍多；需要生成并上传密钥对。                                            |

---

### 🔑 方法一：使用个人访问令牌 (Personal Access Token)

这种方式用令牌代替密码，是启用双因素认证后推荐的 HTTPS 认证方式。

1.  **生成令牌**
    *   登录你的 Gitee 账户，进入 **设置** 。
    *   找到并进入 **安全设置** 下的 **个人访问令牌** 页面。
    *   点击 **生成新令牌** 。
    *   为令牌起一个易于识别的名字（例如"我的电脑"），并设置合适的过期时间。
    *   根据需求勾选权限范围，至少需要勾选 **`repo`** （仓库权限）。
    *   生成后，**立即复制并妥善保存**令牌字符串，关闭页面后将无法再次查看。

2.  **使用令牌推送代码**
    *   当你再次执行 `git push` 时，会弹出认证窗口。
    *   **用户名**：填写你的 Gitee 用户名。
    *   **密码**：**此处不再输入账户密码，而是粘贴刚才生成的个人访问令牌**。

3.  **（可选）配置凭证缓存**
    为了避免每次推送都需输入令牌，可以让 Git 缓存你的凭证：
    ```bash
    git config --global credential.helper store
    ```
    此后，在第一次输入用户名和令牌后，Git 会将其缓存，后续操作就不再需要重复输入了。

### 🔐 方法二：配置 SSH 密钥认证

此方法通过生成一对非对称加密的密钥（公钥和私钥）来进行认证，更加安全便捷。

1.  **生成 SSH 密钥对**
    打开终端（如 Git Bash），执行以下命令。注意将 `"your_email@example.com"` 替换为你自己的邮箱，它仅是密钥的标识。
    ```bash
    ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
    ```
    生成过程中，连续按三次回车键使用默认选项即可（包括不设置密码，当然为了安全你也可以设置）。

2.  **添加公钥到 Gitee**
    *   使用以下命令查看并复制生成的公钥内容：
      ```bash
      cat ~/.ssh/id_rsa.pub
      ```
    <!-- >[!TIP]
    >
    >cmd无法使用这个命令，可以直接去打开文件复制内容。 -->

    <div style="border-left:4px solid #1a7f37;background:#dafbe1;padding:8px 12px;margin:8px 0"><div style="color:#1a7f37;font-weight:bold">TIP</div><div>cmd无法使用这个命令，可以直接去打开文件复制内容。</div></div>

    *   登录 Gitee，进入 **设置** -> **SSH 公钥** 。
    *   将刚才复制的公钥内容粘贴到"公钥"填写框中，并为这个公钥起一个标题。
    *   点击"确定"。

3.  **测试连接**
    在终端中执行以下命令，测试 SSH 密钥是否配置成功：
    ```bash
    ssh -T git@gitee.com
    ```
    如果看到类似 `Welcome to Gitee.com, YourUsername!` 的欢迎信息，说明配置成功。

4.  **修改远程仓库地址为 SSH 协议**
    这是关键的一步。你需要进入你的项目目录，将远程仓库的 URL 从 HTTPS 格式修改为 SSH 格式。
    *   **查看当前远程地址：**
      ```bash
      git remote -v
      ```
    *   **修改为 SSH 地址：**
      ```bash
      git remote set-url origin git@gitee.com:Pfolg/IconChanger.git
      ```
      （请将 `Pfolg/IconChanger.git` 替换为你自己的仓库路径）。
    *   修改完成后，再次尝试 `git push`，应该就可以成功推送了。

### 💡 如何选择？

*   如果你希望**快速解决当前问题**，并且不介意在推送时可能需要输入凭证，推荐使用**个人访问令牌**。
*   如果你追求**长期的安全与便利**，希望未来进行推送、拉取等操作时无需反复认证，那么**配置 SSH 密钥**是更好的选择。

如果在这个过程中遇到其他问题，或者想了解关于这两种认证方式的更多细节，随时可以再问我。