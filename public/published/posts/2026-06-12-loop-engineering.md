---
title: 别只学 Prompt 了，下一步是设计 Loop
source_url: https://addyosmani.com/blog/loop-engineering/
source_title: Loop Engineering
source_author: Addy Osmani
source_date: 2026-06-07
workflow: tangzhan-writing-workflow
workflow_version: v1.1.0
created_at: 2026-06-12
---

> 工作流结果
>
> - 文章类型：体系沉淀型
> - 推荐标题：别只学 Prompt 了，下一步是设计 Loop
> - 核心判断：AI 编程的下一层能力，不是继续堆更长的提示词，而是把触发、上下文、工具、隔离、验证、状态和人工判断组合成可重复运行的 loop。
> - 推荐立场：谨慎推荐
> - 配图说明：本文配图由本地工作流生成，适合作为公众号正文插图使用。

# 别只学 Prompt 了，下一步是设计 Loop

![别只学 Prompt，下一步是设计 Loop](/published/assets/2026-06-12-loop-engineering/01-cover-or-core-thesis.png)

大家好，我是唐斩。

今天看了 Addy Osmani 的一篇文章，标题叫《Loop Engineering》。他的判断很直接：AI 编程的下一层，不是继续写更好的 prompt，而是设计能持续 prompt agent 的 loop。

我先说结论：这个方向值得关注，但别把它理解成“人终于可以退出开发了”。

恰恰相反。Loop Engineering 不是让工程师消失，而是把工程师的职责从逐轮操作，推到系统设计、边界定义、验证和复核上。

## 1. Addy 这篇文章在讲什么

过去我们使用 coding agent，大多还是聊天式的。

你给一个 prompt，agent 回一版。你看完，再补上下文，再让它改。整个过程是一轮一轮的，人一直握着方向盘。

Addy 说的 loop，是另一种结构：你设计一个小系统，让它自己发现任务、分配任务、检查结果、记录状态，然后决定下一步。

这不是单次 agent run，而是一个循环。

比如每天早上自动看昨天的 CI 失败、issue、最近 commit，把值得处理的事情写进一个 Markdown 或 Linear；对某个问题开独立 worktree，让一个 agent 草拟修复，另一个 agent 按测试和项目规范检查；最后把结果、失败原因、下一步写回状态文件。

重点不是“agent 做了一次任务”。

重点是：这套动作明天还能接着跑。

## 2. Loop 和 Prompt 最大的区别

Prompt engineering 解决的是单次交互质量。

你要把目标说清楚，把上下文补足，把约束写明白。它很重要，也不会消失。

但 Loop Engineering 解决的是另一件事：重复任务如何稳定发生。

它关心的问题不只是“这次怎么让 agent 做好”，而是：

1. 什么时候触发？
2. 去哪里找任务？
3. 用哪个上下文？
4. 在哪里安全执行？
5. 谁负责验证？
6. 做完以后状态写到哪里？
7. 下一轮怎么继续？

所以 loop 比 prompt 更像工程系统。

它不是一个长提示词，而是一套有输入、输出、边界、状态和验收标准的工作流。

## 3. 一个可用 loop 的六个部件

![一个可用 loop 的六个部件](/published/assets/2026-06-12-loop-engineering/02-six-parts-of-loop.png)

Addy 把 loop 拆成几个部件，我把它转成更适合开发者理解的六件事。

第一，Heartbeat。

也就是自动化触发。可以是每天跑一次，可以是 CI 失败时跑一次，也可以是某个 issue 进入特定状态时跑一次。没有 heartbeat，就只是你手动跑的一次 agent。

第二，Isolation。

也就是 worktree 或隔离目录。只要你让多个 agent 并行，文件冲突就会出现。worktree 解决的是机械碰撞，让每个 agent 在自己的分支和目录里干活。

第三，Project Knowledge。

也就是 skill。不要每次都重新解释项目怎么构建、测试怎么跑、哪些模式不能用。把这些写到 `SKILL.md` 里，让 agent 每次从固定规则开始。

第四，Connectors。

loop 不能只看文件系统。它要能看 issue、CI、PR、文档、监控、通知工具。否则它只能告诉你“我会怎么做”，不能进入真实工作流。

