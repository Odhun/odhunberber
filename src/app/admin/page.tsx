'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { getAllAppointments, updateAppointmentStatus } from '@/services/appointments';
import { StatusBadge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { SkeletonCard } from '@/components/ui/Skeleton';
import toast from 'react-hot-toast';
import type { Appointment } from '@/types';
import { formatDateTR } from '@/lib/utils';

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAllAppointments();
      setAppointments(data);
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-dark-400">{formatDateTR(new Date())}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-dark-700 bg-dark-800 p-5"
          >
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${card.bg}`}>
              <card.icon size={20} className={card.color} />
            </div>
            <p className="text-2xl font-bold text-white">{card.value}</p>
            <p className="text-sm text-dark-500">{card.label}</p>
          </motion.div>
        ))}
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
              <AppointmentRow
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
              <AppointmentRow
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

function AppointmentRow({
  appointment: a,
  onConfirm,
  onCancel,
}: {
  appointment: Appointment;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-dark-700 bg-dark-800 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-white">{a.customerName}</span>
          <StatusBadge status={a.status} />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-dark-400">
          <span>{a.serviceName}</span>
          <span>{formatDateTR(a.date)} — {a.time}</span>
          <span>{a.customerPhone}</span>
        </div>
      </div>
      {a.status === 'pending' && (
        <div className="flex gap-2 shrink-0">
          <Button size="sm" onClick={onConfirm} icon={<CheckCircle size={14} />}>Onayla</Button>
          <Button size="sm" variant="danger" onClick={onCancel} icon={<XCircle size={14} />}>İptal</Button>
        </div>
      )}
    </div>
  );
}
