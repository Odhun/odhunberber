'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  isBefore,
  startOfDay,
  getDay,
  addMonths,
  subMonths,
} from 'date-fns';
import { tr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface AppointmentCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  blockedDates?: string[];
  disabledDays?: number[];
}

const DAY_NAMES = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

export default function AppointmentCalendar({
  selectedDate,
  onSelectDate,
  blockedDates = [],
  disabledDays = [],
}: AppointmentCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [direction, setDirection] = useState(0);

  const changeMonth = (dir: number) => {
    setDirection(dir);
    setCurrentMonth(prev => dir > 0 ? addMonths(prev, 1) : subMonths(prev, 1));
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startOffset = (getDay(monthStart) + 6) % 7;
  const emptyDays = Array.from({ length: startOffset });

  const isBlocked = (date: Date) => blockedDates.includes(format(date, 'yyyy-MM-dd'));
  const isDisabledDay = (date: Date) => {
    const dayIndex = (getDay(date) + 6) % 7;
    return disabledDays.some(d => (d + 6) % 7 === dayIndex);
  };
  const isDateDisabled = (date: Date) =>
    isBefore(startOfDay(date), startOfDay(new Date())) || isBlocked(date) || isDisabledDay(date);

  return (
    <div className="w-full">
      {/* Month header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => changeMonth(-1)}
          className="w-9 h-9 rounded-full border border-white/8 flex items-center justify-center text-dark-400 hover:border-gold-400/30 hover:text-white transition-all duration-200 cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>
        <AnimatePresence mode="wait">
          <motion.h3
            key={format(currentMonth, 'yyyy-MM')}
            initial={{ opacity: 0, y: direction > 0 ? 8 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction > 0 ? -8 : 8 }}
            transition={{ duration: 0.2 }}
            className="font-display text-lg font-light text-white capitalize tracking-wide"
          >
            {format(currentMonth, 'MMMM yyyy', { locale: tr })}
          </motion.h3>
        </AnimatePresence>
        <button
          onClick={() => changeMonth(1)}
          className="w-9 h-9 rounded-full border border-white/8 flex items-center justify-center text-dark-400 hover:border-gold-400/30 hover:text-white transition-all duration-200 cursor-pointer"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-center text-[11px] font-medium text-dark-600 tracking-widest py-1 uppercase">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={format(currentMonth, 'yyyy-MM')}
          initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-7 gap-1"
        >
          {emptyDays.map((_, i) => <div key={`e-${i}`} />)}
          {days.map((day) => {
            const disabled = isDateDisabled(day);
            const selected = selectedDate ? isSameDay(day, selectedDate) : false;
            const today = isToday(day);

            return (
              <motion.button
                key={day.toString()}
                whileHover={disabled ? {} : { scale: 1.1 }}
                whileTap={disabled ? {} : { scale: 0.9 }}
                disabled={disabled}
                onClick={() => !disabled && onSelectDate(day)}
                className={cn(
                  'relative flex h-10 w-full items-center justify-center rounded-xl text-sm transition-all duration-150 cursor-pointer',
                  selected
                    ? 'bg-gold-400 text-dark-950 font-semibold shadow-[0_0_20px_rgba(212,175,55,0.35)]'
                    : today && !disabled
                    ? 'border border-gold-400/30 text-gold-400 font-medium hover:bg-gold-400/8'
                    : disabled
                    ? 'cursor-not-allowed text-dark-800 font-normal'
                    : 'text-dark-300 font-normal hover:bg-white/6 hover:text-white'
                )}
              >
                {format(day, 'd')}
                {today && !selected && (
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-400/60" />
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Legend */}
      <div className="mt-5 flex items-center gap-5 text-[11px] text-dark-600">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-gold-400" /> Seçili
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full border border-gold-400/40" /> Bugün
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-dark-800 border border-dark-700" /> Kapalı
        </span>
      </div>
    </div>
  );
}
