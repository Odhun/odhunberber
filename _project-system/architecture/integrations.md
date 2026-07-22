# Entegrasyonlar

## Amaç
Üçüncü taraf servis bağımlılıklarını tek yerden listelemek.

## Kapsam
Tüm dış servis entegrasyonları.

## Kullanım Şekli
Yeni bir üçüncü taraf servis eklenmeden önce burası kontrol edilir; ekleme sonrası burası güncellenir.

## Entegrasyon Listesi

| Servis | Amaç | Nerede Kullanılıyor | Kritiklik |
|---|---|---|---|
| Firebase Authentication | Admin girişi | `src/hooks/useAuth.ts` | Yüksek — admin paneline erişim buna bağlı |
| Firebase Firestore | Tüm veri saklama | `src/services/*.ts`, `src/firebase/config.ts` | Yüksek — tüm uygulama buna bağlı |
| Firebase Hosting | Production barındırma | `firebase.json`, `.github/workflows/deploy.yml` | Yüksek |
| GitHub Actions | CI/CD | `.github/workflows/deploy.yml`, `deploy-ghpages.yml` | Orta |
| next-pwa / Workbox | Service worker, offline destek | `next.config.js`, `public/sw.js` (üretilen) | Orta |
| Google Maps | Statik konum linki | `CONTACT.mapUrl` (`src/lib/constants.ts`) | Düşük — API entegrasyonu değil, düz link |
| Instagram / Facebook | Sosyal medya linkleri | `CONTACT` sabitleri | Düşük |

## Entegre Olmayan / Yok Sayılan Servisler
- SMS/e-posta bildirim servisi (Twilio, SendGrid vb.) — **yok**, backlog'da (bkz. [../docs/roadmap.md](../docs/roadmap.md)).
- Ödeme servisi — **yok**, kapsam dışı (bkz. [../docs/product.md](../docs/product.md)).
- Analytics (Google Analytics) — **yok**, backlog'da.
- Captcha/App Check (bot koruması) — **yok**, bilinen güvenlik riski (bkz. [../docs/security.md](../docs/security.md)).

## Güncelleme Koşulları
Yeni bir dış servis eklendiğinde veya kaldırıldığında güncellenmelidir.

## İlgili Dosyalar
[system-design.md](system-design.md), [../docs/security.md](../docs/security.md)

## Son Güncelleme
2026-07-15
