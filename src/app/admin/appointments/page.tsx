'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle, Trash2, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAllAppointments, updateAppointmentStatus, deleteAppointment } from '@/services/appointments';
import { StatusBadge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { SkeletonCard } from '@/components/ui/Skeleton';
import type { Appointment, AppointmentStatus } from '@/types';
import { formatDateTR } from '@/lib/utils';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<AppointmentStatus | 'all'>('all');
  const [noteModal, setNoteModal] = useState<{ open: boolean; id: string; note: string }>({ open: false, id: '', note: '' });

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

  const filtered = appointments.filter(a => {
    const matchSearch =
      a.customerName.toLowerCase().includes(search.toLowerCase()) ||
      a.customerPhone.includes(search) ||
      a.serviceName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || a.status === filter;
    return matchSearch && matchFilter;
  });

  const handleStatus = async (id: string, status: AppointmentStatus) => {
    await updateAppointmentStatus(id, status);
    toast.success(status === 'confirmed' ? 'Randevu onaylandı' : 'Randevu iptal edildi');
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Randevu kalıcı olarak silinecek. Emin misiniz?')) return;
    await deleteAppointment(id);
    toast.success('Randevu silindi');
    load();
  };

  const handleSaveNote = async () => {
    await updateAppointmentStatus(noteModal.id, appointments.find(a => a.id === noteModal.id)!.status, noteModal.note);
    toast.success('Not kaydedildi');
    setNoteModal({ open: false, id: '', note: '' });
    load();
  };

  const tabs: { label: string; value: AppointmentStatus | 'all' }[] = [
    { label: 'Tümü', value: 'all' },
    { label: 'Bekleyen', value: 'pending' },
    { label: 'Onaylı', value: 'confirmed' },
    { label: 'İptal', value: 'cancelled' },
  ];

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-white">Randevular</h1>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="İsim, telefon veya hizmet ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search size={16} />}
          className="sm:w-72"
        />
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${
                filter === tab.value ? 'bg-gold-500 text-dark-900' : 'bg-dark-800 text-dark-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3,4].map(i => <SkeletonCard key={i} />)}</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dark-700 bg-dark-800 p-12 text-center text-dark-400">
          Randevu bulunamadı
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((appt, i) => (
            <motion.div
              key={appt.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="rounded-xl border border-dark-700 bg-dark-800 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-white">{appt.customerName}</span>
                    <StatusBadge status={appt.status} />
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-dark-400">
                    <span>{appt.serviceName}</span>
                    <span>{formatDateTR(appt.date)} — {appt.time}</span>
                    <span>{appt.customerPhone}</span>
                  </div>
                  {appt.adminNote && (
                    <p className="text-sm text-dark-500 italic">Not: {appt.adminNote}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {appt.status === 'pending' && (
                    <>
                      <Button size="sm" onClick={() => handleStatus(appt.id, 'confirmed')} icon={<CheckCircle size={14} />}>
                        Onayla
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => handleStatus(appt.id, 'cancelled')} icon={<XCircle size={14} />}>
                        İptal
                      </Button>
                    </>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setNoteModal({ open: true, id: appt.id, note: appt.adminNote || '' })}
                    icon={<MessageSquare size={14} />}
                  >
                    Not
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(appt.id)}
                    icon={<Trash2 size={14} />}
                    className="text-red-400 hover:text-red-300"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Modal
        open={noteModal.open}
        onClose={() => setNoteModal({ open: false, id: '', note: '' })}
        title="Not Ekle"
        size="sm"
      >
        <div className="space-y-4">
          <textarea
            value={noteModal.note}
            onChange={(e) => setNoteModal(prev => ({ ...prev, note: e.target.value }))}
            placeholder="Admin notu..."
            rows={3}
            className="w-full rounded-xl border border-dark-600 bg-dark-700 px-4 py-3 text-white placeholder-dark-400 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/30 resize-none"
          />
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setNoteModal({ open: false, id: '', note: '' })} className="flex-1">İptal</Button>
            <Button onClick={handleSaveNote} className="flex-1">Kaydet</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
