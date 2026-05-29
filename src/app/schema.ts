import { SITE_NAME, CONTACT, SITE_URL } from '@/lib/constants';

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: SITE_NAME,
    description: 'Premium erkek kuaförü',
    url: SITE_URL,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address,
      addressCountry: 'TR',
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '20:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '18:00' },
    ],
    priceRange: '₺₺',
    sameAs: [CONTACT.instagram, CONTACT.facebook],
  };
}
