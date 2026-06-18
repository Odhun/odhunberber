'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimeSlotPickerProps {
  slots: { time: string; status: 'available' | 'booked' | 'pending' | 'blocked' }[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  loading?: boolean;
}

export default function TimeSlotPicker({
  slots,
  selectedTime,
  onSelectTime,
  loading,
}: TimeSlotPickerProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-11 rounded-xl bg-dark-800/60 animate-pulse"
            style={{ animationDelay: `${i * 40}ms` }}
          />
        ))}
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <div className="w-12 h-12 rounded-full border border-dark-700 flex items-center justify-center">
          <span className="text-dark-600 text-lg">✦</span>
        </div>
        <p className="text-dark-500 text-sm">Bu gün için uygun saat yok.</p>
      </div>
    );
  }

  const available = slots.filter(s => s.status === 'available').length;

  return (
    <div>
      <p className="text-[11px] text-dark-600 tracking-widest uppercase mb-3">
        {available} uygun saat
      </p>
      <div className="grid grid-cols-3 gap-2">
        <AnimatePresence>
          {slots.map(({ time, status }, i) => {
            const isAvail = status === 'available';
            const selected = selectedTime === time && isAvail;

            return (
              <motion.button
                key={time}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02, duration: 0.2 }}
                whileHover={isAvail && !selected ? { scale: 1.04, y: -1 } : {}}
                whileTap={isAvail ? { scale: 0.96 } : {}}
                disabled={!isAvail}
                onClick={() => isAvail && onSelectTime(time)}
                className={cn(
                  'h-11 rounded-xl text-sm font-medium transition-all duration-200 relative overflow-hidden',
                  selected
                    ? 'bg-gold-400 text-dark-950 shadow-[0_0_20px_rgba(212,175,55,0.35)] cursor-pointer'
                    : isAvail
                    ? 'border border-white/6 bg-white/[0.03] text-dark-300 hover:border-gold-400/25 hover:bg-gold-400/6 hover:text-white cursor-pointer'
                    : status === 'booked'
                    ? 'border border-dark-800 text-dark-800 cursor-not-allowed line-through'
                    : 'border border-dark-800 text-dark-800 cursor-not-allowed'
                )}
              >
                {selected && (
                  <motion.div
                    layoutId="slot-indicator"
                    className="absolute inset-0 bg-gold-400"
                    style={{ zIndex: -1 }}
                  />
                )}
                {time}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
