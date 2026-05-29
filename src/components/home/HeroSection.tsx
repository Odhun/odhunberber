'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Phone, Star } from 'lucide-react';
import Button from '@/components/ui/Button';
import { CONTACT, SITE_NAME } from '@/lib/constants';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gold-500/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-gold-500/3 blur-3xl" />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/5 px-4 py-2 text-sm text-gold-400"
          >
            <Star size={14} className="fill-gold-400" />
            Premium Erkek Kuaförü
            <Star size={14} className="fill-gold-400" />
          </motion.div>

          {/* Title */}
          <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-white sm:text-7xl">
            {SITE_NAME}
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-dark-300 sm:text-xl">
            Klasik berber sanatını modern tekniklerle buluşturuyoruz.
            Her müşterimize özel, premium bir deneyim sunuyoruz.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/appointment">
              <Button size="lg" icon={<Calendar size={20} />}>
                Randevu Al
              </Button>
            </Link>
            <a href={`tel:${CONTACT.phone}`}>
              <Button size="lg" variant="outline" icon={<Phone size={20} />}>
                {CONTACT.phone}
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="mx-auto flex max-w-lg justify-center gap-10 pt-4">
            {[
              { value: '500+', label: 'Mutlu Müşteri' },
              { value: '5★', label: 'Ortalama Puan' },
              { value: '3+', label: 'Yıl Deneyim' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-2xl font-bold text-gold-400">{stat.value}</p>
                <p className="text-xs text-dark-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="h-10 w-6 rounded-full border border-dark-600 flex items-start justify-center pt-1.5">
          <div className="h-2 w-1 rounded-full bg-gold-500" />
        </div>
      </motion.div>
    </section>
  );
}
