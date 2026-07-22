# CHANGELOG

## [0.2.0] — 2026-07-22

### Eklendi
- Blog / Berber Rehberi bölümü (`/blog`, `/blog/[slug]`) — Anamur ve Bozyazı odaklı 5 makale, FAQ + Article JSON-LD
- Anamur Berber (`/anamur-berber`) ve Bozyazı Berber (`/bozyazi-berber`) yerel SEO sayfaları
- PWA ikon seti (`public/icons/*.png`, 72–512px + apple-touch-icon) — önceden tamamen eksikti
- Admin panelinde haftalık analiz kartları (en çok tercih edilen hizmet, haftalık randevu sayısı, tahmini haftalık ciro)
- Admin randevu sayfasında tarih aralığı filtresi
- Ortak admin bileşenleri: `StatCard`, `AppointmentCard`, `ConfirmDialog` (native `confirm()` yerine)
- Hizmetler sayfasında her hizmete özel "nelere dahil" listesi
- About sayfasında rol bazlı "Ekibimiz" bölümü
- Gerçek Google Haritalar embed (Ana Sayfa + İletişim sayfası)

### Değiştirildi
- Google Fonts `next/font/google`'a taşındı (CSS `@import` kaldırıldı, performans/CLS iyileştirmesi)
- `LocalBusiness` JSON-LD şeması artık gerçekten render ediliyor (önceden tanımlı ama kullanılmayan ölü koddu); `FAQPage`, `Service`, `Article` şemaları eklendi
- Site içeriği Anamur/Mersin odaklı güncellendi (başlıklar, meta açıklamalar, Hero, About)
- Hero ve About'taki doğrulanamayan sayısal istatistikler ("500+ Müşteri", "5★", "3+ Yıl") niteliksel ifadelerle değiştirildi
- Admin şifre/giriş hataları artık ağ hatası / yanlış kimlik bilgisi olarak ayrı gösteriliyor
- Çalışma saatleri sayfasına açılış/kapanış doğrulaması ve tekrarlayan tatil günü engeli eklendi
- Ayarlar sayfasına e-posta/telefon format doğrulaması ve "kaydedilmemiş değişiklik" uyarısı eklendi

### Düzeltildi
- Footer'daki `v0.1.0` geliştirme artığı kaldırıldı
- Pazar günü için anlamsız (kullanılmayan) çalışma saati değerleri temizlendi

### Bilinen Sınırlamalar
- Gerçek işletme adresi/telefonu/sosyal medya hesapları henüz doğrulanmadı — `src/lib/constants.ts` içinde `TODO` olarak işaretli, yer tutucu değerler kullanılıyor
- Sunucu taraflı sayfalama hâlâ yok (bkz. `_project-system/memory/technical-debt.md`)

## [0.1.0] — 2025-01-01

### Eklendi
- İlk proje kurulumu ve tam yapı
- Next.js 14 + TypeScript + TailwindCSS
- Firebase Authentication ve Firestore entegrasyonu
- 3 adımlı randevu akışı (Tarih → Saat → Form)
- Mobil uyumlu takvim bileşeni
- Saat durumu gösterimi (boş/dolu/beklemede)
- Admin paneli (dashboard, randevular, schedule, hizmetler, ayarlar)
- PWA desteği (manifest, next-pwa)
- SEO optimizasyonu (metadata, sitemap, robots, schema.org)
- GitHub Actions CI/CD
- Firebase Hosting konfigürasyonu
- Tüm yasal sayfalar (KVKK, Gizlilik, Çerez, Koşullar)
- Dark mode premium tasarım (siyah + altın tema)
- Glassmorphism ve Framer Motion animasyonlar
- Toast bildirimleri ve loading skeletonları
- Firestore güvenlik kuralları
