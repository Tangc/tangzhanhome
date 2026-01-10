---
title: langchain
date: '2026-01-10'
category: script
originalPath: /Users/tangchao/Documents/tangzhanx/video/2025/20251030langchain/langchain.md
---

## 情绪
AI编程，框架太多分不清楚，什么关系

## 标题
LangChain
LangGraph
傻傻分不清楚

## 3秒
开发Agent，要用什么框架啊？
LangChain、LangGraph 怎么区分啊？
还有个 LangSmith ，头都晕了。
不要慌。

## 内容
大家好我是唐斩。
LangChain 是现在 Agent 开发领域，使用最广泛的框架，没有之一，有python和javascript两个版本。

LangChain最初是在 2022年，ChatGPT发布之前，作者的业余项目，只有800行的python库
初衷就是帮助开发者快速对接上各种的LLM，随着LLM的爆发，几年间疯狂增长，迭代了多个版本，堆积了很多代码、功能、隐藏逻辑，快成便便山了。

在23年的时候，AI开发逐渐从ChatBot模式过度到了Agent模式
LangChain的开发团队决定开发新框架来支持Agent这种 基于大语言模型，持续运行，慢速响应，可容错的软件模式，
基于图数据结构的新架构实现了新开了LangGraph框架。

好处是避开了langchain的便便山，坏处是开发者无法在框架间平滑切换，有很大的选择成本

随着线上产品使用 LangX 框架的增加，可观测和可运维的需求也出现了，于是团队又产出了 LangSmith框架，这就是 LangX 系列的全景。


最近，langchain和langgraph发布了1.0版本，这次几乎“推翻重构”了整个 LangChain 框架，
理清了和LLM交互的核心框架，并且让框架底层基于 LangGraph 来实现

这样就避免了用户对 LangChain 和 LangGraph 的 2选1，
两个框架是对同一个事情的不同抽象层次。

新项目，小团队，快速上手快速开始就选择 Langchain，
项目复杂后，想更精细化控制流程的时候，就用 无缝切换到 LangGraph 使用。
可观测和运维诉求通过 LangSmith 实现，完美。

下次新项目就用1.0来开发，深度体验一下

## 结尾
Agent开发框架，你怎么选？

## 标签
#ai#程序员#agent#编程

## 描述
快速启动用langchain，精细控制用langgraph
可观测，运维用 langsmith。
最新1.0版本的langchain底层基于langgraph实现，架构清晰，方便未来切换，推荐使用。




https://blog.langchain.com/three-years-langchain/
心路历程
https://mp.weixin.qq.com/s/Af1gtoKMf1Aim5tlerzqvQ
langchain更新的架构逻辑
- 上层封装级高的开箱即用
- 底层框架核心稳定的
https://blog.langchain.com/langchain-langgraph-1dot0/
补充 https://mp.weixin.qq.com/s/Af1gtoKMf1Aim5tlerzqvQ
