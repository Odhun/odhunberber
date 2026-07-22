# Proje Yapısı

## Amaç
Mevcut klasör yapısını belgelemek; yeni kodun nereye ekleneceğini netleştirmek.

## Kapsam
`src/` altındaki gerçek uygulama kodu ve kök dizindeki konfigürasyon dosyaları.

## Kullanım Şekli
Yeni bir dosya eklemeden önce bu tabloya bakılır; hangi klasörün amacı ile uyuşuyorsa oraya eklenir. Mevcut yapıyla çelişen yeni bir klasör oluşturulmaz.

## Klasör Haritası

| Klasör | Amacı | İçerebileceği | İçermemesi Gereken | Bağımlılık Yönü |
|---|---|---|---|---|
| `src/app/` | Next.js App Router sayfaları/route'ları | `page.tsx`, `layout.tsx`, route group'lar (`(public)`) | İş mantığı, doğrudan Firestore sorgusu | `components`, `services`, `hooks`, `lib`, `types`'a bağımlı olabilir |
| `src/app/(public)/` | Herkese açık sayfalar (about, appointment, contact, cookies, kvkk, prices, privacy, services, terms) | Sayfa bileşenleri | Admin'e özel mantık | — |
| `src/app/admin/` | Admin paneli sayfaları | Dashboard, randevular, schedule, services, settings, login | Herkese açık içerik | `useAuth` üzerinden yetki kontrolü şart |
| `src/components/home/` | Ana sayfa bölümleri | Hero, Services, Prices, WorkingHours, Location section bileşenleri | Randevu/admin mantığı | `ui` bileşenlerine bağımlı olabilir |
| `src/components/booking/` | Randevu akışı bileşenleri | Calendar, TimeSlotPicker, AppointmentForm | Admin'e özel bileşenler | `services/appointments.ts`, `hooks` |
| `src/components/admin/` | Admin'e özel bileşenler | Liste, form, tablo bileşenleri | Herkese açık sayfa bileşenleri | `services`, `hooks/useAuth` |
| `src/components/layout/` | Sayfa iskeleti | Navbar, Footer, AdminLayout | Sayfa içeriği | — |
| `src/components/ui/` | Genel/tekrar kullanılabilir UI primitive'leri | Button, Card, Modal, Input, Select, Badge, Skeleton | Domain'e özel iş mantığı | Bağımlılığı olmamalı (en alt katman) |
| `src/firebase/` | Firebase client kurulumu | `config.ts` (app/auth/db init), `rules.txt` (kuralların kopyası) | İş mantığı, sorgu fonksiyonları | `services` bu katmana bağımlı |
| `src/services/` | Firestore veri erişim katmanı (repository benzeri) | Koleksiyon başına bir dosya (`appointments.ts`, `services.ts`, `settings.ts`) | UI/bileşen kodu | `firebase/config.ts`, `types` |
| `src/hooks/` | React hook'ları | `useAuth`, `useAppointments`, `useIsMobile` | Doğrudan Firestore sorgusu (services üzerinden geçmeli) | `services`, `firebase` |
| `src/lib/` | Sabitler ve genel yardımcı fonksiyonlar | `constants.ts`, `utils.ts` | Domain'e özel iş mantığı | Bağımlılığı olmamalı |
| `src/utils/` | **Boş** — kullanılmıyor | — | Yeni dosya eklenmemeli, bkz. [coding-standards.md](coding-standards.md) | — |
| `src/types/` | Paylaşılan TypeScript tipleri | `index.ts` | Bileşene özel tek kullanımlık tip | Her katman buna bağımlı olabilir |
| `src/styles/` | Global stiller | Tailwind/global CSS ek dosyaları | — | — |
| `public/` | Statik dosyalar, PWA çıktıları | `manifest.json`, `robots.txt`, service worker (`sw.js`, `workbox-*.js` — next-pwa tarafından otomatik üretilir) | Elle düzenlenmemeli (build çıktısı) | — |
| `out/` | `next build` (static export) çıktısı | Build artefaktı | Elle düzenlenmemeli, git'e commit edilmemeli (Doğrulanamadı: `.gitignore` durumu kontrol edilmeli) | — |

## Testlerin Yeri
Durum: Doğrulanamadı/Kurulu değil. Proje içinde bir test klasörü veya test dosyası tespit edilmedi. Bkz. [testing.md](testing.md).

## Paylaşılan Kodun Yeri
- Genel UI primitive'leri → `src/components/ui/`
- Genel sabitler/yardımcılar → `src/lib/`
- Paylaşılan tipler → `src/types/index.ts`

## Bilinen Yapısal Tutarsızlık
`src/app/` altında route group (`(public)`) içindeki sayfalarla **aynı isimde boş klasörler** doğrudan `src/app/` altında da var (`about`, `appointment`, `contact`, `cookies`, `kvkk`, `prices`, `privacy`, `services`, `terms`). Bu görev kapsamında **dokunulmadı**. Durum: Doğrulanamadı — proje sahibi tarafından silinip silinemeyeceği teyit edilmeli. Bkz. [technical-debt.md](../memory/technical-debt.md).

## Yeni Modül Ekleme Kuralı
Yeni bir domain (ör. "gallery", "reviews") eklenecekse: `src/components/<domain>/`, gerekiyorsa `src/services/<domain>.ts`, tipler `src/types/index.ts`'e eklenir, sayfa `src/app/(public)/<domain>/page.tsx` altına konur.

## Örnekler
Yukarıdaki tabloya bakınız.

## Güncelleme Koşulları
Yeni bir üst düzey klasör eklendiğinde veya mevcut klasörün sorumluluğu değiştiğinde güncellenmelidir.

## İlgili Dosyalar
[coding-standards.md](coding-standards.md), [../architecture/modules.md](../architecture/modules.md)

## Son Güncelleme
2026-07-15
