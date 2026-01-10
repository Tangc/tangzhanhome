import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostData {
  id: string;
  date: string;
  title: string;
  category?: string;
  contentHtml?: string;
  [key: string]: any;
}

export function getSortedPostsData(): PostData[] {
  // Create directory if it doesn't exist to prevent errors
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Validate date
    const date = matterResult.data.date ? new Date(matterResult.data.date).toISOString().split('T')[0] : '1970-01-01';

    return {
      id,
      ...matterResult.data,
      date,
      title: matterResult.data.title || 'Untitled',
    } as PostData;
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
    date: matterResult.data.date ? new Date(matterResult.data.date).toISOString().split('T')[0] : '1970-01-01',
    title: matterResult.data.title || 'Untitled',
  } as PostData;
}
