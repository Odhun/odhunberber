# Modüller

## Amaç
Her modülün sorumluluğunu ve bağımlılıklarını tek yerden görünür kılmak.

## Kapsam
`src/` altındaki fonksiyonel modüller.

## Kullanım Şekli
Yeni kod eklenirken hangi modüle ait olduğu burada aranır; uymuyorsa yeni bir modül girdisi eklenir.

## Modül Listesi

### booking (Randevu Akışı)
- **Sorumluluğu:** Misafir kullanıcının tarih/saat seçip randevu oluşturması.
- **Bileşenler:** `AppointmentCalendar.tsx`, `TimeSlotPicker.tsx`, `AppointmentForm.tsx` (`src/components/booking/`).
- **Kullandığı servisler:** `src/services/appointments.ts` (`createAppointment`, `getPublicBookedSlots`).
- **Firestore koleksiyonları:** `appointments` (create), `publicSlots` (read/write).
- **Bağımlılıkları:** `useAppointments` hook, `types/index.ts` (`Appointment`, `TimeSlot`).
- **Bilinen problemleri:** Saat çakışması sunucu tarafında doğrulanmıyor (race condition riski) — bkz. [../docs/security.md](../docs/security.md).

### admin (Yönetim Paneli)
- **Sorumluluğu:** Randevu onay/iptal/silme, çalışma saatleri, tatil günleri, hizmet ve site ayarları yönetimi.
- **Sayfalar:** `src/app/admin/` (`appointments`, `schedule`, `services`, `settings`, `login`, dashboard `page.tsx`).
- **Bileşenler:** `src/components/admin/`, `AdminLayout.tsx` (`src/components/layout/`).
- **Kullandığı servisler:** `src/services/appointments.ts`, `services.ts`, `settings.ts`.
- **Bağımlılıkları:** `useAuth` (route koruması — `isAdmin` kontrolü).
- **Bilinen problemleri:** Yetki kontrolü client-side `isAdmin` + Firestore rule ayrı ayrı tanımlı, senkron değil — bkz. [../docs/security.md](../docs/security.md).

### home (Ana Sayfa)
- **Sorumluluğu:** Tanıtım, hizmet/fiyat özeti, çalışma saatleri, konum.
- **Bileşenler:** `src/components/home/` (`HeroSection`, `ServicesSection`, `PricesSection`, `WorkingHoursSection`, `LocationSection`).
- **Kullandığı servisler:** Muhtemelen `src/services/services.ts`, `settings.ts` (Doğrulanamadı — bileşen içeriği bu görevde satır satır incelenmedi).
- **Bağımlılıkları:** `ui` bileşenleri.

### layout (Sayfa İskeleti)
- **Sorumluluğu:** Navigasyon, footer, admin sarmalayıcı.
- **Bileşenler:** `Navbar.tsx`, `Footer.tsx`, `AdminLayout.tsx`.

### ui (Genel Bileşenler)
- **Sorumluluğu:** Tekrar kullanılabilir, domain'e bağımsız UI primitive'leri.
- **Bileşenler:** `Button`, `Card`, `Modal`, `Input`, `Select`, `Badge`, `Skeleton`.
- **Bağımlılıkları:** Yok (en alt katman).

### services (Veri Erişim Katmanı)
- **Sorumluluğu:** Firestore CRUD işlemlerini merkezi tutmak.
- **Dosyalar:** `appointments.ts` (randevu + publicSlots), `services.ts` (hizmet listesi — Doğrulanamadı, içerik satır satır okunmadı), `settings.ts` (site ayarları/çalışma programı — Doğrulanamadı).
- **Dışa sunduğu fonksiyonlar (appointments.ts):** `createAppointment`, `getPublicBookedSlots`, `getAppointmentsByDate`, `getAllAppointments`, `updateAppointmentStatus`, `deleteAppointment`, `getBookedSlots`.

### hooks
- **`useAuth`:** Firebase Auth durumu, `signIn`/`signOut`, `isAdmin` hesaplama.
- **`useAppointments`:** Randevu verisi için React state yönetimi (Doğrulanamadı — içerik satır satır incelenmedi, isimden çıkarım yapıldı).
- **`useIsMobile`:** Responsive/mobil algılama.

### firebase (Altyapı)
- **Sorumluluğu:** Firebase app/auth/db başlatma (`config.ts`), `isFirebaseConfigured()` kontrolü.
- **`rules.txt`:** `firestore.rules` dosyasının eski bir kopyası — **doğrulandı, senkron değil.** `diff` karşılaştırmasında `rules.txt` içinde `customerPhone.size() >= 10 && <= 15` telefon uzunluk doğrulaması var, ancak asıl deploy edilen `firestore.rules` içinde bu kontrol **yok** (yalnızca `is string`). Yani gerçek kural, yedek dosyadan daha gevşek. Bkz. [../memory/technical-debt.md](../memory/technical-debt.md).

## Güncelleme Koşulları
Yeni bir modül eklendiğinde veya mevcut modülün sorumluluğu değiştiğinde güncellenmelidir.

## İlgili Dosyalar
[system-design.md](system-design.md), [../docs/project-structure.md](../docs/project-structure.md)

## Son Güncelleme
2026-07-15
