import { SITE_NAME, CONTACT, SITE_URL } from '@/lib/constants';

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: SITE_NAME,
    description: 'Anamur merkezde premium erkek kuaförü ve berber hizmetleri.',
    url: SITE_URL,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address,
      addressLocality: 'Anamur',
      addressRegion: 'Mersin',
      addressCountry: 'TR',
    },
    areaServed: [
      { '@type': 'City', name: 'Anamur' },
      { '@type': 'City', name: 'Bozyazı' },
    ],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '20:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '18:00' },
    ],
    priceRange: '₺₺',
    sameAs: [CONTACT.instagram, CONTACT.facebook],
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function getFAQSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function getServiceSchema(service: { name: string; description: string; price: number }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    description: service.description,
    provider: {
      '@type': 'HairSalon',
      name: SITE_NAME,
    },
    areaServed: 'Anamur, Mersin',
    offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'TRY',
    },
  };
}

export function getArticleSchema(article: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
  };
}
