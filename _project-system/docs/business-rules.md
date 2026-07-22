# İş Kuralları

## Amaç
Randevu sisteminin kod bağımsız iş kurallarını tanımlar. Bu kurallar hem `firestore.rules` hem de `src/services/` katmanı ile birebir uyumlu olmalıdır; birinde değişiklik yapılırsa diğeri de gözden geçirilmelidir.

## Kapsam
Randevu yaşam döngüsü, roller, yetkiler, çalışma programı ve tatil günü kuralları.

## Kullanıcı Rolleri
| Rol | Tanım | Yetki |
|---|---|---|
| Misafir (guest) | Kimlik doğrulaması yapılmamış herkes | Randevu oluşturabilir, hizmet/fiyat/ayarları ve dolu saatleri (`publicSlots`) okuyabilir |
| Admin | `request.auth.token.email` değeri admin e-postasına eşit olan Firebase Auth kullanıcısı | Tüm randevuları okur/günceller/siler, hizmet/ayar/tatil günü yazar |

Not: Admin e-posta kontrolü hem `src/hooks/useAuth.ts` (client-side `isAdmin`) hem de `firestore.rules` içindeki `isAdmin()` fonksiyonunda **ayrı ayrı** hardcoded/env tabanlı yapılmıştır. Bu iki kontrol birbirinden bağımsızdır — biri güncellenip diğeri güncellenmezse yetki tutarsızlığı oluşur (bkz. [technical-debt.md](../memory/technical-debt.md)).

## Randevu Durum Geçişleri
```
(yok) --create--> pending --update(admin)--> confirmed
                       |--update(admin)--> cancelled
confirmed --update(admin)--> cancelled
```
- Yeni oluşturulan her randevu zorunlu olarak `pending` durumundadır (`firestore.rules`: `request.resource.data.status == 'pending'`). Misafir doğrudan `confirmed` veya `cancelled` durumunda randevu oluşturamaz.
- Durum değişikliği (`confirmed`/`cancelled`) yalnızca admin tarafından yapılabilir (`updateAppointmentStatus`).
- Randevu silme yalnızca admin yetkisindedir (`deleteAppointment`).

## Zorunlu Kontroller (Randevu Oluşturma)
`firestore.rules` içinde `create` için zorunlu alanlar: `customerName`, `customerPhone`, `serviceId`, `serviceName`, `date`, `time`, `status`, `createdAt`, `updatedAt`.
- `customerName`: string, 2–100 karakter.
- `customerPhone`: string (format doğrulaması Firestore kuralında yok — yalnızca istemci tarafı `zod` şeması ile sınırlı; bkz. [security.md](security.md)).
- `status`: yalnızca `'pending'` kabul edilir.

## Saat Dilimi (Slot) Kuralları
- Slot durumları: `available` (boş), `booked` (dolu), `pending` (beklemede), `blocked` (kapalı/tatil).
- Bir tarih için boş saatler `publicSlots/{date}` dokümanındaki `bookedTimes` dizisinden hesaplanır — bu koleksiyon müşteri verisi içermez, yalnızca dolu saat listesi tutar.
- Admin tarafı, aynı bilgiyi tam randevu verisinden (`getAppointmentsByDate`) türetir (`getBookedSlots`).
- Slot aralığı (`slotInterval`) her gün için ayrı tanımlanabilir (`WorkingHours.slotInterval`, varsayılan 30 dakika).

## Çalışma Programı Kuralları
- Haftanın her günü için ayrı: `isOpen`, `openTime`, `closeTime`, `slotInterval` tanımlanır (`WorkingSchedule`).
- Varsayılan program: Pazartesi–Cuma 09:00–20:00, Cumartesi 09:00–18:00, Pazar kapalı (`src/lib/constants.ts`).
- Kapalı gün (`isOpen: false`) olan günlerde randevu alınamaz — bu kontrolün UI tarafında (takvim bileşeni) uygulandığı gözlemlenmiştir; Firestore kural seviyesinde çalışma saati doğrulaması **yoktur** (yalnızca istemci güvenir). Durum: Doğrulanamadı/Bilinen risk — bkz. [technical-debt.md](../memory/technical-debt.md).

## Tatil Günü (BlockedDate) Kuralları
- Belirli bir tarih tamamen kapatılabilir veya yalnızca belirli saatler (`blockedSlots`) kapatılabilir.
- `blockedSlots` boş ise tüm gün kapalı kabul edilir.
- Yazma yalnızca admin yetkisindedir.

## İptal ve Geri Alma Kuralları
- İptal edilen randevu (`cancelled`) tekrar `pending`/`confirmed` durumuna döndürülebilir mi: Durum: Doğrulanamadı. Aksiyon: Proje sahibinden teyit alınmalı (kod, `updateAppointmentStatus` ile keyfi durum geçişine izin veriyor; iş kuralı olarak geri dönüşün yasak olup olmadığı belirtilmemiş).
- Silinen randevu (`deleteAppointment`) geri alınamaz — kalıcı silme.
- `publicSlots.bookedTimes` içine yazılan zaman, randevu iptal/silme durumunda otomatik temizlenmiyor gibi görünüyor (kod incelemesinde `bookedTimes` için bir "remove" işlemi bulunamadı). Durum: Doğrulanamadı — teyit edilmeli, aksi halde iptal edilen randevunun saati "dolu" görünmeye devam edebilir. Bkz. [technical-debt.md](../memory/technical-debt.md).

## Veri Saklama Kuralları
Durum: Doğrulanamadı. Aksiyon: Randevu kayıtlarının ne kadar süre saklanacağı, KVKK kapsamında silme/anonimleştirme sürecinin olup olmadığı proje sahibinden teyit edilmeli. Sitede KVKK sayfası (`src/app/(public)/kvkk`) mevcut ancak otomatik veri saklama/silme politikası koda yansımamış.

## Bildirim Kuralları
Şu anda otomatik bildirim (SMS/e-posta) **yoktur** — `PROJECT_STATUS.md` TODO listesinde backlog maddesi olarak yer alır. Bkz. [roadmap.md](roadmap.md).

## İş Kuralı Örnekleri
- "Bir misafir kullanıcı, dolu bir saat dilimini seçip randevu göndermeye çalıştığında UI seviyesinde engellenir; ancak Firestore kuralları saat çakışmasını sunucu tarafında doğrulamaz." → çift randevu (race condition) riski. Bkz. [security.md](security.md).
- "Admin, `admin@odhunberber.com` dışında bir e-posta ile giriş yaparsa `useAuth().isAdmin` `false` döner ve route koruması devreye girer (`AdminLayout`)."

## Güncelleme Koşulları
Randevu durumu, roller, çalışma programı veya tatil günü mantığı değiştiğinde bu dosya ve `firestore.rules` birlikte güncellenmelidir.

## İlgili Dosyalar
[security.md](security.md), [../database/data-integrity.md](../database/data-integrity.md), [../database/schema.md](../database/schema.md)

## Son Güncelleme
2026-07-15
