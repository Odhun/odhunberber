# PROJECT_STATUS.md — Odhun Berber

Son güncelleme: 2026-07-22

---

## ✅ Tamamlanan Özellikler

### Altyapı
- [x] Next.js 14 + TypeScript kurulumu
- [x] TailwindCSS + dark mode
- [x] Framer Motion animasyonları
- [x] React Hook Form + Zod validation
- [x] Firebase config (Auth + Firestore)
- [x] Firestore security rules
- [x] PWA manifest + next-pwa
- [x] SEO (metadata, sitemap, robots.txt, schema.org)
- [x] GitHub Actions CI/CD
- [x] Firebase Hosting config

### Kullanıcı Arayüzü
- [x] Ana Sayfa (Hero, Hizmetler, Fiyatlar, Çalışma saatleri, Harita)
- [x] Randevu Al sayfası (3 adımlı: Tarih → Saat → Form)
- [x] Takvim bileşeni (aylık görünüm, kapalı gün desteği)
- [x] Saat seçici (boş/dolu/beklemede durumları)
- [x] Randevu formu (KVKK uyarısı, Zod validation)
- [x] Fiyat Listesi sayfası
- [x] Hizmetler sayfası
- [x] Hakkımızda sayfası
- [x] İletişim sayfası
- [x] Yasal sayfalar (Gizlilik, KVKK, Çerez, Koşullar)
- [x] 404 sayfası
- [x] Navbar (scroll efekti, mobil menü)
- [x] Footer (linkler, sosyal medya, iletişim)
- [x] Loading skeletonları
- [x] Toast bildirimleri

### Admin Paneli
- [x] Güvenli admin girişi (Firebase Auth, ağ/kimlik hatası ayrımı ile)
- [x] Route protection (sadece admin emaili)
- [x] Dashboard (istatistikler, haftalık analiz: en çok tercih edilen hizmet/haftalık randevu/tahmini ciro)
- [x] Randevu listesi (filtre, arama, tarih aralığı, onayla/iptal/sil/not)
- [x] Çalışma saatleri düzenleme (açılış/kapanış doğrulaması ile)
- [x] Tatil günü ekleme/kaldırma (tekrar engeli ile)
- [x] Hizmet yönetimi (ekle/düzenle/sil)
- [x] Site ayarları (doğrulama + kaydedilmemiş değişiklik uyarısı)
- [x] Ortak admin bileşenleri (StatCard/AppointmentCard/ConfirmDialog)

### İçerik & SEO (2026-07-22 eklendi)
- [x] PWA ikon seti (72–512px + apple-touch-icon)
- [x] `next/font` geçişi (Google Fonts performans iyileştirmesi)
- [x] `LocalBusiness`/`FAQPage`/`Service`/`Article` JSON-LD şemaları (gerçekten render ediliyor)
- [x] Blog / Berber Rehberi (`/blog`) — Anamur & Bozyazı odaklı 5 makale
- [x] Anamur Berber (`/anamur-berber`) ve Bozyazı Berber (`/bozyazi-berber`) yerel SEO sayfaları
- [x] Gerçek Google Haritalar embed
- [x] Hizmetler sayfasında detaylı "nelere dahil" içeriği
- [x] About sayfasında rol bazlı Ekibimiz bölümü

---

## 🔄 Devam Eden / TODO

### Yüksek Öncelik
- [ ] Firebase kurulumu (gerçek proje credentials)
- [ ] Admin kullanıcısı Firebase'de oluşturulması
- [ ] Production deploy testi
- [ ] **Gerçek işletme bilgisi:** açık adres, telefon, Instagram/Facebook hesabı (`src/lib/constants.ts` içinde `TODO` işaretli yer tutucular var — bkz. `_project-system/memory/technical-debt.md`)

### Orta Öncelik
- [ ] SMS/Email randevu bildirimi (Firebase Functions)
- [ ] Haftalık/aylık takvim görünümü admin panelinde
- [ ] Randevu hatırlatma sistemi
- [ ] Google Analytics entegrasyonu
- [ ] Sunucu taraflı sayfalama (appointments/services tam koleksiyon çekiyor)
- [ ] Ekip fotoğrafları/isimleri (About sayfasında yer tutucu var)

### Düşük Öncelik
- [ ] Çoklu dil desteği (i18n)
- [ ] Saç stili galeri sayfası
- [ ] Gerçek müşteri yorumları (Google Business entegrasyonu ile — sahte yorum eklenmedi, bkz. `_project-system/docs/security.md`)
- [ ] WhatsApp entegrasyonu

---

## 🐛 Bilinen Sorunlar

- `date-fns/locale/tr` dynamic import appointment sayfasında — statik import'a alınmalı
- Firebase credentials eksik — `.env.local` doldurulana kadar Firestore bağlantısı çalışmaz
- `src/app/` altında route group ile aynı isimli boş/duplicate klasörler var (bkz. `_project-system/memory/technical-debt.md` TD-003)
- `appointments` iptal/silindiğinde `publicSlots.bookedTimes`'tan temizlenmiyor (bkz. TD-006)

---

## 📊 Optimizasyon Notları

- Tüm sayfalar statik export (`output: 'export'`)
- Framer Motion lazy loaded
- Image optimization: `unoptimized: true` (static export gereği)
- Firebase SDK sadece client-side kullanılıyor
- Lighthouse hedefi: Performance 90+, SEO 100, Accessibility 95+

---

## 📁 Dosya Sayısı

| Kategori | Dosya Sayısı |
|---------|-------------|
| Sayfalar | 20 (blog dahil, `/blog/[slug]` 5 yazı üretir) |
| Bileşenler | 23+ (admin ortak bileşenler dahil) |
| Servisler | 3 |
| Hook'lar | 2 |
| Config | 8 |

**Versiyon:** v0.2.0
