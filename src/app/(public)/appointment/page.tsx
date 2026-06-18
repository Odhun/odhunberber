'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { CalendarDays, Clock, User, Check, ArrowLeft, Scissors } from 'lucide-react';
import AppointmentCalendar from '@/components/booking/AppointmentCalendar';
import TimeSlotPicker from '@/components/booking/TimeSlotPicker';
import AppointmentForm from '@/components/booking/AppointmentForm';
import { getWorkingSchedule, getBlockedDates } from '@/services/settings';
import { getPublicBookedSlots } from '@/services/appointments';
import { getServices } from '@/services/services';
import { generateTimeSlots, getDayOfWeek } from '@/lib/utils';
import { DEFAULT_WORKING_HOURS, DEFAULT_SERVICES } from '@/lib/constants';
import type { Service, WorkingSchedule, BlockedDate, DayOfWeek } from '@/types';

type Step = 'select' | 'form' | 'done';

const STEPS = [
  { id: 'select', label: 'Tarih & Saat', icon: CalendarDays },
  { id: 'form', label: 'Bilgileriniz', icon: User },
  { id: 'done', label: 'Tamamlandı', icon: Check },
];

export default function AppointmentPage() {
  const [step, setStep] = useState<Step>('select');
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

    try {
      const booked = await getPublicBookedSlots(format(date, 'yyyy-MM-dd'));
      setBookedSlots(booked);
    } catch {
      // public read — show all available
    } finally {
      setLoadingSlots(false);
    }
  };

  const getTimeSlots = () => {
    if (!selectedDate) return [];
    const dayKey = getDayOfWeek(selectedDate) as DayOfWeek;
    const daySchedule = schedule[dayKey];
    if (!daySchedule?.isOpen) return [];

    const allSlots = generateTimeSlots(daySchedule.openTime, daySchedule.closeTime, daySchedule.slotInterval);
    const blockedDate = blockedDates.find(b => b.date === format(selectedDate, 'yyyy-MM-dd'));

    return allSlots.map(time => {
      if (bookedSlots.includes(time)) return { time, status: 'booked' as const };
      if (blockedDate?.blockedSlots?.includes(time)) return { time, status: 'blocked' as const };
      return { time, status: 'available' as const };
    });
  };

  const disabledDays = Object.entries(schedule)
    .filter(([, v]) => !v.isOpen)
    .map(([k]) => ({ sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6 }[k] ?? -1));

  const selectedDateLabel = selectedDate
    ? (() => { try { return format(selectedDate, 'dd MMMM yyyy', { locale: tr }); } catch { return format(selectedDate, 'dd.MM.yyyy'); } })()
    : '';

  const selectedDayLabel = selectedDate
    ? (() => { try { return format(selectedDate, 'EEEE', { locale: tr }); } catch { return ''; } })()
    : '';

  const currentStepIndex = STEPS.findIndex(s => s.id === step);

  return (
    <div className="min-h-screen bg-[#050505] pt-20 pb-16">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold-400/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-gold-400/60" />
            <span className="text-[11px] font-semibold tracking-[0.25em] text-gold-400 uppercase">Online Rezervasyon</span>
            <span className="h-px w-8 bg-gold-400/60" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-light text-white">
            Randevu Al
          </h1>
        </motion.div>

        {/* Step indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          {STEPS.map((s, i) => {
            const done = i < currentStepIndex;
            const active = s.id === step;
            return (
              <div key={s.id} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                  active
                    ? 'bg-gold-400/10 border border-gold-400/30 text-gold-400'
                    : done
                    ? 'text-green-400/70'
                    : 'text-dark-700'
                }`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    active ? 'bg-gold-400 text-dark-950' : done ? 'bg-green-400/20 text-green-400' : 'bg-dark-800 text-dark-600'
                  }`}>
                    {done ? <Check size={10} /> : <s.icon size={10} />}
                  </div>
                  <span className="hidden sm:block">{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-px w-6 transition-colors ${done ? 'bg-green-400/30' : 'bg-dark-800'}`} />
                )}
              </div>
            );
          })}
        </motion.div>

        {/* ── STEP 1: Select date + time ── */}
        <AnimatePresence mode="wait">
          {step === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Calendar panel */}
                <div className="glass rounded-3xl p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <CalendarDays size={15} className="text-gold-400" />
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-gold-400 uppercase">Tarih Seçin</span>
                  </div>
                  <AppointmentCalendar
                    selectedDate={selectedDate}
                    onSelectDate={handleSelectDate}
                    blockedDates={blockedDates.filter(b => !b.blockedSlots?.length).map(b => b.date)}
                    disabledDays={disabledDays.filter(d => d >= 0)}
                  />
                </div>

                {/* Time slot panel */}
                <div className="glass rounded-3xl p-6 md:p-8 flex flex-col">
                  <div className="flex items-center gap-2 mb-6">
                    <Clock size={15} className="text-gold-400" />
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-gold-400 uppercase">Saat Seçin</span>
                  </div>

                  {!selectedDate ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-8">
                      <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center">
                        <CalendarDays size={24} className="text-dark-700" />
                      </div>
                      <p className="text-dark-600 text-sm text-center">
                        Saat listesini görmek için
                        <br />sol taraftan tarih seçin
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Selected date badge */}
                      <div className="glass-gold rounded-2xl px-4 py-3 mb-5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gold-400/15 flex items-center justify-center flex-shrink-0">
                          <CalendarDays size={14} className="text-gold-400" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium capitalize">{selectedDayLabel}</p>
                          <p className="text-dark-400 text-xs">{selectedDateLabel}</p>
                        </div>
                      </div>

                      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
                        <TimeSlotPicker
                          slots={getTimeSlots()}
                          selectedTime={selectedTime}
                          onSelectTime={(t) => {
                            setSelectedTime(t);
                            setStep('form');
                          }}
                          loading={loadingSlots}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Selection summary strip */}
              <AnimatePresence>
                {selectedDate && selectedTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-4 glass-gold rounded-2xl px-6 py-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <Scissors size={16} className="text-gold-400" />
                      <div>
                        <p className="text-white text-sm font-medium">
                          {selectedDateLabel} — {selectedTime}
                        </p>
                        <p className="text-dark-400 text-xs">Seçiminizi onaylamak için devam edin</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setStep('form')}
                      className="px-5 py-2 rounded-full bg-gold-400 text-dark-950 text-sm font-semibold hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
                    >
                      Devam
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── STEP 2: Form ── */}
          {step === 'form' && selectedDate && selectedTime && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl mx-auto"
            >
              <button
                onClick={() => setStep('select')}
                className="flex items-center gap-2 text-dark-400 hover:text-white text-sm mb-6 transition-colors cursor-pointer"
              >
                <ArrowLeft size={14} /> Tarih/saati değiştir
              </button>

              <div className="glass rounded-3xl p-6 md:p-8">
                <div className="glass-gold rounded-2xl px-5 py-4 mb-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold-400/15 flex items-center justify-center">
                    <Clock size={16} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium capitalize">{selectedDayLabel}, {selectedDateLabel}</p>
                    <p className="text-gold-400 text-sm font-mono">{selectedTime}</p>
                  </div>
                </div>

                <AppointmentForm
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  services={services}
                  onBack={() => setStep('select')}
                  onSuccess={() => {
                    setStep('done');
                  }}
                />
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Done ── */}
          {step === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="glass rounded-3xl p-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center mx-auto mb-6"
                >
                  <Check size={32} className="text-green-400" />
                </motion.div>
                <h2 className="font-display text-4xl font-light text-white mb-3">Talebiniz Alındı</h2>
                <p className="text-dark-400 mb-2">
                  {selectedDateLabel} saat {selectedTime} için randevu talebiniz iletildi.
                </p>
                <p className="text-dark-600 text-sm mb-8">Onay sonrası bilgilendirileceksiniz.</p>
                <button
                  onClick={() => {
                    setStep('select');
                    setSelectedDate(null);
                    setSelectedTime(null);
                  }}
                  className="px-7 py-3 rounded-full border border-white/10 text-dark-300 text-sm hover:border-gold-400/30 hover:text-white transition-all cursor-pointer"
                >
                  Yeni Randevu Al
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
