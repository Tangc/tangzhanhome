import styles from "./page.module.css";
import { getPosts } from "@/lib/content";

export default async function Home() {
  const shares = await getPosts('share');
  const videos = await getPosts('video');

  const works = [
    { title: "Opencode中文站", url: "https://opencodecn.com", desc: "Open source community hub" },
    { title: "宝宝粑师", url: "https://babypoo.tangzhanx.com", desc: "Baby health tracker" },
    { title: "MD转图片工具", url: "https://redimage.tangzhanx.com", desc: "Markdown to Image converter" },
    { title: "Banana2", url: "https://banana2.tangzhanx.com", desc: "Productivity tool" },
    { title: "文字生成工具", url: "https://www.bigtextgenerator.net/", desc: "Big text generator" },
  ];

  return (
    <div className="container">
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="mono" style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
            // TANG ZHAN
          </div>
          <h1 className={`${styles.title} hero-gradient`}>
            ARCHITECT OF<br />
            INTELLIGENCE
          </h1>
          <p className={styles.subtitle}>
            13-year Backend Veteran transitioning to AI Agent Orchestrator.
            <br />
            Believer in "Language is Thought". Building the future with AI.
          </p>
          
          <div className={styles.stats}>
            <span>System: ONLINE</span>
            <span>Location: CYBERSPACE</span>
            <span>Mode: AGENTIC</span>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>WORKS</h2>
          <div className={styles.grid}>
            {works.map((work) => (
              <a key={work.title} href={work.url} target="_blank" className={styles.card} rel="noopener noreferrer">
                <h3 className={`${styles.cardTitle} neon-text`}>{work.title}</h3>
                <p className={styles.cardDesc}>{work.desc}</p>
                <div className="mono" style={{ marginTop: 'auto', fontSize: '0.8rem', color: 'var(--secondary)' }}>
                  {'>'} VISIT_LINK
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>THOUGHTS_STREAM</h2>
          <div className={styles.list}>
            {shares.slice(0, 10).map((post) => (
              <a key={post.filename} href={`/share/${post.slug}`} className={styles.listItem}>
                <span>{post.title || post.slug}</span>
                <span className={styles.listDate}>{post.day ? `DAY ${post.day}` : 'LOG'}</span>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>VISUAL_LOGS</h2>
          <div className={styles.list}>
            {videos.slice(0, 10).map((post) => (
              <a key={post.filename} href={`/video/${post.slug}`} className={styles.listItem}>
                <span>{post.title || post.slug}</span>
                <span className={styles.listDate}>{post.day ? `DAY ${post.day}` : 'LOG'}</span>
              </a>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <p className="mono">CONTACT_SIGNAL: ESTABLISHED</p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="https://github.com/tangzhanx" target="_blank">GITHUB</a>
            <a href="https://twitter.com/tangzhanx" target="_blank">X / TWITTER</a>
          </div>
          <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#444' }}>
            © 2026 TANG ZHAN. DEPLOYED ON VERCEL.
          </p>
        </footer>
      </main>
    </div>
  );
}
