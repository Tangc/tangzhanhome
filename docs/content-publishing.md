# 文章发布规范

本文记录从 `tangzhanx/share` 同步历史文字分享到个人网站的固定要求。后续扩展图文发布、飞书知识库或 ima 知识库时，先保持本文约定不变，再新增对应平台规则。

## 目标

- `share` 目录只作为原始内容库，不在原地改写。
- 网站仓库必须保存一份发布副本，放在 `public/published/posts/`。
- 网站 meta 统一由 `public/published/posts-manifest.json` 管理，不向 Markdown 副本插入 frontmatter。
- 每篇文章必须有独立 HTML 页面，可以被 Google 单独发现、抓取和索引。
- `public` 下的 Markdown 原文副本只作为发布留档和网站构建输入，不参与搜索引擎索引。

## 源文件

默认源目录：

```text
/Users/tangchao/Documents/tangzhanx/share
```

同步时递归读取该目录下的 Markdown 文件，例如：

```text
/Users/tangchao/Documents/tangzhanx/share/2026/20260622_D152E173.md
```

要求：

- 原文保持不改写。
- 不向源文件补 frontmatter。
- 不向发布副本补 frontmatter。
- 不为了 SEO 改写正文观点。
- 本轮同步对象是历史纯文字分享；后续图文文章发布前，必须扩展图片资产复制和路径重写。

## 发布副本

发布副本目录：

```text
public/published/posts/
```

文件名格式：

```text
YYYY-MM-DD-<source-slug>.md
```

示例：

```text
public/published/posts/2026-06-22-20260622-d152e173.md
```

日期规则：

- `20260622_D152E173.md` -> `2026-06-22`
- `0801_D26E37.md` 这类短日期文件，必须从父目录 `202508` 推断为 `2025-08-01`
- 无法从文件名或父目录推断合法日期时，使用源文件修改日期作为合法 fallback，并在 manifest 中记录 `dateStatus: "file-mtime"`。

同步命令：

```bash
bun run sync-content
```

同步后必须生成：

```text
public/published/posts-manifest.json
```

每条 manifest 记录至少包含：

```text
id
fileName
title
titleStatus
date
dateStatus
category
excerpt
sourceFile
sourceSha256
```

如果源文件没有 `#` 标题，脚本从正文中提取合适标题，并记录 `titleStatus: "generated"`。

## 网站读取

网站文章读取目录固定为：

```text
public/published/posts/
```

相关代码：

```text
src/lib/posts.ts
src/app/blog/page.tsx
src/app/blog/[id]/page.tsx
src/app/page.tsx
```

页面 URL 规则：

```text
/blog/<published-markdown-file-name-without-.md>
```

示例：

```text
/blog/2026-06-22-20260622-d152e173
```

首页必须露出最新文章模块，当前模块名为：

```text
LATEST_WRITINGS
```

## SEO 要求

每篇文章的 HTML 页面必须具备：

- 独立 URL
- 独立 `<title>`
- 独立 `meta description`
- `canonical`
- `robots: index, follow`
- Open Graph 标题、描述、URL、站点名和文章类型
- Twitter summary 卡片
- `Article` JSON-LD 结构化数据
- 只保留一个页面主 H1，正文里的首个同名 H1 渲染时要去掉
- 进入 `/sitemap.xml`

当前 canonical 格式：

```text
https://www.tangzhanx.com/blog/<id>
```

Markdown 原文副本必须禁止索引：

```text
X-Robots-Tag: noindex, nofollow
```

`robots.txt` 必须禁止抓取：

```text
Disallow: /published/posts/
```

注意：Google 应索引 `/blog/...` HTML 页面，不应索引 `/published/posts/...md` 原文副本。

## 验证清单

发布或改造后必须执行：

```bash
bun run lint
bun run build
```

本地服务检查：

```bash
bun run dev -- -p 3000
```

检查首页露出：

```bash
curl -sS http://localhost:3000/ | rg "LATEST_WRITINGS|/blog/"
```

检查文章页 SEO：

```bash
curl -sS http://localhost:3000/blog/2026-06-22-20260622-d152e173 \
  | rg "<title>|description|canonical|og:title|twitter:card|application/ld\\+json"
```

检查 sitemap：

```bash
curl -sS http://localhost:3000/sitemap.xml | rg "blog/2026-06-22-20260622-d152e173"
```

检查 robots：

```bash
curl -sS http://localhost:3000/robots.txt
```

检查 Markdown 原文副本不被索引：

```bash
curl -sSI http://localhost:3000/published/posts/2026-06-22-20260622-d152e173.md \
  | rg -i "x-robots-tag|content-type|HTTP/"
```

检查发布副本和源文件一致：

```bash
bun - <<'EOF'
const { readFileSync } = require('node:fs');
const { createHash } = require('node:crypto');
const manifest = require('./public/published/posts-manifest.json');
let failures = [];
for (const post of manifest.posts) {
  const hash = createHash('sha256')
    .update(readFileSync(`public/published/posts/${post.fileName}`))
    .digest('hex');
  if (hash !== post.sourceSha256) failures.push(post.fileName);
}
console.log(`verified=${manifest.posts.length - failures.length}/${manifest.posts.length}`);
if (failures.length) process.exit(1);
EOF
```

## 后续扩展

图文文章发布前必须先补齐：

- 图片资产复制到 `public/published/assets/`
- Markdown 图片路径重写
- 图片缺失报告
- 批量同步的 dry-run 模式
- 页面图片可访问
- 图片 alt 文本可用
- Open Graph 图片可用
- 移动端阅读不溢出
