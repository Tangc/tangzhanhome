import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import styles from './page.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '文章归档 | 唐斩',
  description: '唐斩关于 AI 编程、Agent、OpenCode、OpenClaw 和个人 AI-Native 转型的文章归档。',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: '文章归档 | 唐斩',
    description: '唐斩关于 AI 编程、Agent、OpenCode、OpenClaw 和个人 AI-Native 转型的文章归档。',
    url: '/blog',
    siteName: 'Tang Zhan',
    locale: 'zh_CN',
    type: 'website',
  },
};

export default function BlogIndex() {
  const allPosts = getSortedPostsData();

  // Group posts by year
  const postsByYear = allPosts.reduce((acc, post) => {
    const year = post.date.split('-')[0];
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {} as Record<string, typeof allPosts>);

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="container" style={{ marginTop: '80px', marginBottom: '80px' }}>
      <Link href="/" className={styles.backLink}>
        <span aria-hidden="true">←</span> RETURN_HOME
      </Link>

      <header className={styles.header}>
        <h1 className="mono text-red">LOGS_ARCHIVE</h1>
        <p className={styles.subtitle}>{allPosts.length} ENTRIES FOUND</p>
      </header>

      <div className={styles.timeline}>
        {years.map(year => (
          <div key={year} className={styles.yearGroup}>
            <h2 className={`${styles.yearLabel} mono`}>{year}</h2>
            <ul className={styles.postList}>
              {postsByYear[year].map(({ id, date, title, category }) => (
                <li key={id} className={styles.postItem}>
                  <span className={`${styles.date} mono`}>{date.slice(5)}</span>
                  <span className={styles.category}>[{category || 'MISC'}]</span>
                  <Link href={`/blog/${id}`} className={styles.title}>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
