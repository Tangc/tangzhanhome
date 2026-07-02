## 工作流结果

来源状态：成功
来源类型：URL
来源路径或链接：https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing?hl=en
文章类型：体系沉淀型
发布包根目录：/Users/tangchao/Documents/New project/outputs/2026-06-20-0855-open-knowledge-format
核心论点：OKF 的价值不在于多发明一种知识库，而在于把 Agent 需要的上下文变成可版本化、可迁移、可协作的文件格式。
立场：谨慎推荐
读者行动：先用一个小型 repo 试做团队知识 bundle：目录、frontmatter、index、log、引用链跑通之后，再考虑接入业务系统。

---

# Google 开源 OKF，我更关心它背后的知识协作方式

![OKF 把知识变成可协作的文件格式](/published/assets/2026-06-20-open-knowledge-format/01-cover-or-core-thesis.png)

大家好，我是唐斩。

Google Cloud 在 2026 年 6 月 13 日发了一篇文章，介绍 Open Knowledge Format，简称 OKF。v0.1 的设计非常朴素：一个 Markdown 文件目录，再加 YAML frontmatter，用来表示人和 Agent 都能读取的知识。

我的判断先放前面：这件事值得看，但别把它当成又一个知识库产品。

OKF 有意思的地方，是它把“给 Agent 准备上下文”这件事，从临时拼提示词、临时查资料，往工程化资产推了一步。

![上下文碎片化的问题](/published/assets/2026-06-20-open-knowledge-format/02-context-fragmentation.png)

## 1. Agent 缺的不是搜索框，是稳定上下文

现在很多 Agent demo 看起来很强，一进真实组织就卡住。

不是模型不会推理，而是它不知道你们公司“周活用户”到底怎么算，不知道一张表和另一张表怎么 join，不知道某个 API 为什么被废弃，也不知道哪份 runbook 才是最新版本。

这些知识通常散在很多地方：数据目录、wiki、网盘、代码注释、notebook，甚至几个老工程师脑子里。Agent 每次要干活，都要重新拼一次上下文。

Google Cloud 文章里把这个问题叫 context assembly。我觉得这个词挺准确。很多团队不是没有知识，而是知识没有被整理成机器能稳定使用的形态。

![一个 OKF bundle 怎么组织](/published/assets/2026-06-20-open-knowledge-format/03-okf-bundle-structure.png)

## 2. OKF 的反直觉点：它没有发明复杂系统

OKF v0.1 很克制。

一个 bundle 就是一个目录。目录里是一堆 Markdown 文件。每个 concept 是一个文件。文件开头放 YAML frontmatter，至少要有 type 字段，title、description、resource、tags、timestamp 这些字段是推荐项。

再加两个常见文件：index.md 负责导航，log.md 负责记录历史。

这套东西看起来太普通了。也正因为普通，才有价值。

开发者已经会用 Markdown，已经会用 git，也知道 PR、diff、review、blame 是什么。OKF 想做的不是重建一套协作系统，而是把这些普通工程能力，用到 Agent 能读取的知识上。

## 3. 它不是知识库，是交换格式

这里最容易误解。

如果把 OKF 当成 Notion、Obsidian、Confluence 的替代品，会觉得它简陋。但它本来就不是要和这些产品拼体验。

它更像一个中间层：你可以从 data catalog 生成它，可以手写它，可以让 Agent 维护它，也可以把它喂给另一个 Agent、搜索索引或可视化工具。

Google 的规格里说得很清楚：OKF 不绑定云厂商、数据库、模型供应商或 Agent 框架。它定义的是最小互操作面，不是完整内容模型。

翻译成开发者语言就是：先别争谁的知识库更好，先把知识导出成一个大家都能读的目录。

## 4. 对 AI 编程的影响

我最关心的是 Agent 编程。

过去我们给 AI 编程工具上下文，常见做法是写 AGENTS.md、CLAUDE.md、README、docs，再加一堆聊天里的口头规则。这些东西有用，但格式不统一，迁移也麻烦。

OKF 这类格式如果继续发展，可能会把团队知识拆得更细：

- 一个 API 是一个 concept。
- 一个数据表是一个 concept。
- 一个指标口径是一个 concept。
- 一个 incident playbook 也是一个 concept。

这些 concept 之间用 Markdown 链接连接。Agent 不需要一次读完整个知识库，而是先读 index，再沿着链接逐步展开。

这才是我觉得它重要的地方：它让上下文有了可导航结构，而不是一坨文档。

## 5. 坑也很明显

第一，v0.1 还很早。

它现在的硬约束很少，type 是必需字段。这个选择有利于扩散，但也会带来问题：每个团队都能定义自己的 type，最后可能还是互不兼容。

第二，Markdown 不等于高质量知识。

你可以把一堆废话写进 Markdown，也可以把过期 runbook 写得很漂亮。OKF 解决的是格式交换，不会自动解决内容治理。

第三，Agent 维护知识必须有人 review。

让 Agent 自己更新 15 个文件听起来很爽，但如果没有引用、测试和变更记录，很快会变成更隐蔽的知识污染。

![开发者从小 repo 开始试用](/published/assets/2026-06-20-open-knowledge-format/04-developer-action.png)

## 6. 我建议怎么试

不要一上来就改造全公司知识库。

找一个小业务域，比如“用户增长数据分析”或“支付链路排障”，建一个 repo：

1. 用 index.md 写清目录。
2. 每个关键概念一个 Markdown 文件。
3. frontmatter 至少写 type、title、description、resource。
4. 重要结论加 citations。
5. 用 log.md 记录真实变更。
6. 让 Agent 基于这个 bundle 回答 5 个真实问题。

如果它能少问你几轮，少犯几个上下文错误，再继续扩展。

## 总结

OKF 不会立刻改变所有开发流程。

但它击中了一个关键问题：Agent 时代，知识不能只躺在人类协作文档里，也不能只被锁在某个厂商系统里。

知识需要变成文件，变成链接，变成历史，变成可以被人审查、被 Agent 读取、被系统迁移的工程资产。

所以我会谨慎推荐 OKF。

不是因为它已经成熟，而是因为它提醒我们：未来真正值钱的，不只是模型能力，而是谁能把自己的私有知识整理成高质量、可协作、可迁移的上下文。

来源：Google Cloud Blog《Introducing the Open Knowledge Format》；GoogleCloudPlatform/knowledge-catalog OKF v0.1 specification。

