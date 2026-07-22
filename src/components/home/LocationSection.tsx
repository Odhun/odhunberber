'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Facebook, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CONTACT } from '@/lib/constants';

export default function LocationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const contacts = [
    { icon: Phone, label: 'Telefon', value: CONTACT.phone, href: `tel:${CONTACT.phone}` },
    { icon: Mail, label: 'E-posta', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: MapPin, label: 'Adres', value: CONTACT.address, href: CONTACT.mapLink },
  ];

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/15 to-transparent" />

      {/* Large decorative text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <p className="font-display font-light text-white/[0.02] text-[12vw] leading-none text-center">
          ODHUN BERBER
        </p>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold-400" />
            <span className="text-[11px] font-semibold tracking-[0.25em] text-gold-400 uppercase">Bize Ulaşın</span>
            <span className="h-px w-8 bg-gold-400" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-light text-white">
            Neredeyiz,
            <br />
            <span className="text-gold-gradient italic">nasıl ulaşırsınız?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Gerçek harita embed — col 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 glass rounded-3xl overflow-hidden flex flex-col min-h-64 group hover:border-gold-400/20 transition-colors duration-300"
          >
            <div className="relative flex-1 min-h-56">
              <iframe
                src={CONTACT.mapUrl}
                title="Odhun Berber konumu — Anamur, Mersin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[0.3] contrast-125"
              />
            </div>
            <a
              href={CONTACT.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 text-gold-400 text-sm hover:gap-3 transition-all duration-300 bg-black/40"
            >
              Yol Tarifi Al <ArrowRight size={14} />
            </a>
          </motion.div>

          {/* Contact cards — col 2 */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {contacts.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.label === 'Adres' ? '_blank' : undefined}
                rel={item.label === 'Adres' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="glass group flex items-center gap-4 rounded-2xl p-5 hover:border-gold-400/20 transition-colors duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-400/8 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-400/15 transition-colors">
                  <item.icon size={16} className="text-gold-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] tracking-widest text-dark-600 uppercase mb-0.5">{item.label}</p>
                  <p className="text-sm text-dark-300 group-hover:text-white transition-colors truncate">{item.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-3 mt-1"
            >
              {[
                { href: CONTACT.instagram, icon: Instagram, label: 'Instagram' },
                { href: CONTACT.facebook, icon: Facebook, label: 'Facebook' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 glass rounded-2xl py-4 flex flex-col items-center gap-2 hover:border-gold-400/20 transition-colors duration-300 cursor-pointer group"
                >
                  <Icon size={18} className="text-dark-400 group-hover:text-gold-400 transition-colors" />
                  <span className="text-[11px] text-dark-600 group-hover:text-dark-400 transition-colors">{label}</span>
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
