export const SITE_NAME = 'Odhun Berber';
export const SITE_DESCRIPTION =
  "Odhun Berber - Anamur'da premium erkek kuaförü. Modern berber salonu deneyimi için randevu alın.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://odhunberber.com';

// TODO: Aşağıdaki alanlar gerçek işletme bilgisi doğrulanana kadar yer tutucudur.
// phone/instagram/facebook: gerçek hesap/numara eklenmeden önce değiştirilmelidir.
// address: ilçe düzeyi (Anamur, Mersin) doğrudur; açık adres eklenmelidir.
export const CONTACT = {
  phone: '+90 5XX XXX XX XX',
  email: 'info@odhunberber.com',
  address: 'Anamur Merkez, Mersin (açık adres eklenecek)',
  mapUrl: 'https://www.google.com/maps?q=Anamur+Merkez,+Mersin&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Anamur+Merkez,+Mersin',
  instagram: 'https://instagram.com/odhunberber',
  facebook: 'https://facebook.com/odhunberber',
};

export const DEFAULT_WORKING_HOURS = {
  monday: { isOpen: true, openTime: '09:00', closeTime: '20:00', slotInterval: 30 },
  tuesday: { isOpen: true, openTime: '09:00', closeTime: '20:00', slotInterval: 30 },
  wednesday: { isOpen: true, openTime: '09:00', closeTime: '20:00', slotInterval: 30 },
  thursday: { isOpen: true, openTime: '09:00', closeTime: '20:00', slotInterval: 30 },
  friday: { isOpen: true, openTime: '09:00', closeTime: '20:00', slotInterval: 30 },
  saturday: { isOpen: true, openTime: '09:00', closeTime: '18:00', slotInterval: 30 },
  sunday: { isOpen: false, openTime: '00:00', closeTime: '00:00', slotInterval: 30 },
};

export const DEFAULT_SERVICES = [
  { id: '1', name: 'Saç Kesimi', description: 'Profesyonel saç kesimi', duration: 30, price: 150, isActive: true, order: 1 },
  { id: '2', name: 'Sakal Tıraşı', description: 'Klasik düz ustura tıraş', duration: 20, price: 100, isActive: true, order: 2 },
  { id: '3', name: 'Saç + Sakal', description: 'Saç kesimi ve sakal düzeltme', duration: 45, price: 220, isActive: true, order: 3 },
  { id: '4', name: 'Cilt Bakımı', description: 'Derin cilt bakımı ve nemlendirme', duration: 60, price: 300, isActive: true, order: 4 },
  { id: '5', name: 'Çocuk Tıraşı', description: '12 yaş altı çocuk saç kesimi', duration: 20, price: 100, isActive: true, order: 5 },
  { id: '6', name: 'Saç Boyama', description: 'Profesyonel saç boyama', duration: 90, price: 400, isActive: true, order: 6 },
];

export const STATUS_LABELS = {
  pending: 'Beklemede',
  confirmed: 'Onaylandı',
  cancelled: 'İptal',
};

export const STATUS_COLORS = {
  pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  confirmed: 'text-green-400 bg-green-400/10 border-green-400/20',
  cancelled: 'text-red-400 bg-red-400/10 border-red-400/20',
};
