'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAllServicesAdmin, addService, updateService, deleteService } from '@/services/services';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { SkeletonCard } from '@/components/ui/Skeleton';
import type { Service } from '@/types';
import { formatCurrency } from '@/lib/utils';

type ServiceForm = Omit<Service, 'id'>;

const emptyForm: ServiceForm = {
  name: '',
  description: '',
  duration: 30,
  price: 0,
  isActive: true,
  order: 1,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; editing: Service | null }>({ open: false, editing: null });
  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await getAllServicesAdmin();
    setServices(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setForm(emptyForm);
    setModal({ open: true, editing: null });
  };

  const openEdit = (s: Service) => {
    setForm({ name: s.name, description: s.description, duration: s.duration, price: s.price, isActive: s.isActive, order: s.order });
    setModal({ open: true, editing: s });
  };

  const handleSave = async () => {
    if (!form.name || !form.price) { toast.error('Ad ve fiyat zorunlu'); return; }
    setSaving(true);
    try {
      if (modal.editing) {
        await updateService(modal.editing.id, form);
        toast.success('Hizmet güncellendi');
      } else {
        await addService(form);
        toast.success('Hizmet eklendi');
      }
      setModal({ open: false, editing: null });
      load();
    } catch {
      toast.error('İşlem başarısız');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hizmet silinecek. Emin misiniz?')) return;
    await deleteService(id);
    toast.success('Hizmet silindi');
    load();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Hizmetler</h1>
        <Button onClick={openAdd} icon={<Plus size={16} />}>Hizmet Ekle</Button>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <SkeletonCard key={i} />)}</div>
      ) : (
        <div className="space-y-3">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`flex items-center justify-between rounded-xl border bg-dark-800 p-4 ${s.isActive ? 'border-dark-700' : 'border-dark-700 opacity-50'}`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{s.name}</span>
                  {!s.isActive && <span className="text-xs text-dark-500">(Pasif)</span>}
                </div>
                <p className="text-sm text-dark-400">{s.description}</p>
                <p className="text-xs text-dark-500 mt-1">{s.duration} dk — {formatCurrency(s.price)}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => openEdit(s)} icon={<Edit2 size={14} />} />
                <Button size="sm" variant="ghost" onClick={() => handleDelete(s.id)} icon={<Trash2 size={14} />} className="text-red-400" />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Modal
        open={modal.open}
        onClose={() => setModal({ open: false, editing: null })}
        title={modal.editing ? 'Hizmet Düzenle' : 'Hizmet Ekle'}
        size="sm"
      >
        <div className="space-y-3">
          <Input
            label="Hizmet Adı"
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            placeholder="Saç Kesimi"
          />
          <Input
            label="Açıklama"
            value={form.description}
            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            placeholder="Kısa açıklama"
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Süre (dk)"
              type="number"
              value={form.duration}
              onChange={e => setForm(p => ({ ...p, duration: Number(e.target.value) }))}
            />
            <Input
              label="Fiyat (₺)"
              type="number"
              value={form.price}
              onChange={e => setForm(p => ({ ...p, price: Number(e.target.value) }))}
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))}
              className="h-4 w-4 rounded accent-gold-500"
            />
            <span className="text-sm text-dark-200">Aktif</span>
          </label>
          <div className="flex gap-2 mt-2">
            <Button variant="ghost" onClick={() => setModal({ open: false, editing: null })} className="flex-1">İptal</Button>
            <Button onClick={handleSave} loading={saving} icon={<Save size={15} />} className="flex-1">Kaydet</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
