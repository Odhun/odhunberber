'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import toast from 'react-hot-toast';
import AppointmentCalendar from '@/components/booking/AppointmentCalendar';
import TimeSlotPicker from '@/components/booking/TimeSlotPicker';
import AppointmentForm from '@/components/booking/AppointmentForm';
import { getWorkingSchedule, getBlockedDates } from '@/services/settings';
import { getPublicBookedSlots } from '@/services/appointments';
import { getServices } from '@/services/services';
import { generateTimeSlots, getDayOfWeek } from '@/lib/utils';
import { DEFAULT_WORKING_HOURS, DEFAULT_SERVICES } from '@/lib/constants';
import type { Service, WorkingSchedule, BlockedDate, DayOfWeek } from '@/types';

type Step = 'date' | 'time' | 'form';

export default function AppointmentPage() {
  const [step, setStep] = useState<Step>('date');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<WorkingSchedule>(DEFAULT_WORKING_HOURS as WorkingSchedule);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    getWorkingSchedule().then(setSchedule).catch(() => {});
    getBlockedDates().then(setBlockedDates).catch(() => {});
    getServices().then(setServices).catch(() => setServices(DEFAULT_SERVICES));
  }, []);

  const handleSelectDate = async (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setBookedSlots([]);
    setLoadingSlots(true);
    setStep('time');

    try {
      const dateStr = format(date, 'yyyy-MM-dd');
      const booked = await getPublicBookedSlots(dateStr);
      setBookedSlots(booked);
    } catch {
      // permission error — show all slots as available
    } finally {
      setLoadingSlots(false);
    }
  };

  const getTimeSlots = () => {
    if (!selectedDate) return [];
    const dayKey = getDayOfWeek(selectedDate) as DayOfWeek;
    const daySchedule = schedule[dayKey];
    if (!daySchedule?.isOpen) return [];

    const allSlots = generateTimeSlots(
      daySchedule.openTime,
      daySchedule.closeTime,
      daySchedule.slotInterval
    );

    const blockedDate = blockedDates.find(
      (b) => b.date === format(selectedDate, 'yyyy-MM-dd')
    );

    return allSlots.map((time) => {
      if (bookedSlots.includes(time)) return { time, status: 'booked' as const };
      if (blockedDate?.blockedSlots?.includes(time)) return { time, status: 'blocked' as const };
      return { time, status: 'available' as const };
    });
  };

  const disabledDays = Object.entries(schedule)
    .filter(([, v]) => !v.isOpen)
    .map(([k]) => {
      const map: Record<string, number> = {
        sunday: 0, monday: 1, tuesday: 2, wednesday: 3,
        thursday: 4, friday: 5, saturday: 6,
      };
      return map[k] ?? -1;
    });

  const steps = [
    { id: 'date', label: 'Tarih', num: 1 },
    { id: 'time', label: 'Saat', num: 2 },
    { id: 'form', label: 'Bilgiler', num: 3 },
  ];

  const selectedDateLabel = selectedDate
    ? (() => {
        try {
          return format(selectedDate, 'dd MMMM yyyy EEEE', { locale: tr });
        } catch {
          return format(selectedDate, 'dd.MM.yyyy');
        }
      })()
    : '';

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-4xl font-bold text-white mb-2">Randevu Al</h1>
          <p className="text-dark-400">Tarih ve saat seçerek randevu oluşturun</p>
        </div>

        <div className="mb-8 flex items-center justify-center gap-2">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                step === s.id
                  ? 'bg-gold-500 text-dark-900'
                  : steps.findIndex(x => x.id === step) > i
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-dark-800 text-dark-500'
              }`}>
                {steps.findIndex(x => x.id === step) > i ? '✓' : s.num}
              </div>
              <span className={`text-sm ${step === s.id ? 'text-white' : 'text-dark-500'}`}>{s.label}</span>
              {i < steps.length - 1 && <div className="mx-1 h-px w-8 bg-dark-700" />}
            </div>
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {step === 'date' && (
            <AppointmentCalendar
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
              blockedDates={blockedDates
                .filter(b => !b.blockedSlots || b.blockedSlots.length === 0)
                .map(b => b.date)}
              disabledDays={disabledDays.filter(d => d >= 0)}
            />
          )}

          {step === 'time' && selectedDate && (
            <div className="space-y-4">
              <div className="rounded-xl border border-dark-700 bg-dark-800 p-4">
                <p className="text-sm text-dark-400 mb-1">Seçilen tarih</p>
                <p className="font-semibold text-white">{selectedDateLabel}</p>
              </div>
              <TimeSlotPicker
                slots={getTimeSlots()}
                selectedTime={selectedTime}
                onSelectTime={(t) => {
                  setSelectedTime(t);
                  setStep('form');
                }}
                loading={loadingSlots}
              />
              <button
                onClick={() => setStep('date')}
                className="text-sm text-dark-400 hover:text-white transition-colors"
              >
                ← Tarihi değiştir
              </button>
            </div>
          )}

          {step === 'form' && selectedDate && selectedTime && (
            <AppointmentForm
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              services={services}
              onBack={() => setStep('time')}
              onSuccess={() => {
                setStep('date');
                setSelectedDate(null);
                setSelectedTime(null);
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
