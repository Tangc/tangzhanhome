import { getPostData, getSortedPostsData } from '@/lib/posts';
import TerminalContainer from '@/components/TerminalContainer';
import styles from './page.module.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostData(resolvedParams.id);
  const url = `/blog/${post.id}`;

  return {
    title: `${post.title} | 唐斩`,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: 'Tang Zhan',
      locale: 'zh_CN',
      type: 'article',
      publishedTime: post.date,
      authors: ['Tang Zhan'],
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description: post.excerpt,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.id);
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: postData.title,
    description: postData.excerpt,
    datePublished: postData.date,
    dateModified: postData.date,
    inLanguage: 'zh-CN',
    author: {
      '@type': 'Person',
      name: 'Tang Zhan',
      url: 'https://www.tangzhanx.com/about',
    },
    publisher: {
      '@type': 'Person',
      name: 'Tang Zhan',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.tangzhanx.com/blog/${postData.id}`,
    },
  };

  return (
    <article className="container" style={{ marginTop: '60px', marginBottom: '100px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Link href="/blog" className={styles.backLink}>
        <span aria-hidden="true">←</span> RETURN_TO_LOGS
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
