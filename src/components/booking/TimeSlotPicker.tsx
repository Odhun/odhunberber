'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SkeletonTimeSlot } from '@/components/ui/Skeleton';

interface TimeSlotPickerProps {
  slots: { time: string; status: 'available' | 'booked' | 'pending' | 'blocked' }[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  loading?: boolean;
}

const statusConfig = {
  available: 'cursor-pointer text-dark-200 bg-dark-700 hover:bg-gold-500/10 hover:text-gold-400 hover:border-gold-500/30 border-dark-600',
  booked: 'cursor-not-allowed text-dark-600 bg-dark-800/50 border-dark-700 line-through',
  pending: 'cursor-not-allowed text-yellow-600 bg-yellow-500/5 border-yellow-500/10',
  blocked: 'cursor-not-allowed text-dark-700 bg-dark-800/50 border-dark-700',
};

export default function TimeSlotPicker({
  slots,
  selectedTime,
  onSelectTime,
  loading,
}: TimeSlotPickerProps) {
  if (loading) return <SkeletonTimeSlot />;

  if (slots.length === 0) {
    return (
      <div className="rounded-xl border border-dark-700 bg-dark-800 p-6 text-center">
        <p className="text-dark-400">Bu gün için uygun saat yok.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {slots.map(({ time, status }) => {
        const selected = selectedTime === time && status === 'available';
        return (
          <motion.button
            key={time}
            whileTap={{ scale: status === 'available' ? 0.95 : 1 }}
            disabled={status !== 'available'}
            onClick={() => status === 'available' && onSelectTime(time)}
            className={cn(
              'h-11 rounded-xl border text-sm font-medium transition-all duration-150',
              selected
                ? 'border-gold-500 bg-gold-500 text-dark-900 shadow-lg shadow-gold-500/25'
                : statusConfig[status]
            )}
          >
            {time}
          </motion.button>
        );
      })}
    </div>
  );
}
