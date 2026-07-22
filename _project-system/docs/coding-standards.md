# Kodlama Standartları

## Amaç
Projede mevcut olan (kod ve konfigürasyondan tespit edilen) kodlama standardını tek bir yerde belgelemek ve gelecekteki AI/insan katkılarının bu standarda uymasını sağlamak.

## Kapsam
TypeScript/Next.js (App Router), TailwindCSS, Firebase client SDK kullanımı.

## Kullanım Şekli
Yeni dosya/fonksiyon/değişken eklerken bu dosyadaki kurallara uyulmalı. Mevcut kodda bu standarda uymayan bir örnek görülürse (bkz. "Bilinen Sapmalar") kural yine bu dosyadaki gibi uygulanır, sapma ayrıca düzeltilmeye çalışılmaz (kapsam dışı refactor yasak).

## Kurallar

### Format (araçsal, otomatik uygulanır)
- Prettier (`.prettierrc`): tek tırnak (`singleQuote`), noktalı virgül zorunlu (`semi`), ES5 trailing comma, 2 boşluk indent, `prettier-plugin-tailwindcss` ile class sıralaması otomatik.
- ESLint (`.eslintrc.json`): `next/core-web-vitals` taban alınır. `no-unused-vars` yalnızca `warn`. `react/no-unescaped-entities` ve `@next/next/no-img-element` kapalı.
- Bu iki araç zaten yapılandırılmış; yeni bir formatlama kuralı önerilmeden önce mevcut config'e bakılmalı.

### Klasör isimleri
- Küçük harf, kebab-case değil düz kelime (`components`, `services`, `hooks`, `lib`, `firebase`) — proje App Router + domain klasörleri kullanıyor: `src/components/{home,booking,admin,layout,ui}`, tek kelime domain isimleri.
- Yeni bir domain bileşen grubu eklenecekse `src/components/<domain>/` altına eklenir, mevcut isimlendirme (tekil/çoğul karışık: `booking`, `home` — tekil kavramsal isim) korunmalı.
- `src/utils/` klasörü **boş** — gerçek yardımcı fonksiyonlar `src/lib/utils.ts` içinde. İki ayrı "utils" konumu var; yeni kod eklenirken **`src/lib/utils.ts`** tercih edilmeli, `src/utils/` kullanılmamalı (bkz. [technical-debt.md](../memory/technical-debt.md)).

### Dosya isimleri
- React bileşenleri: PascalCase (`AppointmentForm.tsx`, `TimeSlotPicker.tsx`).
- Servis/hook/lib dosyaları: camelCase (`appointments.ts`, `useAuth.ts`, `constants.ts`).
- Next.js App Router özel dosyaları: framework standardı (`page.tsx`, `layout.tsx`, `not-found.tsx`, `sitemap.ts`).
- `temp`, `final`, `new-file`, `test2` gibi geçici isimler kullanılmamalı.

### Değişken / fonksiyon isimleri
- Anlamlı İngilizce isimler (kod tabanı İngilizce isimlendirme + Türkçe UI metni/yorum karışımı kullanıyor — bu ayrım korunmalı: **kod İngilizce, kullanıcıya gösterilen metin ve iş kuralı yorumları Türkçe**).
- Boolean değişkenler `is`/`has` ile başlar (`isOpen`, `isActive`, `isAdmin`, `isFirebaseConfigured`).
- Fonksiyonlar fiil ile başlar ve tek iş yapar (`createAppointment`, `getPublicBookedSlots`, `updateAppointmentStatus`).

### Servis / veri erişim katmanı
- Firestore erişimi yalnızca `src/services/*.ts` içinde toplanmalı (mevcut: `appointments.ts`, `services.ts`, `settings.ts`). Bileşen içinde doğrudan `firebase/firestore` importu yapılmamalı.
- `src/firebase/config.ts` yalnızca Firebase app/auth/db initialize eder — iş mantığı buraya eklenmemeli.
- Her servis dosyası tek bir Firestore koleksiyon ailesine karşılık gelir (appointments ↔ appointments.ts).
- Genel/kontrolsüz sorgu fonksiyonu eklenmemeli (ör. "getAll" yerine anlamlı filtreli fonksiyon tercih edilmeli — mevcut `getAllAppointments` admin paneli için istisnadır, kapsamı sınırlı kalmalı).

### Tip tanımları
- Tüm paylaşılan tipler `src/types/index.ts` içinde merkezi tutulur. Yeni bir domain tipi eklenirken bu dosyaya eklenmeli, bileşen dosyası içine gömülü tip tanımlanmamalı (mevcut örüntü).

### Sabitler
- Site geneli sabitler `src/lib/constants.ts` içinde (`SITE_NAME`, `CONTACT`, `DEFAULT_WORKING_HOURS`, `DEFAULT_SERVICES`, `STATUS_LABELS`, `STATUS_COLORS`).
- Gizli anahtarlar asla koda yazılmaz — yalnızca `process.env.NEXT_PUBLIC_*` üzerinden okunur (bkz. [security.md](security.md)). `NEXT_PUBLIC_` önekli tüm değişkenler tarayıcıya gömüldüğü için **gizli bilgi içeremez** — bu önek yalnızca genel/açık konfigürasyon için kullanılmalı.

### Path alias
- `@/*` → `src/*` (bkz. `tsconfig.json`). Yeni importlarda göreli (`../../`) yerine `@/` alias'ı tercih edilmeli.

### Yorum satırları
- Kodun ne yaptığını tekrar eden yorum yazılmamalı.
- Karar/iş kuralı nedenini açıklayan kısa yorumlar kullanılabilir (mevcut örnek: `src/services/appointments.ts` içindeki `// Public: reads only booked times, no customer data`).
- Geçici çözümler için proje genelinde bir `TODO`/`FIXME` standardı **tespit edilmedi**. Durum: Doğrulanamadı. Bundan sonra geçici çözüm yorumu eklenirken [technical-debt.md](../memory/technical-debt.md) kaydına referans verilmeli (`// TODO(TD-XXX): ...`).

### Bağımlılıklar
- Yeni paket eklemeden önce mevcut bağımlılıklarla (`clsx`, `tailwind-merge`, `date-fns`, `zod`, `react-hook-form`) çözüm aranmalı.
- Statik export (`output: 'export'`) kısıtı nedeniyle sunucu tarafı çalışacak (Node-only) paketler eklenemez — yalnızca client-side çalışabilen paketler kullanılmalı.

## Bilinen Sapmalar
- `src/app/` altında hem `(public)/about`, `(public)/appointment` gibi route group klasörleri hem de aynı isimde **boş** üst düzey klasörler (`src/app/about`, `src/app/appointment` vb.) bulunuyor. Bu muhtemelen route group'a geçiş sırasında kalan artıklardır. Durum: Doğrulanamadı — silinip silinemeyeceği proje sahibinden teyit edilmeli, bu görev kapsamında dokunulmadı. Bkz. [technical-debt.md](../memory/technical-debt.md), [project-structure.md](project-structure.md).

## Örnekler
Yukarıdaki alt başlıklardaki gerçek dosya adları örnek olarak kullanılmıştır.

## Güncelleme Koşulları
Yeni bir mimari katman, format aracı veya isimlendirme kararı benimsendiğinde güncellenmelidir.

## İlgili Dosyalar
[project-structure.md](project-structure.md), [../memory/technical-debt.md](../memory/technical-debt.md)

## Son Güncelleme
2026-07-15
