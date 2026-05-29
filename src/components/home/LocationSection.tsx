'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { CONTACT } from '@/lib/constants';

export default function LocationSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-gold-500 mb-3">Bize Ulaşın</p>
          <h2 className="font-serif text-4xl font-bold text-white">Konum & İletişim</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-dark-700 bg-dark-800 h-72 lg:h-auto flex items-center justify-center"
          >
            <div className="text-center space-y-3">
              <div className="h-16 w-16 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto">
                <MapPin size={28} className="text-gold-500" />
              </div>
              <p className="text-dark-300 text-sm px-8">{CONTACT.address}</p>
              <a
                href={CONTACT.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">Haritada Gör</Button>
              </a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {[
              { icon: Phone, label: 'Telefon', value: CONTACT.phone, href: `tel:${CONTACT.phone}` },
              { icon: Mail, label: 'E-posta', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
              { icon: MapPin, label: 'Adres', value: CONTACT.address, href: CONTACT.mapUrl },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label === 'Adres' ? '_blank' : undefined}
                rel={item.label === 'Adres' ? 'noopener noreferrer' : undefined}
                className="flex items-start gap-4 rounded-xl border border-dark-700 bg-dark-800 p-4 hover:border-gold-500/30 transition-colors group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/10 text-gold-500 group-hover:bg-gold-500/15 transition-colors shrink-0">
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="text-xs text-dark-500 mb-0.5">{item.label}</p>
                  <p className="text-sm text-dark-200 group-hover:text-white transition-colors">{item.value}</p>
                </div>
              </a>
            ))}

            <div className="flex gap-3">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-dark-700 bg-dark-800 py-3 text-sm text-dark-400 hover:border-gold-500/30 hover:text-gold-400 transition-colors"
              >
                <Instagram size={16} /> Instagram
              </a>
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-dark-700 bg-dark-800 py-3 text-sm text-dark-400 hover:border-gold-500/30 hover:text-gold-400 transition-colors"
              >
                <Facebook size={16} /> Facebook
              </a>
            </div>

            <Link href="/contact">
              <Button variant="secondary" className="w-full">İletişim Sayfası</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
