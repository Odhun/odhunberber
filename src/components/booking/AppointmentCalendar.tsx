'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
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
  disabledDays?: number[]; // 0=Sun, 1=Mon...
}

const DAY_NAMES = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

export default function AppointmentCalendar({
  selectedDate,
  onSelectDate,
  blockedDates = [],
  disabledDays = [],
}: AppointmentCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Monday-first offset
  const startOffset = (getDay(monthStart) + 6) % 7;
  const emptyDays = Array.from({ length: startOffset });

  const isBlocked = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return blockedDates.includes(dateStr);
  };

  const isDisabledDay = (date: Date) => {
    const dayIndex = (getDay(date) + 6) % 7; // Mon=0..Sun=6
    // Convert disabledDays (0=Sun) to Mon-first
    return disabledDays.some(d => (d + 6) % 7 === dayIndex);
  };

  const isDateDisabled = (date: Date) => {
    return isBefore(startOfDay(date), startOfDay(new Date())) || isBlocked(date) || isDisabledDay(date);
  };

  return (
    <div className="rounded-2xl border border-dark-700 bg-dark-800 p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="rounded-lg p-2 text-dark-400 hover:bg-dark-700 hover:text-white transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <h3 className="font-semibold text-white capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: tr })}
        </h3>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="rounded-lg p-2 text-dark-400 hover:bg-dark-700 hover:text-white transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Day names */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-dark-500 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map((day) => {
          const disabled = isDateDisabled(day);
          const selected = selectedDate ? isSameDay(day, selectedDate) : false;
          const today = isToday(day);

          return (
            <motion.button
              key={day.toString()}
              whileTap={{ scale: disabled ? 1 : 0.92 }}
              disabled={disabled}
              onClick={() => !disabled && onSelectDate(day)}
              className={cn(
                'relative flex h-10 w-full items-center justify-center rounded-xl text-sm font-medium transition-all duration-150',
                selected
                  ? 'bg-gold-500 text-dark-900 shadow-lg shadow-gold-500/30'
                  : today && !disabled
                  ? 'border border-gold-500/40 text-gold-400 hover:bg-gold-500/10'
                  : disabled
                  ? 'cursor-not-allowed text-dark-700'
                  : 'text-dark-200 hover:bg-dark-700 hover:text-white'
              )}
            >
              {format(day, 'd')}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-dark-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-gold-500" /> Seçili
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-gold-500/40" /> Bugün
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-dark-700" /> Kapalı
        </span>
      </div>
    </div>
  );
}
