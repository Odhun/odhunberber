'use client';

import { motion } from 'framer-motion';
import { Scissors, Zap, Sparkles, Heart, Star, Palette } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const services = [
  { icon: Scissors, title: 'Saç Kesimi', desc: 'Yüz şeklinize uygun modern kesim teknikleri' },
  { icon: Zap, title: 'Sakal Tıraşı', desc: 'Klasik düz ustura ile geleneksel tıraş deneyimi' },
  { icon: Sparkles, title: 'Saç + Sakal', desc: 'Tam paket berber deneyimi' },
  { icon: Heart, title: 'Cilt Bakımı', desc: 'Derin temizlik ve nemlendirme tedavisi' },
  { icon: Star, title: 'Çocuk Tıraşı', desc: 'Çocuklarınız için eğlenceli ve nazik deneyim' },
  { icon: Palette, title: 'Saç Boyama', desc: 'Profesyonel renk uygulamaları' },
];

export default function ServicesSection() {
  return (
    <section className="py-24 bg-dark-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-gold-500 mb-3">Hizmetlerimiz</p>
          <h2 className="font-serif text-4xl font-bold text-white">Premium Berber Hizmetleri</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group rounded-2xl border border-dark-700 bg-dark-800 p-6 hover:border-gold-500/30 transition-all duration-300"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 text-gold-500 group-hover:bg-gold-500/15 transition-colors">
                <service.icon size={22} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{service.title}</h3>
              <p className="text-sm text-dark-400">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/appointment">
            <Button size="lg">Randevu Al</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
