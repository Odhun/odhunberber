'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Clock, ArrowRight, Scissors } from 'lucide-react';
import { DEFAULT_SERVICES } from '@/lib/constants';

const GLYPHS = ['✦', '◆', '✧', '◇', '✦', '◈'];

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#080808]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_50%,rgba(212,175,55,0.04)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold-400" />
            <span className="text-[11px] font-semibold tracking-[0.25em] text-gold-400 uppercase">Hizmetlerimiz</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-light text-white leading-tight">
            Her ihtiyacınız için
            <br />
            <span className="text-gold-gradient">özel çözüm</span>
          </h2>
        </motion.div>

        {/* Bento grid — row sums: 7+5=12, 5+7=12, 6+6=12 */}
        <div className="grid grid-cols-12 gap-3">
          {DEFAULT_SERVICES.map((service, i) => {
            // Alternating wide/narrow: [7,5], [5,7], [6,6]
            const colMap: Record<number, string> = {
              0: 'col-span-12 md:col-span-7',
              1: 'col-span-12 md:col-span-5',
              2: 'col-span-12 md:col-span-5',
              3: 'col-span-12 md:col-span-7',
              4: 'col-span-6',
              5: 'col-span-6',
            };
            const isLarge = i === 0 || i === 3;
            const isSmall = i === 4 || i === 5;
            const minH = isLarge ? 260 : isSmall ? 180 : 220;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative rounded-2xl overflow-hidden card-noise cursor-pointer ${colMap[i]}`}
                style={{ minHeight: `${minH}px` }}
              >
                {/* Card bg */}
                <div className="absolute inset-0 bg-dark-800/50 border border-white/[0.06] rounded-2xl transition-all duration-500 group-hover:border-gold-400/25" />
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_60%_50%_at_20%_20%,rgba(212,175,55,0.07)_0%,transparent_70%)]" />

                <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8" style={{ minHeight: `${minH}px` }}>
                  <div>
                    <span className="text-gold-400/30 text-[10px] font-mono tracking-widest">{GLYPHS[i]}</span>
                    <h3 className={`font-display font-light text-white leading-tight mt-3 ${isLarge ? 'text-3xl md:text-4xl' : isSmall ? 'text-xl' : 'text-2xl md:text-3xl'}`}>
                      {service.name}
                    </h3>
                    {!isSmall && (
                      <p className="text-dark-500 text-sm mt-2 leading-relaxed max-w-xs">
                        {service.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-end justify-between mt-6">
                    <div>
                      <div className="text-gold-400 font-display font-light" style={{ fontSize: isSmall ? '1.3rem' : '1.6rem' }}>
                        {service.price}<span className="text-sm ml-0.5">₺</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 text-dark-600 text-xs">
                        <Clock size={9} />
                        <span>{service.duration} dk</span>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full border border-white/[0.08] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-gold-400/25">
                      <ArrowRight size={11} className="text-gold-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 flex justify-center"
        >
          <Link href="/appointment">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-gold-400/30 text-gold-400 text-sm font-medium tracking-wide hover:bg-gold-400/5 transition-all duration-300 cursor-pointer"
            >
              <Scissors size={14} />
              Randevu Al
              <ArrowRight size={14} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
