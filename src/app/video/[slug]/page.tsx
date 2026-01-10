import { getPost } from "@/lib/content";
import ReactMarkdown from "react-markdown";
import styles from "../../post.module.css";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function VideoPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPost('video', decodeURIComponent(slug));

  if (!post) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>← BACK_TO_BASE</Link>
      
      <header className={styles.header}>
        <h1 className={`${styles.title} neon-text`}>{post.title || post.slug}</h1>
        <div className={styles.meta}>
          <span>VIDEO_SCRIPT_LOG: {post.slug}</span>
          {post.day && <span style={{ marginLeft: '1rem' }}>DAY: {post.day}</span>}
        </div>
      </header>

      <article className={styles.content}>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </div>
  );
}
