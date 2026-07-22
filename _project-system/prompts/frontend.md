# Frontend Promptu

## Amacı
Next.js sayfa/bileşen geliştirmede izlenecek kuralları tanımlamak.

## Ne Zaman Kullanılacağı
`src/app/`, `src/components/`, `src/hooks/` altında sayfa/bileşen/form/state değişikliği yapılırken.

## Gerekli Girdiler
- Hangi modüle ait olduğu (bkz. [../architecture/modules.md](../architecture/modules.md)).
- Varsa ilgili spec (bkz. [../specs/](../specs/)).

## Çalışma Kuralları
- Bkz. [shared-rules.md](shared-rules.md).
- Bileşen, ait olduğu domain klasörüne konur (`home`, `booking`, `admin`, `layout`, `ui`) — bkz. [../docs/project-structure.md](../docs/project-structure.md).
- Form validasyonu `react-hook-form` + `zod` ile yapılır (mevcut örüntü, `AppointmentForm.tsx`).
- Stil: TailwindCSS + `prettier-plugin-tailwindcss` class sıralaması; `clsx`/`tailwind-merge` ile koşullu class.
- `output: 'export'` kısıtı nedeniyle sunucu bileşeni (Server Component) veri çekme deseni yerine, veri client-side Firestore SDK ile (`useEffect`/hook) çekilir — mevcut mimari budur, SSR fetch deseni **eklenmemeli**.
- Yeni bir sayfa route'u eklenirken mevcut `(public)` route group yapısına uyulur; `src/app/` altında route group dışında boş/duplicate klasör oluşturulmaz (bkz. [../docs/coding-standards.md](../docs/coding-standards.md) "Bilinen Sapmalar").
- Responsive/mobil kontrolü için mevcut `useIsMobile` hook'u tercih edilir.
- Erişilebilirlik: buton/form elemanlarında uygun `aria-*`/`label` kullanımı; mevcut `Skeleton` bileşeni loading state için kullanılır.

## Beklenen Çıktı
Değiştirilen bileşen/sayfa + hangi modüle ait olduğu + varsa yeni tip eklentisi (`src/types/index.ts`).

## Yasak İşlemler
Server-side rendering/API route varsayarak kod yazmak (statik export ile çalışmaz) · yeni bir state yönetim kütüphanesi (Redux/Zustand vb.) eklemek (kullanıcı onayı olmadan) · mevcut UI bileşen setini (Button/Card/Modal vb.) gerekçesiz yeniden yazmak.

## Örnek Kullanım Promptu
```
src/components/booking/TimeSlotPicker.tsx içine, seçilen saat "blocked" durumundaysa
tıklanamaz hale getiren bir kontrol ekle. Mevcut TimeSlot tipini (src/types/index.ts)
kullan, yeni tip ekleme.
```

## Görev Sonu Kontrol Listesi
Bkz. [../checklists/task-finish.md](../checklists/task-finish.md).

## Son Güncelleme
2026-07-15
