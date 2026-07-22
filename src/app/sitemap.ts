import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { getAllBlogSlugs } from '@/lib/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/appointment',
    '/services',
    '/prices',
    '/about',
    '/contact',
    '/blog',
    '/anamur-berber',
    '/bozyazi-berber',
    '/privacy',
    '/cookies',
    '/kvkk',
    '/terms',
  ];

  const highPriority = ['', '/anamur-berber'];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: highPriority.includes(route) ? 1 : route === '/appointment' ? 0.9 : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
