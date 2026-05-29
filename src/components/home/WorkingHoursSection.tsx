'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { DEFAULT_WORKING_HOURS } from '@/lib/constants';
import { DAY_NAMES_TR, type DayOfWeek } from '@/types';

const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function WorkingHoursSection() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as DayOfWeek;

  return (
    <section className="py-24 bg-dark-900/50">
      <div className="mx-auto max-w-lg px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 text-gold-500 mb-4">
            <Clock size={22} />
          </div>
          <p className="text-sm font-medium uppercase tracking-widest text-gold-500 mb-2">Çalışma Saatleri</p>
          <h2 className="font-serif text-3xl font-bold text-white">Ne Zaman Açığız?</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-dark-700 bg-dark-800 overflow-hidden"
        >
          {days.map((day, i) => {
            const hours = DEFAULT_WORKING_HOURS[day];
            const isToday = day === today;
            return (
              <div
                key={day}
                className={`flex items-center justify-between px-5 py-3.5 ${
                  i !== days.length - 1 ? 'border-b border-dark-700' : ''
                } ${isToday ? 'bg-gold-500/5' : ''}`}
              >
                <span className={`text-sm font-medium ${isToday ? 'text-gold-400' : 'text-dark-200'}`}>
                  {DAY_NAMES_TR[day]}
                  {isToday && (
                    <span className="ml-2 rounded-full bg-gold-500/20 px-1.5 py-0.5 text-xs text-gold-400">Bugün</span>
                  )}
                </span>
                {hours.isOpen ? (
                  <span className="text-sm text-dark-300">
                    {hours.openTime} — {hours.closeTime}
                  </span>
                ) : (
                  <span className="text-sm text-dark-600">Kapalı</span>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
