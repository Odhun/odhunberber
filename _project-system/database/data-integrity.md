# Veri Bütünlüğü

## Amaç
Veri tutarlılığı için hangi kontrollerin var olduğunu ve hangilerinin **olmadığını** açıkça belgelemek.

## Kapsam
`appointments`, `publicSlots`, `services`, `settings`, `blockedDates` koleksiyonları arası tutarlılık.

## Mevcut Kontroller
- `appointments.create`: zorunlu alan kontrolü + `customerName` uzunluk (2-100) + `status == 'pending'` (Firestore Rules seviyesinde).
- Client tarafı: `zod` şeması (`AppointmentForm.tsx`) ile form validasyonu.
- TypeScript tip kontrolü (derleme zamanı, çalışma zamanında garanti değildir — Firestore'dan gelen veri `as Appointment` ile cast ediliyor, örn. `src/services/appointments.ts`: `{ id: d.id, ...d.data() } as Appointment` — çalışma zamanı doğrulaması yok).

## Eksik Kontroller (Bilinen Riskler)
1. **`serviceId` referans bütünlüğü yok:** Bir randevu, artık var olmayan veya silinmiş bir `serviceId`'ye referans verebilir. Firestore, ilişkisel veritabanı gibi foreign key kısıtlaması uygulamaz.
2. **`customerPhone` format doğrulaması yok** (Firestore Rules seviyesinde) — yalnızca `is string`. Gerçek format kontrolü yalnızca istemci `zod` şemasına bağlı; doğrudan Firestore SDK/API çağrısı yapan biri geçersiz telefon formatı yazabilir.
3. **`date`/`time` format doğrulaması yok** (Firestore Rules seviyesinde) — `YYYY-MM-DD`/`HH:MM` formatı yalnızca konvansiyon, kural seviyesinde regex kontrolü yok.
4. **Aynı saat için çift randevu engeli yok (server-side):** İki misafir kullanıcı aynı anda aynı saati seçip gönderirse, Firestore Rules seviyesinde bunu engelleyen bir "unique constraint" yoktur (Firestore zaten bunu native desteklemez, transaction ile yapılması gerekir — kodda transaction kullanımı tespit edilmedi).
5. **`appointments` ↔ `publicSlots` senkronizasyonu tek yönlü ve "best effort":** `createAppointment` içinde `publicSlots` yazımı `try/catch` ile "non-critical" işaretlenmiş; randevu iptal/silindiğinde `publicSlots.bookedTimes`'tan kaldırma işlemi bulunamadı. Bu iki koleksiyon zamanla **birbirinden sapabilir** (bkz. [../architecture/data-flow.md](../architecture/data-flow.md)).
6. **`serviceName` denormalizasyonu:** `appointments.serviceName`, oluşturma anındaki hizmet adının kopyasıdır. Hizmet adı sonradan değişirse geçmiş randevularda eski isim kalır (bu bir tasarım tercihi olabilir — geçmiş kaydın o anki adı yansıtması istenen davranış olabilir; Durum: Doğrulanamadı, kasıtlı mı tespit edilmedi).

## Kurallar (İleriye Dönük)
- Yeni bir referans alanı eklenirken (ör. `blockedDateId`) bütünlük istemci tarafında kontrol edilmeli, Firestore bunu garanti etmez.
- Çakışma/race condition riski taşıyan yazma işlemleri için Firestore `runTransaction` kullanılması önerilir (şu an kullanılmıyor) — bu bir öneridir, kullanıcı onayı olmadan uygulanmamalı.

## Güncelleme Koşulları
Yeni bir bütünlük kontrolü eklendiğinde veya yeni bir risk tespit edildiğinde güncellenmelidir.

## İlgili Dosyalar
[schema.md](schema.md), [../docs/business-rules.md](../docs/business-rules.md), [../memory/technical-debt.md](../memory/technical-debt.md)

## Son Güncelleme
2026-07-15
