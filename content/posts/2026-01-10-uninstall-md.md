---
title: 大家好，我是唐斩，这是第109天第126篇分享。
date: '2026-01-10'
category: script
originalPath: >-
  /Users/tangchao/Documents/tangzhanx/video/2025/20251124ccuninstall/uninstall.md
---
# 大家好，我是唐斩，这是第109天第126篇分享。


## ClaudeCode 彻底卸载

崩溃了，给ClaudeCode装各种插件
全乱套了，一用就报错
卸载重装了也不好使。
怎么办？



不要慌张，来一套我总结的彻底卸载流程。

需要深度卸载，不是因为 Claude Code 像某流氓软件，赖着不走。
是因为它采用软件和配置分离的方式，本意是升级更新的时候，不会对用户的配置造成影响。

彻底卸载只需要2个步骤
步骤1、卸载 claudecode 本体
如果是mac用homebrew原生安装的，这么写
brew uninstall --cask claude-code

如果没通过homebrew安装，或者是通过 claude install 改成 native 安装的(nodejs不爱，homebrew不管😂)，这么写
where claude //根据返回结果 rm
rm ~/.local/bin/claude        //通常安装在这里，是一个引用
rm -rf ~/.local/share/claude  //通常安装在这里，是历史版本真实文件

如果是用nodejs 安装的，这么写
npm uninstall -g @anthropic-ai/claude-code
全局卸载 npm 包
如果卸载时提示冲突或错误，手动去 node_module 文件夹下删除 claude-code 文件夹
比如我的路径在 /opt/homebrew/lib/node_modules/@anthropic-ai

然后执行
npm cache clean --force
彻底清理 npm 的缓存


步骤2、彻底清理 ClaudeCode 的配置文件

要清理3个地方
1、
~/.claude.json 文件，保存的是 claude code 记录的全局配置信息
清理命令
cp ~/.claude.json.bak //不放心的，清理前备份
rm ~/.claude.json

2、
~/.claude 文件夹，保存的是 claude code 的详细历史记录
清理命令
cp -r ~/.claude ~/.claude.bak //不放心的，清理前备份
rm -rf ~/.claude

3、
项目级的claudecode配置文件，在项目文件夹的根目录
${projectPath}/.claude
这么写
rm -rf ${projectPath}/.claude/

呼
世界清净了，可以重新安装 claude code 了


官方现在推荐用原生安装方式，不需要再依赖 nodejs，自动更新更加稳定
一行命令安装完毕
brew install --cask claude-code


参考官方文档
https://code.claude.com/docs/en/setup
有些文档没写清楚或者散落的信息，通过Assistant可以方便问到


描述
ClaudeCode被玩坏了怎么办？2个步骤3处文件清理重装，世界清净了！


