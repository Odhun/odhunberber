'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { DEFAULT_WORKING_HOURS } from '@/lib/constants';
import { DAY_NAMES_TR, type DayOfWeek } from '@/types';

const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function WorkingHoursSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as DayOfWeek;

  const todayHours = DEFAULT_WORKING_HOURS[today];

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#070707]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_20%_50%,rgba(212,175,55,0.04)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — headline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-gold-400" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-gold-400 uppercase">Çalışma Saatleri</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-light text-white leading-tight mb-6">
              Sizi bekliyoruz
              <br />
              <span className="text-gold-gradient italic">her gün</span>
            </h2>

            {/* Today's status card */}
            <div className="glass-gold rounded-2xl p-6 mt-8">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-2 h-2 rounded-full ${todayHours.isOpen ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]' : 'bg-red-400'}`} />
                <span className="text-sm font-medium text-white">
                  Bugün — {DAY_NAMES_TR[today]}
                </span>
              </div>
              {todayHours.isOpen ? (
                <div>
                  <p className="font-display text-3xl font-light text-gold-400">
                    {todayHours.openTime} <span className="text-dark-500 text-xl">–</span> {todayHours.closeTime}
                  </p>
                  <p className="text-dark-500 text-xs mt-2">Randevu için arayın veya online rezervasyon yapın</p>
                </div>
              ) : (
                <p className="font-display text-2xl font-light text-dark-400">Bugün Kapalı</p>
              )}
            </div>

            <Link href="/appointment" className="inline-flex items-center gap-2 mt-6 text-sm text-gold-400 hover:text-gold-300 transition-colors group cursor-pointer">
              Randevu Al
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Right — full schedule */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-2xl overflow-hidden"
          >
            {days.map((day, i) => {
              const hours = DEFAULT_WORKING_HOURS[day];
              const isToday = day === today;

              return (
                <motion.div
                  key={day}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className={`
                    flex items-center justify-between px-6 py-4
                    ${i !== days.length - 1 ? 'border-b border-white/5' : ''}
                    ${isToday ? 'bg-gold-400/5' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {isToday && (
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${todayHours.isOpen ? 'bg-green-400' : 'bg-dark-500'}`} />
                    )}
                    {!isToday && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-transparent" />}
                    <span className={`text-sm font-medium ${isToday ? 'text-gold-400' : hours.isOpen ? 'text-dark-200' : 'text-dark-600'}`}>
                      {DAY_NAMES_TR[day]}
                    </span>
                    {isToday && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-400/15 text-gold-400">Bugün</span>
                    )}
                  </div>
                  {hours.isOpen ? (
                    <div className="flex items-center gap-2">
                      <Clock size={11} className="text-dark-600" />
                      <span className={`text-sm font-mono ${isToday ? 'text-gold-400' : 'text-dark-400'}`}>
                        {hours.openTime}–{hours.closeTime}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-dark-700 tracking-wide">KAPALI</span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
