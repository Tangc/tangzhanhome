import { createHash } from 'node:crypto';
import {
  copyFile,
  mkdir,
  readdir,
  readFile,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import { basename, extname, join, relative, sep } from 'node:path';

const SOURCE_ROOT = '/Users/tangchao/Documents/tangzhanx/share';
const DEST_DIR = join(process.cwd(), 'public', 'published', 'posts');
const MANIFEST_PATH = join(process.cwd(), 'public', 'published', 'posts-manifest.json');

type DateStatus = 'filename' | 'parent-directory' | 'file-mtime';
type TitleStatus = 'source-heading' | 'generated';

type ManifestEntry = {
  id: string;
  fileName: string;
  title: string;
  titleStatus: TitleStatus;
  date: string;
  dateStatus: DateStatus;
  category: string;
  excerpt: string;
  sourceFile: string;
  sourcePath: string;
  sourceSha256: string;
};

type Manifest = {
  schemaVersion: 1;
  sourceRoot: string;
  total: number;
  posts: ManifestEntry[];
};

function isMarkdownFile(fileName: string) {
  return ['.md', '.markdown'].includes(extname(fileName).toLowerCase());
}

function isValidDate(year: string, month: string, day: string) {
  const iso = `${year}-${month}-${day}`;
  const date = new Date(`${iso}T00:00:00.000Z`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.getUTCFullYear() === Number(year) &&
    date.getUTCMonth() + 1 === Number(month) &&
    date.getUTCDate() === Number(day)
  );
}

function formatDate(year: string, month: string, day: string) {
  return `${year}-${month}-${day}`;
}

async function findMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries
      .filter((entry) => !entry.name.startsWith('.'))
      .map(async (entry) => {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          return findMarkdownFiles(fullPath);
        }

        return entry.isFile() && isMarkdownFile(entry.name) ? [fullPath] : [];
      }),
  );

  return files.flat().sort();
}

async function extractDate(sourcePath: string): Promise<{ date: string; status: DateStatus }> {
  const fileName = basename(sourcePath);
  const fullDate = fileName.match(/^(\d{4})(\d{2})(\d{2})/);
  if (fullDate && isValidDate(fullDate[1], fullDate[2], fullDate[3])) {
    return { date: formatDate(fullDate[1], fullDate[2], fullDate[3]), status: 'filename' };
  }

  const shortDate = fileName.match(/^(\d{2})(\d{2})/);
  const parentMonth = sourcePath.match(/\/(\d{6})\//);
  if (shortDate && parentMonth) {
    const year = parentMonth[1].slice(0, 4);
    const month = shortDate[1];
    const day = shortDate[2];
    if (isValidDate(year, month, day)) {
      return { date: formatDate(year, month, day), status: 'parent-directory' };
    }
  }

  const sourceStat = await stat(sourcePath);
  return {
    date: sourceStat.mtime.toISOString().slice(0, 10),
    status: 'file-mtime',
  };
}

function toSlug(sourcePath: string) {
  return basename(sourcePath, extname(sourcePath))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function stripMarkdown(value: string) {
  return value
    .replace(/^#{1,6}\s+/, '')
    .replace(/^>\s?/, '')
    .replace(/^[-*+]\s+/, '')
    .replace(/^\d+[、.)]\s*/, '')
    .replace(/!\[[^\]]*]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/[*_`~|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isGenericTitleCandidate(value: string) {
  const normalized = value.trim();
  if (!normalized) return true;
  if (/^https?:\/\//i.test(normalized)) return true;
  if (/^唐斩的第\s*\d+\s*天第\s*\d+\s*篇分享/.test(normalized)) return true;
  if (/^(?:分享|跟一个分享|分享一则)?\s*(?:\d{8}\s*)?D\d+E\d+$/i.test(normalized)) return true;
  if (/^(?:分享|跟一个分享|分享一则)\s*$/i.test(normalized)) return true;
  if (/^D\d+E\d+$/i.test(normalized)) return true;
  if (/^\d+[、.)]?$/.test(normalized)) return true;

  return false;
}

function trimTitle(value: string) {
  return value.length > 42 ? `${value.slice(0, 42)}...` : value;
}

function extractTitle(markdown: string, fallback: string): { title: string; status: TitleStatus } {
  const heading = markdown
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.startsWith('# '));

  if (heading) {
    return { title: stripMarkdown(heading), status: 'source-heading' };
  }

  const candidate = markdown
    .split(/\r?\n/)
    .map(stripMarkdown)
    .find((line) => !isGenericTitleCandidate(line) && line.length >= 6);

  return {
    title: candidate ? trimTitle(candidate) : fallback,
    status: 'generated',
  };
}

function toPlainText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/\r?\n/)
    .map(stripMarkdown)
    .filter((line) => !isGenericTitleCandidate(line))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractExcerpt(markdown: string, fallback: string) {
  const plainText = toPlainText(markdown);
  if (!plainText) return fallback;

  return plainText.length > 150 ? `${plainText.slice(0, 150)}...` : plainText;
}

function sha256(content: Buffer) {
  return createHash('sha256').update(content).digest('hex');
}

function sourceRelativePath(sourcePath: string) {
  return relative(SOURCE_ROOT, sourcePath).split(sep).join('/');
}

async function clearGeneratedPosts() {
  await mkdir(DEST_DIR, { recursive: true });
  const entries = await readdir(DEST_DIR, { withFileTypes: true });
  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && isMarkdownFile(entry.name))
      .map((entry) => rm(join(DEST_DIR, entry.name))),
  );
}

async function buildManifestEntry(sourcePath: string): Promise<ManifestEntry> {
  const sourceBuffer = await readFile(sourcePath);
  const markdown = sourceBuffer.toString('utf8');
  const { date, status: dateStatus } = await extractDate(sourcePath);
  const sourceFile = sourceRelativePath(sourcePath);
  const id = `${date}-${toSlug(sourcePath)}`;
  const fileName = `${id}.md`;
  const fallbackTitle = `唐斩分享 ${date} ${basename(sourcePath, extname(sourcePath))}`;
  const { title, status: titleStatus } = extractTitle(markdown, fallbackTitle);

  return {
    id,
    fileName,
    title,
    titleStatus,
    date,
    dateStatus,
    category: 'thought',
    excerpt: extractExcerpt(markdown, title),
    sourceFile,
    sourcePath: sourceFile,
    sourceSha256: sha256(sourceBuffer),
  };
}

async function syncAll() {
  const sourceFiles = await findMarkdownFiles(SOURCE_ROOT);
  await clearGeneratedPosts();

  const posts: ManifestEntry[] = [];
  for (const sourcePath of sourceFiles) {
    const entry = await buildManifestEntry(sourcePath);
    await copyFile(sourcePath, join(DEST_DIR, entry.fileName));
    posts.push(entry);
  }

  const manifest: Manifest = {
    schemaVersion: 1,
    sourceRoot: 'tangzhanx/share',
    total: posts.length,
    posts,
  };

  await writeFile(`${MANIFEST_PATH}.tmp`, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  await rm(MANIFEST_PATH, { force: true });
  await copyFile(`${MANIFEST_PATH}.tmp`, MANIFEST_PATH);
  await rm(`${MANIFEST_PATH}.tmp`);

  const generatedTitles = posts.filter((post) => post.titleStatus === 'generated').length;
  const inferredDates = posts.filter((post) => post.dateStatus === 'file-mtime').length;

  console.log(`Synced ${posts.length} posts from ${SOURCE_ROOT}`);
  console.log(`Generated titles: ${generatedTitles}`);
  console.log(`Fallback dates from file mtime: ${inferredDates}`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
}

syncAll().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