第五，Checker。

也就是 sub-agent 或独立验证器。写代码的是 maker，检查代码的是 checker。不要让同一个模型写完以后告诉你“我觉得我做完了”。这太危险。

第六，Memory。

也就是状态文件。可以是 Markdown，可以是 Linear，可以是数据库。关键是它活在单次对话之外，记录做过什么、为什么失败、下次从哪里继续。

这六件事合在一起，才像一个 loop。

## 4. 为什么工程师反而更重要

很多人听到 loop，会本能地想：那是不是以后我不用管了？

我觉得这是最危险的误解。

loop 会放大能力，也会放大错误。一个坏 prompt 只错一次，一个坏 loop 会按节奏反复错。一个没有验证的 agent 只是偶尔乱改，一个没有验证的 loop 会持续把错误推进到更远的地方。

Addy 在文章后面提到几个风险，我很认同。

第一，验证仍然是你的责任。

loop 说 done，只是一个系统状态，不等于质量事实。测试有没有跑，边界有没有覆盖，代码有没有真的符合业务目标，这些都不能因为 agent 说完成了就算完成。

第二，理解债会变大。

agent 写得越快，你不读代码，理解差距就越大。短期看你很省事，长期看你会变成只会按按钮的人。

第三，认知投降会更隐蔽。

单次 prompt 里你还能明显感觉到自己在判断；loop 跑顺以后，你很容易默认接受它的输出。这时候效率看起来上来了，工程判断其实下去了。

所以我觉得 Loop Engineering 的核心，不是把工程师拿掉，而是把工程师的判断写进系统里。

你要定义触发条件、上下文来源、执行边界、验证规则、状态记录和人工复核点。

这比写 prompt 更难。

## 5. 普通开发者怎么开始

![别从全自动修 bug 开始，先做一个小闭环](/published/assets/2026-06-12-loop-engineering/03-seven-day-small-loop.png)

如果你现在想试 loop，我建议不要从“全自动修 bug”开始。

从一个很小的 loop 开始。

比如：每天早上扫描昨天失败的测试和新开的 bug issue，整理成一份 `triage.md`。这个 loop 不直接改代码，只做发现和分级。

跑顺之后，再加第二步：

你从 `triage.md` 里挑一个任务，让 agent 在单独 worktree 里尝试修复。

然后加第三步：

另一个 agent 或脚本跑测试、检查 diff、按项目 skill 做 review。

最后加第四步：

把结果写回 `triage.md`：已尝试、通过、失败原因、下一步。

这个 loop 很朴素，但它已经包含了关键结构：

- 触发
- 发现
- 状态
- 隔离
- 执行
- 验证
- 人工确认

做完这个，再谈更复杂的自动化。

## 6. 我推荐谁现在做

![Loop 会放大能力，也会放大错误](/published/assets/2026-06-12-loop-engineering/04-risk-boundaries.png)

我会谨慎推荐。

第一类，是已经稳定使用 Codex、Claude Code、Cursor 这类工具的开发者。你已经知道 agent 能做什么，也知道它会在哪些地方犯错。

第二类，是有测试和 CI 的团队。没有基本验证体系，不要急着做无人值守 loop。

第三类，是已经有 issue、PR、文档、规范沉淀的小团队。loop 需要外部状态和项目知识，空白项目很难跑出稳定收益。

不推荐给两类人。

第一类，是还没有读代码习惯的人。loop 会让你更快地失去理解。

第二类，是没有质量门的团队。没有测试、没有 review、没有回滚机制，loop 只会让风险更快扩散。

## 7. 总结

Prompt engineering 还没结束，但它已经不是全部。

下一阶段的 AI 编程能力，会越来越像系统设计能力：你能不能把触发、上下文、工具、隔离、验证、状态和人的判断，组合成一个可以重复运行的 loop。

但我想强调一点：loop 不是逃避理解的工具。

同一个 loop，在懂系统的人手里，是杠杆；在不想理解系统的人手里，是风险。

所以可以开始设计 loop。

但要像一个还打算继续当工程师的人一样设计它。

不是按下按钮就走，而是把你的工程判断写进循环里。
