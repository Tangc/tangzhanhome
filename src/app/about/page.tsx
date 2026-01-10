import TerminalContainer from '@/components/TerminalContainer';
import styles from './page.module.css';

export const metadata = {
  title: 'About | Tang Zhan',
  description: 'Identity: Senior Java Dev turned AI Native Programmer.',
};

export default function About() {
  return (
    <div className="container" style={{ marginTop: '80px', marginBottom: '80px' }}>
      <div className={styles.splitLayout}>
        {/* Left: Visual Identity */}
        <aside className={styles.sidebar}>
          <h1 className={`${styles.glitchName} mono`}>TANG_ZHAN</h1>
          <div className={styles.tags}>
            <span className={styles.tag}>#Java_Veteran_13y</span>
            <span className={styles.tag}>#AI_Native</span>
            <span className={styles.tag}>#Arrival_Philosophy</span>
          </div>
          <div className={styles.quoteBox}>
            <p className="mono">
              &quot;Language is thought. Code is cheap. Context is king.&quot;
            </p>
          </div>
        </aside>

        {/* Right: Deep Persona */}
        <main className={styles.mainContent}>
          <TerminalContainer title="IDENTITY_CORE" className={styles.section}>
            <h2 className={styles.sectionHeader}>CORE_IDENTITY</h2>
            <p>
              拥有 13 年从业经验的资深后端程序员，曾长期在互联网大厂深耕。
              精通 Java (Spring Boot), Rust, Node.js 等技术栈。
              <br /><br />
              现转型为 <strong>技术自媒体人 & AI Native 布道者</strong>。
              目标是在 2026 年完成一套体系化的 AI 编程课程。
            </p>
          </TerminalContainer>

          <TerminalContainer title="PHILOSOPHY" className={styles.section}>
            <h2 className={styles.sectionHeader}>PHILOSOPHY: &quot;ARRIVAL&quot;</h2>
            <ul className={styles.list}>
              <li><strong>降临派</strong>: 坚信语言即思想。掌握 AI 的语言，即掌握未来的思维方式。</li>
              <li><strong>Agent 调度者</strong>: 程序员应从“古法编程”进化为 Agent 的架构师。</li>
              <li><strong>核心观点</strong>: 代码正在贬值。未来衡量能力的标准是“同时调动 Agent 的数量”以及“定义场景、解决问题的能力”。</li>
            </ul>
          </TerminalContainer>

          <TerminalContainer title="STACK & PREFERENCES" className={styles.section}>
             <h2 className={styles.sectionHeader}>TECH_STACK</h2>
             <div className={styles.stackGrid}>
                <div className={styles.stackItem}>
                    <span className={styles.stackLabel}>AI Tools</span>
                    <span>Claude Code, OpenCode, Gemini</span>
                </div>
                <div className={styles.stackItem}>
                    <span className={styles.stackLabel}>Core</span>
                    <span>Java, Rust, TypeScript</span>
                </div>
                <div className={styles.stackItem}>
                    <span className={styles.stackLabel}>Hardware</span>
                    <span>TPU/GPU Architecture, Local LLMs</span>
                </div>
             </div>
          </TerminalContainer>
        </main>
      </div>
    </div>
  );
}
