import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/appointment',
    '/services',
    '/prices',
    '/about',
    '/contact',
    '/privacy',
    '/cookies',
    '/kvkk',
    '/terms',
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/appointment' ? 0.9 : 0.7,
  }));
}
