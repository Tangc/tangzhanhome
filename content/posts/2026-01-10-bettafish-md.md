---
title: bettafish
date: '2026-01-10'
category: script
originalPath: /Users/tangchao/Documents/tangzhanx/video/2025/20251219bettafish/bettafish.md
---
## 观众的情绪
❗️



## 视频结构(线性，递进，回环，意外，迭代)


## 标题
免费开源人人可用的
多Agent舆情分析助手


Bettafish
使用和避坑指南

## 开篇场景 3-5s (问题，金句，结论)
前两天太忙错过了 字节的 火山引擎 动力大会 冬季
所以用开源的舆情监测Agent，做了一份详细的舆情报告

有事件，有数据，有舆论发酵趋势，有舆论情绪分析，多角度的深层分析
比一般大模型的深度研究更详实。

最重要是工具本身完全开源，可免费使用。调用的大模型API要自己付费。

什么工具这么牛？就是它，BettaFish，在github上已经有3.3w star
从来没见过这么夸张，这么陡峭的涨星曲线

使用起来也很方便，以mac为例，
视频最后有避坑指南

前置安装mysql 和 docker
brew install mysql docker

用docker下载镜像并启动
mkdir bettafish && cd bettafish
vim docker-composer.xml
docker compose up -d

bettafish 和 bettafish-db 启动即可

打开浏览器 localhost:5000 
进入系统页面，完成 数据库和AI工具 配置，输入要检测的主题
等待系统运行完成，打开 ReportEngine Tab，即可查看和下载报告

这是它的系统架构，由Insight、Media、Query 三个Agent分析
Forum 汇总，最后由 ReportEngine 产出报告。
是典型的多 Agent 协作系统。


mac使用的3点避坑指南
1、端口冲突
mac有系统应用占用了5000端口，修改docker配置文件
ports文件第一个端口，就可以在浏览器用5001打开了

2、MySQL配置
mac系统docker内服务调用docker外的服务，localhost无效
要用这个域名，在系统的LLM配置中这么写
需要在mysql中手动创建一个 bettafish 库，我用的工具是 dbeaver

3、大模型配置
实测，可以全部用deepseek
搜索用 Anspire 和 Tavily 的 API，
这俩有免费额度

好了，用起来试试吧，深度调研报告，你还有什么推荐的工具？





## 中间内容 (15s注意力，路标预告)


## 金句提炼（总结，升华），争议点提炼(卖个破绽)


## 结尾引导（固定结尾）


## 标签（#ai #编程 #程序员）
#ai #Agent #编程


## 描述（引导互动）

Bettafish，使用和避坑指南！免费开源人人可用的，多Agent舆情分析助手。
#ai #Agent #编程
