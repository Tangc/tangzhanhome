import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'public/published/posts');
const postsManifestPath = path.join(process.cwd(), 'public/published/posts-manifest.json');

type PostMatter = {
  date?: string;
  title?: string;
  category?: string;
  excerpt?: string;
  sourceFile?: string;
};

type PostManifestEntry = {
  id: string;
  fileName: string;
  date: string;
  title: string;
  category: string;
  excerpt: string;
  sourceFile: string;
  sourcePath?: string;
  sourceSha256?: string;
};

type PostManifest = {
  schemaVersion: 1;
  sourceRoot: string;
  total: number;
  posts: PostManifestEntry[];
};

export interface PostData {
  id: string;
  date: string;
  title: string;
  category: string;
  excerpt: string;
  sourceFile?: string;
  sourcePath?: string;
  sourceSha256?: string;
  contentHtml?: string;
}

function normalizeDate(value: unknown, fallback: string): string {
  if (typeof value !== 'string' && !(value instanceof Date)) {
    return fallback;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? fallback
    : date.toISOString().split('T')[0];
}

function extractDateFromId(id: string): string {
  const match = id.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : '1970-01-01';
}

function extractTitle(content: string, fallback: string): string {
  const firstHeading = content
    .split('\n')
    .find((line) => line.trim().startsWith('# '));

  return firstHeading ? firstHeading.replace(/^#\s+/, '').trim() : fallback;
}

function removeLeadingTitle(content: string): string {
  return content.replace(/^#\s+.+(?:\r?\n)+/, '');
}

function toPlainText(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/[*_`~|>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractExcerpt(content: string, fallback: string): string {
  const body = removeLeadingTitle(content)
    .replace(/^(?:>\s?.*(?:\r?\n)?)+/, '')
    .trim();
  const plainText = toPlainText(body);
  if (!plainText) {
    return fallback;
  }

  return plainText.length > 150 ? `${plainText.slice(0, 150)}...` : plainText;
}

function readPostsManifest(): Map<string, PostManifestEntry> {
  if (!fs.existsSync(postsManifestPath)) {
    return new Map();
  }

  const manifest = JSON.parse(fs.readFileSync(postsManifestPath, 'utf8')) as PostManifest;
  return new Map(manifest.posts.map((post) => [post.fileName, post]));
}

function toPostData(fileName: string, fileContents: string): PostData {
  const manifestEntry = readPostsManifest().get(fileName);
  if (manifestEntry) {
    return {
      id: manifestEntry.id,
      date: normalizeDate(manifestEntry.date, extractDateFromId(manifestEntry.id)),
      title: manifestEntry.title,
      category: manifestEntry.category,
      excerpt: manifestEntry.excerpt,
      sourceFile: manifestEntry.sourceFile,
      sourcePath: manifestEntry.sourcePath,
      sourceSha256: manifestEntry.sourceSha256,
    };
  }

  const id = fileName.replace(/\.md$/, '');
  const matterResult = matter(fileContents);
  const data = matterResult.data as PostMatter;
  const fallbackDate = extractDateFromId(id);

  return {
    id,
    date: normalizeDate(data.date, fallbackDate),
    title: data.title || extractTitle(matterResult.content, id),
    category: data.category || 'thought',
    excerpt: data.excerpt || extractExcerpt(matterResult.content, id),
    sourceFile: data.sourceFile,
  };
}

export function getSortedPostsData(): PostData[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const manifest = readPostsManifest();

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const manifestEntry = manifest.get(fileName);

      if (manifestEntry) {
        return {
          id: manifestEntry.id,
          date: normalizeDate(manifestEntry.date, extractDateFromId(manifestEntry.id)),
          title: manifestEntry.title,
          category: manifestEntry.category,
          excerpt: manifestEntry.excerpt,
          sourceFile: manifestEntry.sourceFile,
          sourcePath: manifestEntry.sourcePath,
          sourceSha256: manifestEntry.sourceSha256,
        };
      }

      return toPostData(fileName, fileContents);
    })
    .sort((a, b) => {
      if (a.date !== b.date) {
        return a.date < b.date ? 1 : -1;
      }

      return a.title.localeCompare(b.title, 'zh-CN');
    });
}

export function getRecentPostsData(limit = 3): PostData[] {
  return getSortedPostsData().slice(0, limit);
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(removeLeadingTitle(matterResult.content));

  return {
    ...toPostData(`${id}.md`, fileContents),
    contentHtml: processedContent.toString(),
  };
}
