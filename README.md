# Odhun Berber — Randevu Sistemi

Premium erkek kuaförü web tabanlı randevu sistemi.

## Teknoloji Yığını

- **Frontend:** Next.js 14, TypeScript, TailwindCSS, Framer Motion
- **Backend:** Firebase Firestore, Firebase Authentication
- **Deploy:** Firebase Hosting / GitHub Actions
- **PWA:** next-pwa (offline support, installable)

---

## Kurulum

### 1. Depoyu klonla

```bash
git clone https://github.com/kullaniciadi/odhun-berber.git
cd odhun-berber
```

### 2. Bağımlılıkları yükle

```bash
npm install
```

### 3. Ortam değişkenlerini ayarla

```bash
cp .env.example .env.local
```

`.env.local` dosyasını Firebase proje bilgilerinizle doldurun.

### 4. Geliştirme sunucusunu başlat

```bash
npm run dev
```

---

## Firebase Kurulumu

### Firebase Projesi Oluştur

1. [Firebase Console](https://console.firebase.google.com) → Yeni Proje
2. Authentication → Email/Password etkinleştir
3. Firestore Database → Test mode ile oluştur
4. Proje Ayarları → Web Uygulaması Ekle → Config bilgilerini kopyala

### Firebase CLI

```bash
npm install -g firebase-tools
firebase login
firebase init
```

### Firestore Kuralları Deploy

```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

### Admin Kullanıcı Oluştur

Firebase Console → Authentication → Users → "Add user"
E-posta: `admin@odhunberber.com` (veya `.env`'de belirlediğiniz adres)

---

## Ortam Değişkenleri

| Değişken | Açıklama |
|----------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API anahtarı |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase proje ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | App ID |
| `NEXT_PUBLIC_ADMIN_EMAIL` | Admin e-posta adresi |
| `NEXT_PUBLIC_SITE_URL` | Site URL (production) |

---

## Deploy

### Firebase Hosting

```bash
npm run build
firebase deploy --only hosting
```

Veya tek komutla:

```bash
npm run deploy
```

### GitHub Actions (Otomatik)

`.github/workflows/deploy.yml` yapılandırıldı. GitHub repo ayarlarından şu Secret'ları ekle:

- `FIREBASE_SERVICE_ACCOUNT` — Firebase service account JSON
- Tüm `NEXT_PUBLIC_*` değişkenleri

`main` branch'e push edildiğinde otomatik deploy başlar.

---

## Proje Yapısı

```
src/
├── app/
│   ├── (public)/          # Kullanıcı sayfaları (Navbar + Footer layout)
│   │   ├── page.tsx       # Ana sayfa
│   │   ├── appointment/   # Randevu al
│   │   ├── prices/        # Fiyat listesi
│   │   ├── services/      # Hizmetler
│   │   ├── about/         # Hakkımızda
│   │   ├── contact/       # İletişim
│   │   └── (legal)/       # Gizlilik, KVKK, Çerez, Koşullar
│   ├── admin/             # Admin paneli (korumalı)
│   │   ├── login/         # Admin girişi
│   │   ├── appointments/  # Randevu yönetimi
│   │   ├── schedule/      # Çalışma saatleri
│   │   ├── services/      # Hizmet yönetimi
│   │   └── settings/      # Site ayarları
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Button, Card, Input, Modal, Badge...
│   ├── layout/            # Navbar, Footer, AdminLayout
│   ├── booking/           # Calendar, TimeSlotPicker, AppointmentForm
│   └── home/              # Hero, Services, Prices, Location...
├── firebase/              # Firebase config
├── hooks/                 # useAuth, useAppointments
├── services/              # Firestore CRUD (appointments, services, settings)
├── types/                 # TypeScript interfaces
└── lib/                   # utils, constants
```

---

## Kullanım

### Kullanıcı Akışı

1. Ana sayfada hizmetleri ve fiyatları gör
2. "Randevu Al" butonuna tıkla
3. Takvimden tarih seç
4. Uygun saati seç
5. Ad/soyad, telefon ve hizmet bilgilerini gir
6. Randevu talebi oluştur → Admin onayı bekle

### Admin Akışı

1. `/admin/login` → Email/şifre ile giriş
2. Dashboard'da bekleyen randevuları gör
3. Onayla / İptal et / Not ekle
4. Çalışma saatlerini düzenle
5. Tatil günleri ekle
6. Hizmet listesini yönet

---

## Güvenlik

- Admin route'ları Firebase Auth ile korunur
- Firestore rules: kullanıcılar sadece randevu oluşturabilir
- XSS: React built-in koruma
- Form validation: Zod + React Hook Form
- Turkish phone validation

---

## PWA Özellikleri

- Telefona eklenebilir (Add to Home Screen)
- Offline fallback
- Splash screen
- App-like navigation
