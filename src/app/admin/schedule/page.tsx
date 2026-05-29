'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getWorkingSchedule, updateWorkingSchedule, getBlockedDates, addBlockedDate, removeBlockedDate } from '@/services/settings';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import type { WorkingSchedule, BlockedDate, DayOfWeek } from '@/types';
import { DAY_NAMES_TR } from '@/types';
import { DEFAULT_WORKING_HOURS } from '@/lib/constants';

const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<WorkingSchedule>(DEFAULT_WORKING_HOURS as WorkingSchedule);
  const [blocked, setBlocked] = useState<BlockedDate[]>([]);
  const [newBlockedDate, setNewBlockedDate] = useState('');
  const [newBlockedReason, setNewBlockedReason] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([getWorkingSchedule(), getBlockedDates()])
      .then(([sched, bl]) => { setSchedule(sched); setBlocked(bl); })
      .catch(() => toast.error('Yüklenirken hata oluştu'));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateWorkingSchedule(schedule);
      toast.success('Çalışma saatleri kaydedildi');
    } catch {
      toast.error('Kayıt başarısız');
    } finally {
      setSaving(false);
    }
  };

  const handleAddBlocked = async () => {
    if (!newBlockedDate) { toast.error('Tarih seçin'); return; }
    await addBlockedDate({ date: newBlockedDate, reason: newBlockedReason });
    toast.success('Tatil günü eklendi');
    setNewBlockedDate('');
    setNewBlockedReason('');
    const bl = await getBlockedDates();
    setBlocked(bl);
  };

  const handleRemoveBlocked = async (id: string) => {
    await removeBlockedDate(id);
    setBlocked(prev => prev.filter(b => b.id !== id));
    toast.success('Tatil günü kaldırıldı');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Çalışma Saatleri</h1>

      {/* Weekly schedule */}
      <div className="rounded-2xl border border-dark-700 bg-dark-800 overflow-hidden">
        <div className="border-b border-dark-700 px-5 py-4">
          <h2 className="font-semibold text-white">Haftalık Program</h2>
        </div>
        <div className="divide-y divide-dark-700">
          {days.map((day) => {
            const h = schedule[day];
            return (
              <div key={day} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
                <label className="flex items-center gap-2 w-32">
                  <input
                    type="checkbox"
                    checked={h.isOpen}
                    onChange={(e) => setSchedule(prev => ({
                      ...prev,
                      [day]: { ...prev[day], isOpen: e.target.checked }
                    }))}
                    className="h-4 w-4 rounded border-dark-600 bg-dark-700 text-gold-500 accent-gold-500"
                  />
                  <span className={`text-sm font-medium ${h.isOpen ? 'text-white' : 'text-dark-500'}`}>
                    {DAY_NAMES_TR[day]}
                  </span>
                </label>
                {h.isOpen && (
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1">
                      <label className="text-xs text-dark-500">Açılış</label>
                      <input
                        type="time"
                        value={h.openTime}
                        onChange={(e) => setSchedule(prev => ({
                          ...prev,
                          [day]: { ...prev[day], openTime: e.target.value }
                        }))}
                        className="rounded-lg border border-dark-600 bg-dark-700 px-2 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold-500"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <label className="text-xs text-dark-500">Kapanış</label>
                      <input
                        type="time"
                        value={h.closeTime}
                        onChange={(e) => setSchedule(prev => ({
                          ...prev,
                          [day]: { ...prev[day], closeTime: e.target.value }
                        }))}
                        className="rounded-lg border border-dark-600 bg-dark-700 px-2 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold-500"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <label className="text-xs text-dark-500">Aralık (dk)</label>
                      <select
                        value={h.slotInterval}
                        onChange={(e) => setSchedule(prev => ({
                          ...prev,
                          [day]: { ...prev[day], slotInterval: Number(e.target.value) }
                        }))}
                        className="rounded-lg border border-dark-600 bg-dark-700 px-2 py-1 text-sm text-white focus:outline-none"
                      >
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={45}>45</option>
                        <option value={60}>60</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="border-t border-dark-700 px-5 py-4">
          <Button onClick={handleSave} loading={saving} icon={<Save size={15} />}>
            Kaydet
          </Button>
        </div>
      </div>

      {/* Blocked dates */}
      <div className="rounded-2xl border border-dark-700 bg-dark-800 overflow-hidden">
        <div className="border-b border-dark-700 px-5 py-4">
          <h2 className="font-semibold text-white">Tatil Günleri</h2>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex flex-wrap gap-3">
            <input
              type="date"
              value={newBlockedDate}
              onChange={(e) => setNewBlockedDate(e.target.value)}
              className="rounded-xl border border-dark-600 bg-dark-700 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold-500"
            />
            <input
              type="text"
              value={newBlockedReason}
              onChange={(e) => setNewBlockedReason(e.target.value)}
              placeholder="Sebep (opsiyonel)"
              className="flex-1 rounded-xl border border-dark-600 bg-dark-700 px-3 py-2.5 text-sm text-white placeholder-dark-500 focus:outline-none focus:ring-1 focus:ring-gold-500 min-w-32"
            />
            <Button onClick={handleAddBlocked} icon={<Plus size={15} />}>Ekle</Button>
          </div>

          {blocked.length === 0 ? (
            <p className="text-sm text-dark-500">Tatil günü eklenmemiş</p>
          ) : (
            <div className="space-y-2">
              {blocked.map((b) => (
                <div key={b.id} className="flex items-center justify-between rounded-lg bg-dark-700 px-3 py-2">
                  <div>
                    <span className="text-sm text-white">{b.date}</span>
                    {b.reason && <span className="ml-2 text-xs text-dark-400">— {b.reason}</span>}
                  </div>
                  <button
                    onClick={() => handleRemoveBlocked(b.id)}
                    className="text-dark-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
