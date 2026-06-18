'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone, ChevronDown } from 'lucide-react';
import { CONTACT } from '@/lib/constants';

const WORDS = ['Tıraş', 'Bakım', 'Stil', 'Sanat'];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => setWordIndex(i => (i + 1) % WORDS.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── Background layers ── */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        {/* Base */}
        <div className="absolute inset-0 bg-[#050505]" />

        {/* Radial glow center */}
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(212,175,55,0.08)_0%,transparent_70%)]"
        />

        {/* Floating orbs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gold-400/5 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gold-500/4 blur-[100px]"
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050505_100%)]" />
      </motion.div>

      {/* ── Content ── */}
      <motion.div style={{ opacity }} className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">

        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-3 mb-10"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400" />
          <span className="text-[11px] font-semibold tracking-[0.25em] text-gold-400 uppercase">
            Premium Erkek Kuaförü
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400" />
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-display font-light text-white leading-[0.9] tracking-[-0.02em] mb-4"
            style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}
          >
            ODHUN
          </h1>
          <div
            className="font-display font-light leading-[0.9] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}
          >
            <span className="text-gold-gradient glow-gold-text">BERBER</span>
          </div>
        </motion.div>

        {/* Animated word */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-4 mt-8 mb-12"
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-dark-600" />
          <div className="relative h-8 flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm font-medium tracking-[0.3em] text-dark-300 uppercase absolute"
              >
                {WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-dark-600" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-dark-300 text-lg max-w-lg mx-auto leading-relaxed mb-14 font-light"
        >
          Klasik berber sanatını modern teknikler ile birleştiriyoruz.
          <br />
          <span className="text-dark-400 text-base">Her müşteriye özel, premium bir deneyim.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/appointment">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gold-400 text-dark-950 font-semibold text-sm tracking-wide rounded-full overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-gold-300 to-gold-400 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative">Randevu Al</span>
              <ArrowRight size={16} className="relative transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>

          <a href={`tel:${CONTACT.phone}`}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 text-dark-200 text-sm font-medium tracking-wide hover:border-gold-400/30 hover:text-white transition-all duration-300 cursor-pointer"
            >
              <Phone size={15} />
              {CONTACT.phone}
            </motion.button>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-3 max-w-sm mx-auto mt-20 gap-1"
        >
          {[
            { value: '500+', label: 'Müşteri' },
            { value: '5★', label: 'Puan' },
            { value: '3+', label: 'Yıl' },
          ].map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center py-4 px-2">
              <span className="font-display text-2xl font-medium text-gold-400">{stat.value}</span>
              <span className="text-[11px] tracking-widest text-dark-500 uppercase mt-1">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.25em] text-dark-600 uppercase">Keşfet</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={16} className="text-dark-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
