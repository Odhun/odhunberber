'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { User, Phone, Scissors, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { createAppointment } from '@/services/appointments';
import type { Service } from '@/types';
import { formatDateTR } from '@/lib/utils';

const schema = z.object({
  customerName: z
    .string()
    .min(2, 'Ad soyad en az 2 karakter olmalı')
    .max(100, 'Ad soyad çok uzun'),
  customerPhone: z
    .string()
    .regex(/^[0-9\s\+\-\(\)]{10,15}$/, 'Geçerli bir telefon numarası girin'),
  serviceId: z.string().min(1, 'Hizmet seçimi zorunlu'),
});

type FormData = z.infer<typeof schema>;

interface AppointmentFormProps {
  selectedDate: Date;
  selectedTime: string;
  services: Service[];
  onSuccess: () => void;
  onBack: () => void;
}

export default function AppointmentForm({
  selectedDate,
  selectedTime,
  services,
  onSuccess,
  onBack,
}: AppointmentFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const service = services.find((s) => s.id === data.serviceId);
      if (!service) throw new Error('Hizmet bulunamadı');

      await createAppointment({
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        serviceId: data.serviceId,
        serviceName: service.name,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
      });

      setSubmitted(true);
      setTimeout(onSuccess, 3000);
    } catch (err) {
      toast.error('Randevu oluşturulurken hata oluştu. Tekrar deneyin.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    setTimeout(onSuccess, 2000);
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium tracking-widest text-dark-500 uppercase">Ad Soyad</label>
        <div className="relative">
          <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-600 pointer-events-none" />
          <input
            {...register('customerName')}
            placeholder="Adınız ve soyadınız"
            className="w-full h-12 pl-10 pr-4 rounded-xl bg-white/[0.04] border border-white/8 text-white placeholder-dark-600 text-sm focus:outline-none focus:border-gold-400/40 focus:bg-white/[0.06] transition-all"
          />
        </div>
        {errors.customerName && (
          <p className="text-xs text-red-400 pl-1">{errors.customerName.message}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium tracking-widest text-dark-500 uppercase">Telefon</label>
        <div className="relative">
          <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-600 pointer-events-none" />
          <input
            {...register('customerPhone')}
            type="tel"
            placeholder="05XX XXX XX XX"
            className="w-full h-12 pl-10 pr-4 rounded-xl bg-white/[0.04] border border-white/8 text-white placeholder-dark-600 text-sm focus:outline-none focus:border-gold-400/40 focus:bg-white/[0.06] transition-all"
          />
        </div>
        {errors.customerPhone && (
          <p className="text-xs text-red-400 pl-1">{errors.customerPhone.message}</p>
        )}
      </div>

      {/* Service */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium tracking-widest text-dark-500 uppercase">Hizmet</label>
        <div className="relative">
          <Scissors size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-600 pointer-events-none z-10" />
          <select
            {...register('serviceId')}
            className="w-full h-12 pl-10 pr-4 rounded-xl bg-white/[0.04] border border-white/8 text-white text-sm focus:outline-none focus:border-gold-400/40 transition-all appearance-none cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            <option value="" className="bg-dark-900 text-dark-400">Hizmet seçin</option>
            {services.map(s => (
              <option key={s.id} value={s.id} className="bg-dark-900 text-white">
                {s.name} — {s.price} ₺
              </option>
            ))}
          </select>
        </div>
        {errors.serviceId && (
          <p className="text-xs text-red-400 pl-1">{errors.serviceId.message}</p>
        )}
      </div>

      <p className="text-xs text-dark-700 pt-1">
        Kişisel verileriniz KVKK kapsamında korunmaktadır.
      </p>

      <motion.button
        type="submit"
        disabled={submitting}
        whileHover={submitting ? {} : { scale: 1.02 }}
        whileTap={submitting ? {} : { scale: 0.98 }}
        className="w-full h-13 rounded-xl bg-gold-400 text-dark-950 font-semibold text-sm flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
        style={{ height: '52px' }}
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Gönderiliyor…
          </>
        ) : (
          <>
            Randevu Oluştur
            <ArrowRight size={15} />
          </>
        )}
      </motion.button>
    </form>
  );
}
