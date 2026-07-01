# 项目规范

## 基本信息

- 本项目是唐斩个人网站，技术栈为 Next.js + Bun，部署到 Vercel。
- 默认使用简体中文维护项目文档、发布规范和面向用户的说明。
- 修改代码后，至少运行：

```bash
bun run lint
bun run build
```

## 文章同步

- `/Users/tangchao/Documents/tangzhanx/share` 是原始内容库，不在原地改写。
- 当用户说“从 share 同步到个人网站”或同义表达时，默认执行完整发布流程：检查 `share` 中相对当前网站仓库新增的 Markdown 分享内容，同步到个人网站，完成验证，提交并推送到远端 GitHub。
- 同步前必须先比较 `share` 源文件与 `public/published/posts-manifest.json` 中记录的来源，明确新增、变更和异常文件；没有新增内容时直接说明，不做空提交。
- 发布到网站时，必须把 Markdown 原样复制到项目内：

```text
public/published/posts/
```

- 网站展示和 SEO 所需 meta 统一写入：

```text
public/published/posts-manifest.json
```

- 网站文章读取源固定为 `public/published/posts/`。
- 文章页面 URL 规则为：

```text
/blog/<published-markdown-file-name-without-.md>
```

- Markdown 发布副本必须保持原文，不为了 SEO 改写正文观点。
- 不向源文件补 frontmatter。
- 不向发布副本补 frontmatter。
- 日期无法从文件名或父目录推断时，使用源文件修改日期作为合法 fallback，并在 manifest 记录 `dateStatus`。
- 若源文章引用图片，必须先确认图片存在；图片复制和路径重写未完成前，不发布带图文章。

## SEO 要求

- 每篇文章必须有独立 HTML 页面，并能进入 `/sitemap.xml`。
- 每篇文章页面必须包含独立 title、description、canonical、Open Graph、Twitter metadata 和 `Article` JSON-LD。
- HTML 文章页允许索引：`index, follow`。
- `public/published/posts/*.md` 只作为原文副本和构建输入，必须禁止搜索引擎索引：

```text
X-Robots-Tag: noindex, nofollow
```

- `robots.txt` 必须禁止抓取：

```text
Disallow: /published/posts/
```

## 参考文档

文章同步、SEO、验证命令和后续图文扩展规则详见：

```text
docs/content-publishing.md
```
