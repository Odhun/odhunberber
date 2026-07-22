# Veritabanı Şeması (Firestore)

## Amaç
Firestore koleksiyonlarını, alanlarını ve ilişkilerini belgelemek. Firestore şemasız (NoSQL) olduğu için bu dosya **tek gerçek şema kaynağıdır** — kod dışında başka bir şema tanımı yoktur.

## Kapsam
`src/types/index.ts` ve `firestore.rules`'tan çıkarılan koleksiyon yapıları.

## Koleksiyonlar

### `appointments`
| Alan | Tip | Zorunlu (create) | Açıklama |
|---|---|---|---|
| `id` | string (doc id) | — | Firestore otomatik ID |
| `customerName` | string (2-100 karakter) | ✅ | |
| `customerPhone` | string | ✅ | Format doğrulaması **yok** (bkz. [data-integrity.md](data-integrity.md)) |
| `serviceId` | string | ✅ | `services` koleksiyonuna mantıksal referans (foreign key değil, Firestore'da doğrulanmıyor) |
| `serviceName` | string | ✅ | Denormalize edilmiş — `services.name` ile senkron tutulmalı |
| `date` | string `YYYY-MM-DD` | ✅ | |
| `time` | string `HH:MM` | ✅ | |
| `status` | `'pending' \| 'confirmed' \| 'cancelled'` | ✅ (yalnızca `pending` ile create) | |
| `adminNote` | string (opsiyonel) | — | |
| `createdAt` | string ISO 8601 | ✅ | |
| `updatedAt` | string ISO 8601 | ✅ | |

**Index:** `(date ASC, status ASC)` ve `(status ASC, date ASC)` (`firestore.indexes.json`).
**Silme davranışı:** Sert silme (`deleteAppointment` → `deleteDoc`), soft delete yok.
**Audit alanı:** `createdAt`/`updatedAt` var; kim değiştirdi (admin uid) bilgisi **tutulmuyor**.

### `publicSlots` (doc id = tarih `YYYY-MM-DD`)
| Alan | Tip | Açıklama |
|---|---|---|
| `date` | string | Doküman id ile aynı değer |
| `bookedTimes` | string[] | Dolu saatler, müşteri verisi içermez |

### `services`
Şu alanlar `Service` tipinden çıkarılmıştır (`src/types/index.ts`): `id`, `name`, `description`, `duration` (dakika), `price` (TRY), `isActive`, `order`.

### `settings` (muhtemelen tek doküman, `SiteSettings` tipine karşılık gelir)
`shopName`, `phone`, `email`, `address`, `mapUrl`, `instagram?`, `facebook?`, `twitter?`, `workingSchedule` (gömülü `WorkingSchedule` — 7 gün × `WorkingHours{isOpen, openTime, closeTime, slotInterval}`).
Doğrulandı (2026-07-22): `settings` koleksiyonu iki sabit doküman ID kullanır — `settings/siteConfig` (`SiteSettings`, `getSiteSettings`/`updateSiteSettings`) ve `settings/workingHours` (`WorkingSchedule`, `getWorkingSchedule`/`updateWorkingSchedule`), bkz. `src/services/settings.ts`.

### `blockedDates`
`id`, `date` (`YYYY-MM-DD`), `reason?`, `blockedSlots?: string[]` (boşsa tüm gün kapalı).

### `slots` (firestore.rules'ta tanımlı, kullanım yeri bulunamadı)
Durum: Doğrulanamadı — muhtemelen kullanılmayan/artık bir kural. Bkz. [../memory/technical-debt.md](../memory/technical-debt.md).

## İçerik Katmanı (Firestore Dışı)
2026-07-22 itibarıyla blog içeriği (`/blog`, `/blog/[slug]`) **Firestore'da değil**, statik bir TS veri dosyasında tutulur: `src/lib/blog-posts.ts` (`BLOG_POSTS` dizisi, `BlogPost` tipi: `slug`, `title`, `excerpt`, `category`, `publishedAt`, `sections`, `faq`). Bu, `output: 'export'` statik export mimarisiyle uyumlu, CMS/backend gerektirmeyen bir içerik modelidir. Yeni makale eklemek için bu diziye yeni bir `BlogPost` girdisi eklenir; Firestore şeması etkilenmez.

## İlişkiler
Firestore doküman referansı (gerçek foreign key) kullanılmıyor — ilişkiler string ID ile mantıksal olarak kuruluyor (`appointments.serviceId` ↔ `services.id`). Bütünlük veritabanı seviyesinde **garanti edilmiyor** (bkz. [data-integrity.md](data-integrity.md)).

## Kritik Veri Kuralları
- `appointments.status` yalnızca `pending` ile oluşturulabilir (bkz. [../docs/business-rules.md](../docs/business-rules.md)).
- `publicSlots` asla müşteri kişisel verisi (`customerName`, `customerPhone`) içermemeli — bu, mimari bir gizlilik sınırıdır, ihlal edilmemelidir.

## Güncelleme Koşulları
Yeni bir koleksiyon/alan eklendiğinde veya mevcut alan kaldırıldığında güncellenmelidir; `src/types/index.ts` ile birlikte tutulmalıdır.

## İlgili Dosyalar
[naming.md](naming.md), [data-integrity.md](data-integrity.md), [../docs/business-rules.md](../docs/business-rules.md)

## Son Güncelleme
2026-07-22
