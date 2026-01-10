大家好，我是唐斩，分享50个VibeCoding技巧
第二个 ClaudeCode 接 飞书 实时通知

你是不是遇到过这样的情况，本想让ClaudeCode干活，结果切换出去1小时回来。
发现它停在第一步问你要权限？（夸张表情）白白等了一个小时！
（演示ClaudeCode卡在权限询问界面） 

其实 ClaudeCode 提供了 Hooks 能力可以解决这个问题。
Hooks 有9个事件可以添加自定义回调，
其中 notification 就是弹窗向你申请权限时，stop是一次命令执行完时。
hooks配置在 .claude 文件夹下的 settings.json 里，全局或者项目级都可以

看一个示例
"hooks": {
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "cat | jq -r '.session_id + \"-\" + .hook_event_name' | xargs -I {} /path/to/scripts/send_feishu.sh '{} 等你来确认'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "cat | jq -r '.session_id + \"-\" + .hook_event_name' | xargs -I {} /path/to/scripts/send_feishu.sh '{} 执行完了'"
          }
        ]
      }
    ]
  }

command 里就是要执行的动作，如果要系统发出提示音，就这么写
afplay /System/Library/Sounds/Funk.aiff
也可以换成自己录制的声音文件

如果要给自己发飞书消息，在飞书开放平台创建应用，获取权限，然后用脚本调用
/path/to/scripts/send_feishu.sh '执行完了'

我这里有测试好的 send_feishu.sh ，需要的私聊我发你。
其他像钉钉、slack、邮件、短信都是类似的实现方式。

从此以后，你就可以安心切换出去做别的事情，再也不用担心白白等待了！ 结尾（5秒） 
这个技巧你学会了吗？赶紧试试吧！




我被Claude骗了8小时！
ClaudeCode最坑人的设计！90%的人都中招