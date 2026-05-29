'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { User, Phone, Scissors, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
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
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6 py-8 text-center"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle size={40} className="text-green-400" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">Randevu Talebiniz Alındı!</h3>
          <p className="text-dark-400">
            {formatDateTR(selectedDate)} saat {selectedTime} için randevu talebiniz onay bekliyor.
          </p>
          <p className="text-sm text-dark-500">Onay sonrası bilgilendirileceksiniz.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="rounded-xl border border-gold-500/20 bg-gold-500/5 p-4">
        <p className="text-sm text-dark-300">
          Seçilen tarih ve saat:{' '}
          <span className="font-semibold text-gold-400">
            {formatDateTR(selectedDate)} — {selectedTime}
          </span>
        </p>
      </div>

      <Input
        label="Ad Soyad"
        placeholder="Adınız ve soyadınız"
        icon={<User size={16} />}
        error={errors.customerName?.message}
        {...register('customerName')}
      />

      <Input
        label="Telefon"
        placeholder="05XX XXX XX XX"
        icon={<Phone size={16} />}
        type="tel"
        error={errors.customerPhone?.message}
        {...register('customerPhone')}
      />

      <Select
        label="Hizmet"
        placeholder="Hizmet seçin"
        options={services.map((s) => ({
          value: s.id,
          label: `${s.name} — ${s.price} ₺`,
        }))}
        error={errors.serviceId?.message}
        {...register('serviceId')}
      />

      <p className="text-xs text-dark-500">
        Randevunuz admin onayı bekleyecektir. Kişisel verileriniz KVKK kapsamında korunmaktadır.
      </p>

      <div className="flex gap-3">
        <Button type="button" variant="ghost" onClick={onBack} className="flex-1">
          Geri
        </Button>
        <Button type="submit" loading={submitting} className="flex-1">
          Randevu Oluştur
        </Button>
      </div>
    </form>
  );
}
