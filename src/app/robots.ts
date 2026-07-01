import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/published/posts/'],
    },
    sitemap: 'https://www.tangzhanx.com/sitemap.xml',
    host: 'https://www.tangzhanx.com',
  };
}
