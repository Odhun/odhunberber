'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAllAppointments, updateAppointmentStatus, deleteAppointment } from '@/services/appointments';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { SkeletonCard } from '@/components/ui/Skeleton';
import AppointmentCard from '@/components/admin/AppointmentCard';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import type { Appointment, AppointmentStatus } from '@/types';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<AppointmentStatus | 'all'>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [noteModal, setNoteModal] = useState<{ open: boolean; id: string; note: string }>({ open: false, id: '', note: '' });
  const [deleteId, setDeleteId] = useState<string | null>(null);

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
    const matchFrom = !dateFrom || a.date >= dateFrom;
    const matchTo = !dateTo || a.date <= dateTo;
    return matchSearch && matchFilter && matchFrom && matchTo;
  });

  const handleStatus = async (id: string, status: AppointmentStatus) => {
    await updateAppointmentStatus(id, status);
    toast.success(status === 'confirmed' ? 'Randevu onaylandı' : 'Randevu iptal edildi');
    load();
  };

  const handleDelete = async (id: string) => {
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

  const clearDateFilter = () => { setDateFrom(''); setDateTo(''); };

  const tabs: { label: string; value: AppointmentStatus | 'all' }[] = [
    { label: 'Tümü', value: 'all' },
    { label: 'Bekleyen', value: 'pending' },
    { label: 'Onaylı', value: 'confirmed' },
    { label: 'İptal', value: 'cancelled' },
  ];

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-white">Randevular</h1>

      <div className="flex flex-col gap-3">
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

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-dark-500">Tarih aralığı:</span>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="rounded-lg border border-dark-600 bg-dark-800 px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold-500"
          />
          <span className="text-dark-500 text-sm">—</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="rounded-lg border border-dark-600 bg-dark-800 px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold-500"
          />
          {(dateFrom || dateTo) && (
            <button onClick={clearDateFilter} className="text-xs text-gold-500 hover:text-gold-400">
              Temizle
            </button>
          )}
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
            <AppointmentCard
              key={appt.id}
              appointment={appt}
              delay={Math.min(i, 8) * 0.03}
              onConfirm={appt.status === 'pending' ? () => handleStatus(appt.id, 'confirmed') : undefined}
              onCancel={appt.status === 'pending' ? () => handleStatus(appt.id, 'cancelled') : undefined}
              onNote={() => setNoteModal({ open: true, id: appt.id, note: appt.adminNote || '' })}
              onDelete={() => setDeleteId(appt.id)}
            />
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

      <ConfirmDialog
        open={deleteId !== null}
        title="Randevuyu Sil"
        message="Bu randevu kalıcı olarak silinecek. Bu işlem geri alınamaz. Emin misiniz?"
        confirmLabel="Sil"
        onConfirm={() => deleteId && handleDelete(deleteId)}
        onClose={() => setDeleteId(null)}
      />
    </div>
  );
}
