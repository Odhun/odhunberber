import { Metadata } from 'next';
import { Phone, Mail, MapPin, Instagram, Facebook, Clock } from 'lucide-react';
import { CONTACT, SITE_NAME, DEFAULT_WORKING_HOURS } from '@/lib/constants';
import { DAY_NAMES_TR, type DayOfWeek } from '@/types';

export const metadata: Metadata = {
  title: 'İletişim',
  description: `${SITE_NAME} iletişim bilgileri. Anamur merkezdeki salonumuza ulaşın, randevu alın.`,
};

const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-gold-500 mb-3">İletişim</p>
          <h1 className="font-serif text-4xl font-bold text-white mb-4">Bize Ulaşın</h1>
          <p className="text-dark-400">Sorularınız için bize ulaşabilirsiniz</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            {[
              { icon: Phone, label: 'Telefon', value: CONTACT.phone, href: `tel:${CONTACT.phone}` },
              { icon: Mail, label: 'E-posta', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
              { icon: MapPin, label: 'Adres', value: CONTACT.address, href: CONTACT.mapLink, external: true },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="flex items-start gap-4 rounded-xl border border-dark-700 bg-dark-800 p-5 hover:border-gold-500/30 transition-colors group"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/10 text-gold-500 shrink-0">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="text-xs text-dark-500 mb-1">{item.label}</p>
                  <p className="text-white group-hover:text-gold-400 transition-colors">{item.value}</p>
                </div>
              </a>
            ))}

            <div className="flex gap-3">
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-dark-700 bg-dark-800 py-3 text-sm text-dark-400 hover:text-gold-400 transition-colors">
                <Instagram size={16} /> Instagram
              </a>
              <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-dark-700 bg-dark-800 py-3 text-sm text-dark-400 hover:text-gold-400 transition-colors">
                <Facebook size={16} /> Facebook
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-dark-700 bg-dark-800 overflow-hidden">
            <div className="flex items-center gap-2 border-b border-dark-700 px-5 py-4">
              <Clock size={16} className="text-gold-500" />
              <h2 className="font-semibold text-white">Çalışma Saatleri</h2>
            </div>
            <div className="divide-y divide-dark-700">
              {days.map((day) => {
                const hours = DEFAULT_WORKING_HOURS[day];
                return (
                  <div key={day} className="flex justify-between px-5 py-3">
                    <span className="text-sm text-dark-300">{DAY_NAMES_TR[day]}</span>
                    {hours.isOpen ? (
                      <span className="text-sm text-dark-400">{hours.openTime} — {hours.closeTime}</span>
                    ) : (
                      <span className="text-sm text-dark-600">Kapalı</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-dark-700 bg-dark-800 overflow-hidden">
          <iframe
            src={CONTACT.mapUrl}
            title={`${SITE_NAME} konumu — Anamur, Mersin`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full"
          />
        </div>
      </div>
    </div>
  );
}
