import Link from 'next/link';
import { Scissors, Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { SITE_NAME, CONTACT } from '@/lib/constants';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-800 bg-dark-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500">
                <Scissors size={18} className="text-dark-900" />
              </div>
              <span className="font-serif text-xl font-bold text-white">{SITE_NAME}</span>
            </div>
            <p className="text-sm text-dark-400 leading-relaxed">
              Premium erkek kuaförü. Modern berber deneyimi için doğru adresiniz.
            </p>
            <div className="flex gap-3">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-dark-800 text-dark-400 hover:bg-gold-500/10 hover:text-gold-400 transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-dark-800 text-dark-400 hover:bg-gold-500/10 hover:text-gold-400 transition-colors"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Sayfalar</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Ana Sayfa' },
                { href: '/appointment', label: 'Randevu Al' },
                { href: '/prices', label: 'Fiyat Listesi' },
                { href: '/about', label: 'Hakkımızda' },
                { href: '/blog', label: 'Berber Rehberi' },
                { href: '/anamur-berber', label: 'Anamur Berber' },
                { href: '/bozyazi-berber', label: 'Bozyazı Berber' },
                { href: '/contact', label: 'İletişim' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-dark-400 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Yasal</h3>
            <ul className="space-y-2">
              {[
                { href: '/privacy', label: 'Gizlilik Politikası' },
                { href: '/cookies', label: 'Çerez Politikası' },
                { href: '/kvkk', label: 'KVKK Metni' },
                { href: '/terms', label: 'Kullanım Koşulları' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-dark-400 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone size={15} className="mt-0.5 text-gold-500 shrink-0" />
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="text-sm text-dark-400 hover:text-white transition-colors"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="mt-0.5 text-gold-500 shrink-0" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-sm text-dark-400 hover:text-white transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 text-gold-500 shrink-0" />
                <span className="text-sm text-dark-400">{CONTACT.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-dark-800 pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <p className="text-xs text-dark-500">
            © {year} {SITE_NAME}. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
