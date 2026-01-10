import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';
import matter from 'gray-matter';

// Configuration
const SOURCE_DIRS = [
  { path: '/Users/tangchao/Documents/tangzhanx/share', category: 'thought' },
  { path: '/Users/tangchao/Documents/tangzhanx/video', category: 'script' }
];
const DEST_DIR = join(process.cwd(), 'content', 'posts');

// Helper: Extract date from filename (e.g., "20260108_D127E145.md" -> "2026-01-08")
function extractDateFromFilename(filename: string): string {
  const match = filename.match(/^(\d{4})(\d{2})(\d{2})/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  // Fallback: Use today's date if pattern doesn't match
  return new Date().toISOString().split('T')[0];
}

// Helper: Recursive directory walk
async function getFiles(dir: string): Promise<string[]> {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = join(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

async function syncContent() {
  console.log('🚀 Starting content sync...');
  
  // Ensure destination exists
  await mkdir(DEST_DIR, { recursive: true });

  for (const source of SOURCE_DIRS) {
    console.log(`📂 Scanning ${source.path}...`);
    try {
      const files = await getFiles(source.path);
      const mdFiles = files.filter(f => extname(f) === '.md');
      
      console.log(`   Found ${mdFiles.length} Markdown files.`);

      for (const filePath of mdFiles) {
        const fileName = basename(filePath);
        const fileContent = await readFile(filePath, 'utf-8');
        
        // Parse existing frontmatter
        const { data: existingData, content } = matter(fileContent);
        
        // Determine Metadata
        const date = existingData.date || extractDateFromFilename(fileName);
        
        // Title logic: Use frontmatter title OR first h1 (# ) OR filename
        let title = existingData.title;
        if (!title) {
          const firstLine = content.split('\n').find(line => line.trim().startsWith('# '));
          title = firstLine ? firstLine.replace('# ', '').trim() : fileName.replace('.md', '');
        }

        // Construct new frontmatter
        const newFrontmatter = {
          title,
          date,
          category: source.category,
          originalPath: filePath,
          ...existingData // Preserve other existing keys
        };

        const newFileContent = matter.stringify(content, newFrontmatter);
        
        // Destination filename: date-slug.md
        const slug = fileName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const destPath = join(DEST_DIR, `${date}-${slug}.md`);
        
        await writeFile(destPath, newFileContent);
        console.log(`   ✅ Synced: ${title} -> ${basename(destPath)}`);
      }
    } catch (error) {
      console.error(`   ❌ Error scanning ${source.path}:`, error);
    }
  }
  
  console.log('✨ Content sync complete!');
}

syncContent().catch(console.error);
