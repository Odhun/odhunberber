'use client';

import { useState, useEffect, useMemo } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, TrendingUp, Scissors } from 'lucide-react';
import { format, startOfWeek, endOfWeek, isWithinInterval, parseISO } from 'date-fns';
import Link from 'next/link';
import { getAllAppointments, updateAppointmentStatus } from '@/services/appointments';
import { getAllServicesAdmin } from '@/services/services';
import { SkeletonCard } from '@/components/ui/Skeleton';
import StatCard from '@/components/admin/StatCard';
import AppointmentCard from '@/components/admin/AppointmentCard';
import toast from 'react-hot-toast';
import type { Appointment, Service } from '@/types';
import { formatDateTR } from '@/lib/utils';

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [appts, svc] = await Promise.all([getAllAppointments(), getAllServicesAdmin()]);
      setAppointments(appts);
      setServices(svc);
    } catch {
      toast.error('Randevular yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const today = format(new Date(), 'yyyy-MM-dd');
  const todayAppts = appointments.filter(a => a.date === today);
  const pending = appointments.filter(a => a.status === 'pending');
  const confirmed = appointments.filter(a => a.status === 'confirmed');

  const weekRange = useMemo(
    () => ({ start: startOfWeek(new Date(), { weekStartsOn: 1 }), end: endOfWeek(new Date(), { weekStartsOn: 1 }) }),
    []
  );

  const weekAppts = useMemo(
    () =>
      appointments.filter((a) => {
        try {
          return isWithinInterval(parseISO(a.date), weekRange) && a.status !== 'cancelled';
        } catch {
          return false;
        }
      }),
    [appointments, weekRange]
  );

  const priceByServiceId = useMemo(() => {
    const map = new Map<string, number>();
    services.forEach((s) => map.set(s.id, s.price));
    return map;
  }, [services]);

  const estimatedWeeklyRevenue = useMemo(
    () => weekAppts.reduce((sum, a) => sum + (priceByServiceId.get(a.serviceId) ?? 0), 0),
    [weekAppts, priceByServiceId]
  );

  const mostPopularService = useMemo(() => {
    if (appointments.length === 0) return '—';
    const counts = new Map<string, number>();
    appointments
      .filter((a) => a.status !== 'cancelled')
      .forEach((a) => counts.set(a.serviceName, (counts.get(a.serviceName) ?? 0) + 1));
    if (counts.size === 0) return '—';
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0][0];
  }, [appointments]);

  const handleConfirm = async (id: string) => {
    await updateAppointmentStatus(id, 'confirmed');
    toast.success('Randevu onaylandı');
    load();
  };

  const handleCancel = async (id: string) => {
    await updateAppointmentStatus(id, 'cancelled');
    toast.success('Randevu iptal edildi');
    load();
  };

  const statCards = [
    { icon: Calendar, label: 'Bugün', value: todayAppts.length, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { icon: AlertCircle, label: 'Bekleyen', value: pending.length, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { icon: CheckCircle, label: 'Onaylı', value: confirmed.length, color: 'text-green-400', bg: 'bg-green-400/10' },
    { icon: Clock, label: 'Toplam', value: appointments.length, color: 'text-gold-400', bg: 'bg-gold-500/10' },
  ];

  const analyticsCards = [
    {
      icon: TrendingUp,
      label: 'Bu Hafta Randevu',
      value: weekAppts.length,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
    },
    {
      icon: Scissors,
      label: 'En Çok Tercih Edilen',
      value: mostPopularService,
      color: 'text-pink-400',
      bg: 'bg-pink-400/10',
    },
    {
      icon: TrendingUp,
      label: 'Tahmini Haftalık Ciro',
      value: `₺${estimatedWeeklyRevenue.toLocaleString('tr-TR')}`,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-dark-400">{formatDateTR(new Date())}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((card, i) => (
          <StatCard key={card.label} {...card} delay={i * 0.05} />
        ))}
      </div>

      {/* Analytics */}
      <div>
        <h2 className="mb-3 font-semibold text-white">Bu Hafta Özet</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {analyticsCards.map((card, i) => (
            <StatCard key={card.label} {...card} delay={0.15 + i * 0.05} />
          ))}
        </div>
        <p className="mt-2 text-xs text-dark-600">
          Tahmini ciro, mevcut hizmet fiyat listesine göre hesaplanır (iptal edilenler hariç); randevu anındaki
          gerçek fiyatı yansıtmayabilir.
        </p>
      </div>

      {/* Pending appointments */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-white">Bekleyen Randevular</h2>
          <Link href="/admin/appointments" className="text-sm text-gold-500 hover:text-gold-400">
            Tümünü Gör →
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : pending.length === 0 ? (
          <div className="rounded-2xl border border-dark-700 bg-dark-800 p-8 text-center text-dark-400">
            Bekleyen randevu yok
          </div>
        ) : (
          <div className="space-y-3">
            {pending.slice(0, 5).map((appt) => (
              <AppointmentCard
                key={appt.id}
                appointment={appt}
                onConfirm={() => handleConfirm(appt.id)}
                onCancel={() => handleCancel(appt.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Today */}
      <div>
        <h2 className="mb-4 font-semibold text-white">Bugünkü Randevular</h2>
        {todayAppts.length === 0 ? (
          <div className="rounded-2xl border border-dark-700 bg-dark-800 p-8 text-center text-dark-400">
            Bugün randevu yok
          </div>
        ) : (
          <div className="space-y-3">
            {todayAppts.map((appt) => (
              <AppointmentCard
                key={appt.id}
                appointment={appt}
                onConfirm={() => handleConfirm(appt.id)}
                onCancel={() => handleCancel(appt.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
