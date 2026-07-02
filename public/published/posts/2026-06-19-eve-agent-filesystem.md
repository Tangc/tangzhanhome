# eve 给 Agent 项目一个文件系统骨架

大家好，我是唐斩。

今天看的是 Vercel 的 eve 文档。它是一个 Agent 框架，但我觉得最值得看的不是「又来了一个框架」，而是它对 Agent 项目结构的判断。

我的立场：谨慎推荐。

如果你已经在做 Agent 工程，工具、Skill、渠道、多轮状态开始变乱，eve 值得研究。如果你只是接一个简单的 LLM API，或者做一个一次性聊天机器人，先不用急。

![eve 的核心不是模型，而是 Agent 项目骨架](/published/assets/2026-06-19-eve-agent-filesystem/01-cover-or-core-thesis.png)

## 1. eve 解决的不是模型问题

官方对 eve 的定义很直接：用 TypeScript 项目里的普通文件来构建 durable agents。

我看到这里，关注点不在 TypeScript，也不在 Agent，而在「普通文件」。

eve 不希望你把 Agent 的所有能力塞进一个大配置对象里。它把每一类东西放到固定位置：

- `instructions.md`：Agent 是谁，应该怎么行动。
- `agent.ts`：选模型，配置运行时。
- `tools/`：模型可以调用的 typed functions。
- `skills/`：较长的流程，需要时再加载。
- `channels/`：HTTP、Slack、Discord 等入口。

这套结构的好处是，目录先告诉你这个 Agent 能做什么。

![eve 用文件路径表达能力身份](/published/assets/2026-06-19-eve-agent-filesystem/02-filesystem-is-interface.png)

## 2. 文件系统就是接口

eve 文档里有个例子：`agent/tools/get_weather.ts` 会定义一个叫 `get_weather` 的工具。

这不是炫技，反而是很工程化的设计。

很多 Agent 项目早期都能跑，后面开始乱：工具在哪里注册，提示词在哪里改，Slack 入口和 Web 入口是不是走同一套逻辑，长流程到底算 tool 还是 Skill，调度任务又该放哪里。

eve 的答案是：位置就是身份。

你添加文件，eve 发现它；你移动或重命名文件，它的身份也跟着变。没有额外注册表要同步。

我喜欢这个方向。Agent 项目最后一定会变成软件工程问题，而软件工程怕的就是隐式状态和散落配置。

![eve session 是可恢复的工作流过程](/published/assets/2026-06-19-eve-agent-filesystem/03-durable-session-flow.png)

## 3. session 不再是一次问答

eve 另一个值得看的点，是它把 session 当成一个可持续运行的过程。

官方介绍里说，一个 eve session 可以流式输出进度，可以调用工具和子 Agent，可以暂停等待审批或人工回答，可以在回答到来后恢复，也可以跨轮保存 durable state。底层用的是 open-source Workflow SDK，让 session 具备 durable、resumable、crash-safe 的特性。

这对 Agent 很关键。

真实任务很少只是「问一句，答一句」。它经常要查资料、调用工具、等用户确认、继续执行、写文件、再回报结果。这个过程如果没有 durable session，失败一次就很难接上。

所以 eve 的价值不是让模型变聪明，而是把 Agent 运行过程变得更像一个可维护的工作流。

![先学结构，后谈迁移](/published/assets/2026-06-19-eve-agent-filesystem/04-adoption-checklist.png)

## 4. 我会怎么用这套思路

我不会现在就把所有项目迁到 eve。原因很简单：它还在 beta，官方也明确说框架、API、文档和行为在 GA 前都可能变化。

但我会把它的分层方法拿来当检查表。

一个 Agent 项目，至少要问自己六个问题：

1. 指令是不是单独存在，而不是混在业务代码里？
2. 模型和运行时配置是不是有明确入口？
3. 工具是不是 typed，而且能从路径看出名字？
4. 长流程是不是从一次性 tool 里拆出来了？
5. 渠道入口是不是和核心能力解耦？
6. session 是否能暂停、恢复，并保留状态？

如果这些问题答不上来，项目迟早会变成「能跑但没人敢改」。

## 5. 坑也很明显

第一，beta 就是 beta。不要把它当成稳定基础设施。

第二，它和 Vercel 生态关系很近。如果你在其他云、私有化部署、企业内网里做 Agent，部署和运维边界要重新验证。

第三，介绍页讲的是结构，不是复杂项目的全部代价。鉴权、成本、观测、权限隔离、数据持久化、渠道异常，这些都不是看一页 Introduction 就能解决的。

我的建议很简单：先学结构，后谈迁移。

## 总结

我看 eve 最大的收获，是它把 Agent 从「一坨提示词加工具」拆回了程序员熟悉的文件系统。

这件事很朴素，但方向对。

Agent 工程化的下一步，不一定是更复杂的框架，而是让每个能力有位置、每个文件有职责、每个 session 能被恢复。

如果你已经在做多工具、多渠道、多轮任务的 Agent，可以去看 eve。不是为了马上换框架，而是用它校准自己的项目结构。

来源：[eve Introduction](https://eve.dev/docs/introduction#an-eve-project-at-a-glance)
