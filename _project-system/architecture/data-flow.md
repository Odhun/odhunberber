# Veri Akışları

## Amaç
Önemli süreçlerin uçtan uca veri akışını göstermek.

## Kapsam
Randevu oluşturma, admin girişi, randevu durumu güncelleme.

## Kullanım Şekli
Bu akışlardan birini değiştiren bir görev öncesi ilgili diyagram gözden geçirilmeli; akış değişirse diyagram güncellenmeli.

## Randevu Oluşturma (Misafir)
```mermaid
sequenceDiagram
  participant U as Misafir Kullanıcı
  participant UI as AppointmentCalendar/TimeSlotPicker/AppointmentForm
  participant SVC as services/appointments.ts
  participant FS as Firestore

  U->>UI: Tarih seç
  UI->>SVC: getPublicBookedSlots(date)
  SVC->>FS: get publicSlots/{date}
  FS-->>SVC: bookedTimes[]
  SVC-->>UI: boş saatleri hesapla
  U->>UI: Saat + form bilgisi gönder
  UI->>SVC: createAppointment(data)
  SVC->>FS: addDoc appointments (status=pending)
  SVC->>FS: setDoc publicSlots/{date} (bookedTimes: arrayUnion(time))
  FS-->>SVC: appointmentId
  SVC-->>UI: başarı
```
Not: `publicSlots` yazımı `try/catch` içinde "non-critical" olarak işaretli — bu adım başarısız olsa bile randevu oluşturulmuş sayılır (`src/services/appointments.ts` yorumu: "Non-critical — appointment still created"). Bu durumda o saat dilimi `publicSlots`'ta "dolu" görünmeyebilir ama gerçek randevu (`appointments` koleksiyonunda) var olur — çift randevu riski.

## Admin Girişi
```mermaid
sequenceDiagram
  participant A as Admin
  participant Login as admin/login page
  participant Hook as useAuth
  participant Auth as Firebase Auth
  participant Layout as AdminLayout

  A->>Login: email + şifre gir
  Login->>Hook: signIn(email, password)
  Hook->>Auth: signInWithEmailAndPassword
  Auth-->>Hook: User
  Hook->>Hook: isAdmin = email == NEXT_PUBLIC_ADMIN_EMAIL || 'admin@odhunberber.com'
  Hook-->>Layout: user, isAdmin
  Layout->>Layout: isAdmin false ise erişimi engelle/yönlendir
```

## Randevu Durum Güncelleme (Admin)
```mermaid
sequenceDiagram
  participant A as Admin
  participant UI as Admin randevu listesi
  participant SVC as services/appointments.ts
  participant FS as Firestore

  A->>UI: Onayla/İptal Et/Not Ekle
  UI->>SVC: updateAppointmentStatus(id, status, adminNote?)
  SVC->>FS: updateDoc appointments/{id}
  Note over FS: firestore.rules -> allow update: if isAdmin()
  FS-->>SVC: başarı/hata
```
Not: `publicSlots.bookedTimes` bu akışta **güncellenmiyor** — randevu iptal edilse veya silinse bile o saatin `publicSlots`'tan çıkarıldığına dair kod bulunamadı. Durum: Doğrulanamadı, bkz. [../docs/business-rules.md](../docs/business-rules.md).

## Örnekler
Yukarıdaki üç akış, kod tabanından doğrudan çıkarılmıştır (`src/services/appointments.ts`, `src/hooks/useAuth.ts`).

## Güncelleme Koşulları
Randevu akışı, admin girişi veya durum güncelleme mantığı değiştiğinde güncellenmelidir.

## İlgili Dosyalar
[../docs/business-rules.md](../docs/business-rules.md), [modules.md](modules.md)

## Son Güncelleme
2026-07-15
