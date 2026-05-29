'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { getSiteSettings, updateSiteSettings } from '@/services/settings';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import type { SiteSettings } from '@/types';
import { DEFAULT_WORKING_HOURS, CONTACT, SITE_NAME } from '@/lib/constants';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({
    shopName: SITE_NAME,
    phone: CONTACT.phone,
    email: CONTACT.email,
    address: CONTACT.address,
    mapUrl: CONTACT.mapUrl,
    instagram: CONTACT.instagram,
    facebook: CONTACT.facebook,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSiteSettings().then(s => setSettings(s)).catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSiteSettings(settings);
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

  return (
    <div className="space-y-5 max-w-xl">
      <h1 className="text-2xl font-bold text-white">Ayarlar</h1>

      <div className="rounded-2xl border border-dark-700 bg-dark-800 p-6 space-y-4">
        <h2 className="font-semibold text-white">Site Bilgileri</h2>
        {fields.map(f => (
          <Input
            key={f.key}
            label={f.label}
            type={(f as {type?: string}).type}
            value={(settings[f.key as keyof typeof settings] as string) || ''}
            onChange={e => setSettings(prev => ({ ...prev, [f.key]: e.target.value }))}
          />
        ))}
        <Button onClick={handleSave} loading={saving} icon={<Save size={15} />} className="w-full">
          Kaydet
        </Button>
      </div>
    </div>
  );
}
