import { Metadata } from 'next';
import { Clock } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { DEFAULT_SERVICES, SITE_NAME } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Fiyat Listesi',
  description: `${SITE_NAME} — Anamur merkez hizmet fiyat listesi. Saç kesimi, sakal tıraşı ve daha fazlası için güncel fiyatlar.`,
};

export default function PricesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-gold-500 mb-3">Fiyatlarımız</p>
          <h1 className="font-serif text-4xl font-bold text-white mb-4">Fiyat Listesi</h1>
          <p className="text-dark-400">Anamur merkezdeki salonumuzda tüm hizmetler için şeffaf ve güncel fiyatlar</p>
        </div>

        <div className="rounded-2xl border border-dark-700 bg-dark-800 overflow-hidden mb-8">
          {DEFAULT_SERVICES.map((service, i) => (
            <div
              key={service.id}
              className={`flex items-center justify-between p-5 gap-4 ${
                i !== DEFAULT_SERVICES.length - 1 ? 'border-b border-dark-700' : ''
              }`}
            >
              <div className="flex-1">
                <h3 className="font-semibold text-white">{service.name}</h3>
                <div className="flex items-center gap-1 text-xs text-dark-500 mt-1">
                  <Clock size={12} />
                  <span>~{service.duration} dakika</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xl font-bold text-gold-400">{formatCurrency(service.price)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-gold-500/20 bg-gold-500/5 p-4 text-sm text-dark-300 mb-8">
          * Fiyatlar bilgi amaçlıdır, saç uzunluğuna ve işlem süresine göre değişiklik gösterebilir. Her
          hizmetin neler içerdiğini{' '}
          <Link href="/services" className="text-gold-400 underline underline-offset-2">
            Hizmetlerimiz
          </Link>{' '}
          sayfasında bulabilirsiniz.
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
