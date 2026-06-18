'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { DEFAULT_SERVICES } from '@/lib/constants';

export default function PricesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold-400" />
            <span className="text-[11px] font-semibold tracking-[0.25em] text-gold-400 uppercase">Fiyat Listesi</span>
            <span className="h-px w-8 bg-gold-400" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-light text-white">
            Şeffaf & Adil
            <br />
            <span className="text-gold-gradient italic">Fiyatlandırma</span>
          </h2>
        </motion.div>

        {/* Price list */}
        <div className="glass-gold rounded-3xl overflow-hidden">
          {DEFAULT_SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={`
                group flex items-center justify-between px-8 py-5 cursor-pointer
                hover:bg-gold-400/[0.03] transition-colors duration-300
                ${i !== DEFAULT_SERVICES.length - 1 ? 'border-b border-gold-400/10' : ''}
              `}
            >
              <div className="flex items-center gap-5">
                <span className="text-gold-400/20 text-xs font-mono w-4 text-right">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-display text-xl font-light text-white group-hover:text-gold-400/90 transition-colors duration-300">
                    {service.name}
                  </p>
                  <p className="text-dark-500 text-xs mt-0.5">{service.duration} dakika</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Dotted line */}
                <div className="hidden md:block flex-1 border-b border-dashed border-dark-700 w-24" />
                <span className="font-display text-2xl font-light text-gold-400">
                  {service.price}<span className="text-sm ml-0.5">₺</span>
                </span>
                <ArrowRight size={14} className="text-dark-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-10 text-center"
        >
          <Link href="/appointment">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold-400 text-dark-950 font-semibold text-sm tracking-wide rounded-full hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-300 cursor-pointer"
            >
              Hemen Randevu Al
              <ArrowRight size={15} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
