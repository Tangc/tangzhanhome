import { getPostData, getSortedPostsData } from '@/lib/posts';
import TerminalContainer from '@/components/TerminalContainer';
import styles from './page.module.css';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const post = await getPostData(resolvedParams.id);
  return {
    title: `${post.title} | Tang Zhan`,
    description: post.excerpt || `A thought by Tang Zhan on ${post.date}`,
  };
}

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.id);

  return (
    <article className="container" style={{ marginTop: '60px', marginBottom: '100px' }}>
      <Link href="/blog" className={styles.backLink}>
        <ArrowLeft size={16} /> RETURN_TO_LOGS
      </Link>

      <header className={styles.header}>
        <div className={styles.meta}>
            <span className={`${styles.date} mono`}>{postData.date}</span>
            <span className={styles.category}>[{postData.category || 'THOUGHT'}]</span>
        </div>
        <h1 className={styles.title}>{postData.title}</h1>
      </header>

      <TerminalContainer title={`READING: ${postData.id}`} className={styles.contentContainer}>
        <div 
            className={styles.markdown}
            dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} 
        />
      </TerminalContainer>
    </article>
  );
}
