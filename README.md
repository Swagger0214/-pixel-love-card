# Pixel Love Card + 回复后台

## 1. 创建 Supabase

注册/登录 Supabase，新建一个 Project。

进入 SQL Editor，把 `supabase.sql` 的全部内容运行一次。

## 2. 填写前台配置

打开 `config.js`：

- `YOUR_SUPABASE_URL` 换成 Supabase Project URL
- `YOUR_SUPABASE_ANON_KEY` 换成 Project 的 anon/public key

例如：

window.SUPABASE_URL = "https://xxxxx.supabase.co";
window.SUPABASE_ANON_KEY = "ey...";

## 3. 设置后台密码

打开 `admin.html`：

const ADMIN_PASSWORD = "CHANGE_THIS_PASSWORD";

把它改成你自己的密码。

## 4. 部署

把这些文件放到 GitHub 仓库：

index.html
config.js
app.js
style.css
admin.html
admin.css

然后打开 GitHub Pages。

## 5. 使用

把前台网址发给对方。

对方完成选择后，回复会写入 Supabase。

你打开：

https://你的用户名.github.io/你的仓库/admin.html

输入后台密码，就能看到回复。

## 重要安全说明

这个版本是“轻量私人版”：为了让 GitHub Pages 的纯静态前端能够直接提交数据，读取策略也开放给 anon。

如果你准备把链接公开发到很多人手里，不建议继续使用这个简单策略。届时应改成 Supabase Auth / Edge Function，让真正的后台查询只对管理员开放。