import Link from 'next/link';
import { Code } from 'lucide-react';
import { getRecentPostsData } from '@/lib/posts';
import AnimatedIntro from './AnimatedIntro';
import styles from './page.module.css';

export default function Home() {
  const recentPosts = getRecentPostsData(5);
  const portfolio = [
    { name: 'OpenCode CN', url: 'https://opencodecn.com', desc: 'AI Coding Hub', icon: <Code size={16} /> },
  ];

  return (
    <div className="container">
      <section className={styles.hero}>
        <AnimatedIntro />
      </section>

      <div className={styles.contentLayout}>
        <main className={styles.mainColumn}>
          {recentPosts.length > 0 && (
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                  <span className={`${styles.sectionLabel} mono`}>LATEST_WRITINGS</span>
                  <div className={styles.line}></div>
                  <Link href="/blog" className={`${styles.archiveLink} mono`}>
                    VIEW_ALL
                  </Link>
              </div>
              <div className={styles.postList}>
                {recentPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`} className={styles.postItem}>
                    <span className={`${styles.postDate} mono`}>{post.date}</span>
                    <span className={styles.postTitle}>{post.title}</span>
                    <span className={`${styles.postCategory} mono`}>[{post.category}]</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

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
        </main>

      </div>
    </div>
  );
}
