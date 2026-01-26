import Image from 'next/image';
import TerminalContainer from '@/components/TerminalContainer';
import { Code } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  const portfolio = [
    { name: 'OpenCode CN', url: 'https://opencodecn.com', desc: 'AI Coding Hub', icon: <Code size={16} /> },
  ];

  return (
    <div className="container">
      {/* Compact Header: Avatar + Identity */}
      <header className={styles.header}>
        <div className={styles.profileRow}>
            <div className={styles.avatarWrapper}>
                <Image 
                    src="/images/avatar.png" 
                    alt="Tang Zhan" 
                    width={80} 
                    height={80} 
                    className={styles.avatar}
                    priority
                />
            </div>
            <div className={styles.identity}>
                <h1 className={`${styles.name} mono`}>唐斩 / TANG ZHAN</h1>
                <p className={styles.role}>
                    13年资深架构师 <span className="text-red">➜</span> AI 原生 Agent 开发者
                </p>
                <div className={styles.tags}>
                    <span>#降临派</span>
                    <span>#Agent调度者</span>
                </div>
            </div>
        </div>
      </header>

      {/* Hero Value Proposition - HUGE & IMPACTFUL */}
      <section className={styles.valueSection}>
        <div className={styles.hugeSlogan}>
            <p>我能帮助你 </p>
            <p className="text-red">在 AI 时代，成功转型</p>
            <p>用 <span className="text-cyan">Agent Skill</span> ，成为超级个体</p>
        </div>
      </section>

      {/* Projects Grid - Compact */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
            <span className={`${styles.sectionLabel} mono`}>DEPLOYED_SYSTEMS</span>
            <div className={styles.line}></div>
        </div>
        <div className={styles.grid}>
          {portfolio.map((item) => (
            <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
              <div className={styles.miniCard}>
                <div className={styles.miniCardHeader}>
                    {item.icon}
                    <span className={styles.miniCardTitle}>{item.name}</span>
                </div>
                <div className={styles.miniCardDesc}>{item.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
