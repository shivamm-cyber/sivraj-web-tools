import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APP_TSX_PATH = path.join(__dirname, '../src/App.tsx');
const BLOG_POSTS_PATH = path.join(__dirname, '../src/data/blogPosts.ts');
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
const BASE_URL = 'https://sivraj.in';

async function generateSitemap() {
  console.log('Generating sitemap...');
  
  // 1. Get static routes from App.tsx
  const appTsxContent = fs.readFileSync(APP_TSX_PATH, 'utf-8');
  const pathRegex = /path:\s*'([^']+)'/g;
  const staticPaths = ['/']; // Always include home
  let match;
  while ((match = pathRegex.exec(appTsxContent)) !== null) {
    staticPaths.push(match[1]);
  }

  // 2. Add /blog index
  staticPaths.push('/blog');

  // 3. Get dynamic blog routes
  let blogSlugs = [];
  try {
    if (fs.existsSync(BLOG_POSTS_PATH)) {
      const blogContent = fs.readFileSync(BLOG_POSTS_PATH, 'utf-8');
      const slugRegex = /slug:\s*'([^']+)'/g;
      while ((match = slugRegex.exec(blogContent)) !== null) {
        blogSlugs.push(match[1]);
      }
    }
  } catch (e) {
    console.warn('Could not read blog posts for sitemap generation.', e);
  }

  // 4. Generate XML
  const date = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static URLs
  for (const p of staticPaths) {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${p}</loc>\n`;
    xml += `    <lastmod>${date}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${p === '/' ? '1.0' : '0.8'}</priority>\n`;
    xml += `  </url>\n`;
  }

  // Blog Post URLs
  for (const slug of blogSlugs) {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/blog/${slug}</loc>\n`;
    xml += `    <lastmod>${date}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  fs.writeFileSync(SITEMAP_PATH, xml);
  console.log(`Sitemap generated with ${staticPaths.length + blogSlugs.length} URLs at public/sitemap.xml`);
}

generateSitemap();
