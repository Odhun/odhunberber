'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { DEFAULT_SERVICES } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import Button from '@/components/ui/Button';

export default function PricesSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-gold-500 mb-3">Fiyatlarımız</p>
          <h2 className="font-serif text-4xl font-bold text-white">Fiyat Listesi</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-dark-700 bg-dark-800 overflow-hidden"
        >
          {DEFAULT_SERVICES.map((service, i) => (
            <div
              key={service.id}
              className={`flex items-center justify-between px-6 py-4 ${
                i !== DEFAULT_SERVICES.length - 1 ? 'border-b border-dark-700' : ''
              }`}
            >
              <div>
                <p className="font-medium text-white">{service.name}</p>
                <p className="text-sm text-dark-500">{service.duration} dk</p>
              </div>
              <span className="font-semibold text-gold-400">{formatCurrency(service.price)}</span>
            </div>
          ))}
        </motion.div>

        <div className="mt-8 text-center">
          <Link href="/prices">
            <Button variant="outline">Detaylı Fiyat Listesi</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
