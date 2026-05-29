import { Metadata } from 'next';
import { Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { DEFAULT_SERVICES, SITE_NAME } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Hizmetler',
  description: `${SITE_NAME} hizmetleri. Saç kesimi, sakal tıraşı, cilt bakımı ve daha fazlası.`,
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-gold-500 mb-3">Ne Sunuyoruz</p>
          <h1 className="font-serif text-4xl font-bold text-white mb-4">Hizmetlerimiz</h1>
          <p className="text-dark-400">Premium berber deneyimi için tüm hizmetlerimiz</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {DEFAULT_SERVICES.map((service) => (
            <div key={service.id} className="rounded-2xl border border-dark-700 bg-dark-800 p-6 hover:border-gold-500/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10">
                  <Tag size={18} className="text-gold-500" />
                </div>
                <span className="font-bold text-gold-400 text-lg">{formatCurrency(service.price)}</span>
              </div>
              <h3 className="font-semibold text-white text-lg mb-2">{service.name}</h3>
              <p className="text-sm text-dark-400 mb-4">{service.description}</p>
              <div className="flex items-center gap-1 text-xs text-dark-500">
                <Clock size={12} />
                <span>~{service.duration} dakika</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/appointment">
            <Button size="lg">Randevu Al</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
