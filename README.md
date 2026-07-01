# tangzhanhome

唐斩个人网站，使用 Next.js + Bun，部署到 Vercel。

## 开发

```bash
bun install
bun run dev
```

本地访问：

```text
http://localhost:3000
```

## 文章同步

文章原始内容来自：

```text
/Users/tangchao/Documents/tangzhanx/share
```

发布到网站时，先复制为网站仓库内的发布副本：

```text
public/published/posts/
```

同步全部历史分享：

```bash
bun run sync-content
```

同步脚本会原样复制 Markdown，并在 `public/published/posts-manifest.json` 里生成网站展示和 SEO 需要的 meta。

完整规范见：

```text
docs/content-publishing.md
```

## 质量门

```bash
bun run lint
bun run build
```

每篇文章必须有独立 `/blog/<id>` 页面并进入 `/sitemap.xml`。`/published/posts/*.md` 只作为原文副本和构建输入，必须保持 `noindex`。
