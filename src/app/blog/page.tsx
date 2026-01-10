import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import styles from './page.module.css';

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
