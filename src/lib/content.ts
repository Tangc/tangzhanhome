import fs from 'fs';
import path from 'path';

export interface Post {
  slug: string;
  filename: string;
  title: string;
  day?: string;
  intro?: string;
  content: string;
  type: 'share' | 'video';
}

const contentDir = path.join(process.cwd(), 'src/content');

function parsePost(filename: string, content: string, type: 'share' | 'video'): Post {
  const lines = content.split('\n');
  let title = filename.replace('.md', '');
  let intro = '';
  let day = '';

  if (lines.length > 0) {
    intro = lines[0].trim();
    const dayMatch = intro.match(/第(\d+)天/);
    if (dayMatch) {
      day = dayMatch[1];
    }
  }

  const titleLine = lines.find(line => line.trim().startsWith('## '));
  if (titleLine) {
    title = titleLine.replace('## ', '').trim();
  }

  return {
    slug: filename.replace('.md', ''),
    filename,
    title,
    day,
    intro,
    content,
    type
  };
}

export async function getPosts(type: 'share' | 'video'): Promise<Post[]> {
  const dir = path.join(contentDir, type);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  
  const posts = files.map(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    return parsePost(file, content, type);
  });

  return posts.sort((a, b) => b.filename.localeCompare(a.filename));
}

export async function getPost(type: 'share' | 'video', slug: string): Promise<Post | null> {
  const dir = path.join(contentDir, type);
  const filePath = path.join(dir, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) return null;
  
  const content = fs.readFileSync(filePath, 'utf-8');
  return parsePost(`${slug}.md`, content, type);
}
