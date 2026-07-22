# Deployment Standartları

## Amaç
Mevcut deployment sürecini olduğu gibi belgelemek.

## Kapsam
Lokal geliştirme, build, Firebase Hosting deploy'u ve GitHub Pages alternatif deploy'u.

## Kullanım Şekli
Deployment sürecinde değişiklik yapılmadan önce bu dosya güncellenmeli; süreç kullanıcı onayı olmadan değiştirilmemeli.

## Ortamlar

### Lokal Geliştirme
```bash
npm install
cp .env.example .env.local   # Firebase config doldurulur
npm run dev
```

### Test / Staging Ortamı
Durum: Doğrulanamadı. `.firebaserc` içinde tek proje tanımlı (`odhunberber`) — ayrı bir staging/test Firebase projesi **tespit edilmedi**. Aksiyon: Proje sahibinden staging ortamı olup olmadığı teyit edilmeli.

### Production Ortamı
Firebase Hosting, proje: `odhunberber` (bkz. `.firebaserc`). Statik dosyalar `out/` klasöründen sunulur (`firebase.json` → `hosting.public: "out"`).

## Ortam Değişkenleri
`.env.example` içinde tanımlı, `NEXT_PUBLIC_` önekli (tarayıcıya gömülür, gizli olamaz):
`NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`, `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`, `NEXT_PUBLIC_FIREBASE_APP_ID`, `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`, `NEXT_PUBLIC_ADMIN_EMAIL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_NAME`.
GitHub Actions'ta bu değerler repo Secrets üzerinden enjekte edilir (bkz. `.github/workflows/deploy.yml`).

## Build Süreci
```bash
npm run build
```
`next.config.js`: `output: 'export'` (statik export), `trailingSlash: true`, `images.unoptimized: true`. `next-pwa` build sırasında `public/sw.js` ve `public/workbox-*.js` dosyalarını üretir (development'ta devre dışı).
GitHub Pages hedefi için `DEPLOY_TARGET=ghpages` ortam değişkeni ile `basePath`/`assetPrefix` `/odhunberber` olarak ayarlanır (bkz. `.github/workflows/deploy-ghpages.yml`).

## Migration Süreci
Firestore şemasız (NoSQL) olduğu için geleneksel migration aracı yoktur. Kural/index değişiklikleri:
```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```
Bkz. [../database/migrations.md](../database/migrations.md).

## Deployment Öncesi Kontroller
Durum: Doğrulanamadı — otomatik bir pre-deploy checklist/test adımı GitHub Actions workflow'unda **yoktur** (workflow doğrudan `npm ci` → `npm run build` → deploy yapıyor, test/lint adımı içermiyor). Aksiyon: bkz. [checklists/release.md](../checklists/release.md) — manuel kontrol listesi önerilir.

## Deployment Süreçleri
- **Firebase Hosting (ana):** `main` branch'e push → `.github/workflows/deploy.yml` → `npm ci` → `npm run build` → `FirebaseExtended/action-hosting-deploy` ile deploy. Tek komutla lokalden: `npm run deploy` (`next build && firebase deploy`).
- **GitHub Pages (alternatif):** `.github/workflows/deploy-ghpages.yml` — Durum: Doğrulanamadı, bu workflow'un ne zaman/neden tetiklendiği (aktif mi, yedek mi) teyit edilmeli.

## Rollback Yöntemi
Durum: Doğrulanamadı. Firebase Hosting kendi içinde önceki release'e dönüş desteği sunar (Firebase Console → Hosting → Release geçmişi) ancak projeye özel bir rollback prosedürü belgelenmemiş.

## Yedekleme
Durum: Doğrulanamadı. Firestore için otomatik yedekleme (scheduled export) yapılandırıldığına dair kod/konfigürasyon **tespit edilmedi**. Aksiyon: Proje sahibinden teyit edilmeli — randevu verisi kaybı riski taşır.

## Sağlık Kontrolü / Log Kontrolü
Durum: Doğrulanamadı. Uygulama tarafında bir health-check endpoint'i yoktur (statik site). Firebase Console üzerinden Hosting/Firestore kullanım metrikleri izlenebilir; ayrı bir monitoring/alerting servisi tespit edilmedi.

## Sürüm Numaralandırma / Release Notları
`package.json` içinde `version: 0.1.0`. Sürüm artırma süreci resmi olarak tanımlanmamış (Semantic Versioning varsayılıyor). Release notları için bkz. [../templates/release-notes.md](../templates/release-notes.md).

## Örnekler
Yukarıdaki komutlara bakınız.

## Güncelleme Koşulları
Deployment adımı, hosting hedefi veya ortam değişkeni değiştiğinde güncellenmelidir.

## İlgili Dosyalar
[../checklists/release.md](../checklists/release.md), [../database/migrations.md](../database/migrations.md)

## Son Güncelleme
2026-07-15
