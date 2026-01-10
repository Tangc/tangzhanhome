import React from 'react';
import { motion } from 'framer-motion';
import { Github, Globe, Video, Terminal, ExternalLink, Cpu, Brain, Zap } from 'lucide-react';

const projects = [
  {
    name: "OpenCode 中文站",
    url: "https://opencodecn.com",
    desc: "OpenCode 官方中文社区，连接 AI 编程开发者。",
    tags: ["Community", "AI Programming"]
  },
  {
    name: "宝宝粑师",
    url: "https://babypoo.tangzhanx.com",
    desc: "关注宝宝健康，用 AI 解决育儿难题。",
    tags: ["Health", "AI Agent"]
  },
  {
    name: "md转图片工具",
    url: "https://redimage.tangzhanx.com",
    desc: "极简的 Markdown 转图片工具，为分享而生。",
    tags: ["Tools", "Utility"]
  },
  {
    name: "banana2",
    url: "https://banana2.tangzhanx.com",
    desc: "下一代效率工具，让想法快速落地。",
    tags: ["Efficiency", "AI"]
  },
  {
    name: "文字生成工具",
    url: "https://www.bigtextgenerator.net/",
    desc: "专业文字艺术生成，满足各种创意需求。",
    tags: ["Creativity", "Design"]
  }
];

const blogPosts = [
  {
    title: "程序员的 AI 编程场景之改造开源项目",
    date: "2026-01-06",
    excerpt: "利用 AI 改造开源项目，是程序员上手 AI 编程最好的场景之一。在有参考的情况下，AI 的编程能力会更强...",
    tag: "Case Study"
  },
  {
    title: "2026年，衡量程序员能力的唯一标准：你同时操控的 Agent 数量",
    date: "2026-01-04",
    excerpt: "如果你对 AI 编程的理解还停留在“单窗口问答”或“代码补全”，你可能已经站在了“斩杀线”的边缘。",
    tag: "Paradigm Shift"
  },
  {
    title: "用 ClaudeCode 的 subagent 组建你的研发团队",
    date: "2026-01-01",
    excerpt: "你是否想过，假如有 5 个自己，可以同时开发 5 个需求，拿 5 份工资美滋滋？利用 SubAgent 实现影分身。",
    tag: "Workflow"
  }
];

const videos = [
  {
    title: "AI 编程进阶：从打工人到调度官",
    platform: "Bilibili / TikTok",
    views: "10k+",
    desc: "揭秘 2026 年程序员的核心竞争力。"
  },
  {
    title: "Claude Code 实战：半小时开发后台系统",
    platform: "Youtube",
    views: "5k+",
    desc: "演示如何通过 SubAgent 自动化全栈流程。"
  }
];

const App = () => {
  return (
    <div className="min-h-screen font-sans bg-background text-foreground">
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-mono font-bold text-xl tracking-tighter">
            TANG<span className="text-accent">ZHAN</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-accent transition-colors">关于</a>
            <a href="#projects" className="hover:text-accent transition-colors">作品</a>
            <a href="#garden" className="hover:text-accent transition-colors">数字花园</a>
            <a href="#arrivalist" className="hover:text-accent transition-colors">降临派</a>
          </div>
        </div>
      </nav>

      <main>
        <section id="about" className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-accent font-mono mb-4">资深后端程序员 & 内容创作者</h2>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Agent 的调度者<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
                  与架构师
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
                13年互联网大厂深耕，从 Java 古法编程进化到 AI Native 架构。
                坚信“语言即思想”，致力于定义场景、解决问题，调动 Agent 释放商业价值。
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#garden" className="bg-accent hover:bg-accent-dark px-8 py-3 rounded-full font-bold transition-all glow text-center min-w-[140px]">
                  阅读分享
                </a>
                <a href="#projects" className="glass px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all text-center min-w-[140px]">
                  查看作品
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white/5">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                <Terminal size={24} />
              </div>
              <h3 className="text-xl font-bold">13年后端沉淀</h3>
              <p className="text-gray-400">精通 Java, Rust, Node.js 生态。在大厂锤炼出的底层架构能力，是调度 Agent 的地基。</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-500">
                <Brain size={24} />
              </div>
              <h3 className="text-xl font-bold">AI Native 思维</h3>
              <p className="text-gray-400">拒绝古法，拥抱变革。代码正在变得廉价，未来衡量标准是同时调动 Agent 的数量。</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold">商业价值导向</h3>
              <p className="text-gray-400">结果导向，效果第一。利用 AI 把个人团队化，在真实业务场景中创造可感知的收益。</p>
            </div>
          </div>
        </section>

        <section id="projects" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
              作品集 <span className="text-sm font-mono text-gray-500 font-normal">SELECTED WORKS</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <motion.a
                  key={i}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  className="glass p-8 rounded-2xl group relative overflow-hidden block h-full"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={20} className="text-accent" />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono border border-white/10 px-2 py-1 rounded text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{project.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.desc}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section id="garden" className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">数字花园</h2>
                <p className="text-gray-500 font-mono text-sm">LEARNING, PRACTICING, SHARING</p>
              </div>
              <a href="#" className="text-accent text-sm font-bold flex items-center gap-2 hover:underline">
                阅读全部 <ExternalLink size={14} />
              </a>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="flex flex-col glass p-6 rounded-2xl"
                >
                  <div className="text-[10px] font-mono text-accent mb-2">{post.date} — {post.tag}</div>
                  <h3 className="text-xl font-bold mb-3 hover:text-accent transition-colors cursor-pointer leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  <button className="text-xs font-bold border-b border-accent w-max pb-1 hover:text-accent transition-colors">
                    READ MORE
                  </button>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
              短视频系列 <span className="text-sm font-mono text-gray-500 font-normal">VIDEO SERIES</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {videos.map((video, i) => (
                <div key={i} className="glass p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-center">
                  <div className="w-full sm:w-32 h-20 bg-accent/20 rounded-lg flex items-center justify-center text-accent shrink-0">
                    <Video size={32} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-500 mb-1 uppercase tracking-wider">{video.platform} • {video.views} VIEWS</div>
                    <h3 className="text-lg font-bold mb-1 group-hover:text-accent transition-colors">{video.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{video.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="arrivalist" className="py-24 px-6 bg-gradient-to-b from-transparent to-accent/5">
          <div className="max-w-4xl mx-auto glass p-8 md:p-16 rounded-3xl text-center">
            <div className="inline-block p-4 rounded-full bg-accent/20 text-accent mb-8">
              <Globe size={40} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 italic tracking-tight">“降临派” 技术哲学</h2>
            <p className="text-lg md:text-xl text-gray-300 leading-loose">
              自认为是“降临派”，坚信语言即思想。代码正在从逐行编写进化为意图描述。
              程序员不应死守着“古法编程”的尊严，而应进化为 **Agent 的调度者与架构师**。
              在 2026 年，衡量一个技术人的上限，是他定义场景的能力，以及背后同时协同工作的 Agent 数量。
            </p>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-white/5 bg-background">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-mono font-bold text-xl tracking-tighter">
            TANG<span className="text-accent">ZHAN</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-gray-400 hover:text-white transition-all transform hover:scale-110"><Github size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-all transform hover:scale-110"><Video size={24} /></a>
          </div>
          <div className="text-gray-500 text-sm font-mono">
            © 2026 Tang Zhan. Built with AI Native mindset.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
