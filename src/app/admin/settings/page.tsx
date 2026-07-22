'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { getSiteSettings, updateSiteSettings } from '@/services/settings';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import type { SiteSettings } from '@/types';
import { DEFAULT_WORKING_HOURS, CONTACT, SITE_NAME } from '@/lib/constants';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\s-]{7,20}$/;

export default function AdminSettingsPage() {
  const initial: Partial<SiteSettings> = {
    shopName: SITE_NAME,
    phone: CONTACT.phone,
    email: CONTACT.email,
    address: CONTACT.address,
    mapUrl: CONTACT.mapUrl,
    instagram: CONTACT.instagram,
    facebook: CONTACT.facebook,
  };

  const [settings, setSettings] = useState<Partial<SiteSettings>>(initial);
  const [savedSettings, setSavedSettings] = useState<Partial<SiteSettings>>(initial);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    getSiteSettings()
      .then((s) => { setSettings(s); setSavedSettings(s); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const isDirty = JSON.stringify(settings) !== JSON.stringify(savedSettings);

  const validate = () => {
    const next: Record<string, string> = {};
    if (settings.email && !EMAIL_RE.test(settings.email)) next.email = 'Geçerli bir e-posta girin';
    if (settings.phone && !PHONE_RE.test(settings.phone)) next.phone = 'Geçerli bir telefon numarası girin';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) {
      toast.error('Lütfen alanları kontrol edin');
      return;
    }
    setSaving(true);
    try {
      await updateSiteSettings(settings);
      setSavedSettings(settings);
      toast.success('Ayarlar kaydedildi');
    } catch {
      toast.error('Kayıt başarısız');
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { key: 'shopName', label: 'Salon Adı' },
    { key: 'phone', label: 'Telefon' },
    { key: 'email', label: 'E-posta', type: 'email' },
    { key: 'address', label: 'Adres' },
    { key: 'mapUrl', label: 'Google Maps URL' },
    { key: 'instagram', label: 'Instagram URL' },
    { key: 'facebook', label: 'Facebook URL' },
  ] as const;

  if (loading) {
    return (
      <div className="space-y-5 max-w-xl">
        <h1 className="text-2xl font-bold text-white">Ayarlar</h1>
        <div className="rounded-2xl border border-dark-700 bg-dark-800 p-6 space-y-4">
          {fields.map((f) => (
            <Skeleton key={f.key} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Ayarlar</h1>
        {isDirty && <span className="text-xs text-yellow-400">Kaydedilmemiş değişiklikler var</span>}
      </div>

      <div className="rounded-2xl border border-dark-700 bg-dark-800 p-6 space-y-4">
        <h2 className="font-semibold text-white">Site Bilgileri</h2>
        {fields.map(f => (
          <Input
            key={f.key}
            label={f.label}
            type={(f as {type?: string}).type}
            value={(settings[f.key as keyof typeof settings] as string) || ''}
            onChange={e => setSettings(prev => ({ ...prev, [f.key]: e.target.value }))}
            error={errors[f.key]}
          />
        ))}
        <Button onClick={handleSave} loading={saving} icon={<Save size={15} />} className="w-full">
          Kaydet
        </Button>
      </div>
    </div>
  );
}
