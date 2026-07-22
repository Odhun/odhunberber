# Veritabanı İsimlendirme Standardı

## Amaç
Firestore koleksiyon ve alan isimlendirmesinde tek standart tanımlamak (mevcut koddan çıkarılmıştır).

## Kapsam
Koleksiyon isimleri, alan isimleri, doküman ID stratejisi.

## Kurallar (Mevcut Kullanılan Standart)
- **Koleksiyon isimleri:** camelCase, çoğul (`appointments`, `services`, `settings`, `blockedDates`, `publicSlots`). Yeni koleksiyon eklenirken bu standarda uyulmalı.
- **Alan isimleri:** camelCase (`customerName`, `createdAt`, `slotInterval`, `isActive`). Snake_case kullanılmamalı.
- **Doküman ID:** Çoğu koleksiyon için Firestore otomatik ID (`addDoc`) kullanılıyor (`appointments`). `publicSlots` ve muhtemelen `blockedDates` için **anlamlı ID** (tarih string'i, `YYYY-MM-DD`) kullanılıyor (`setDoc(doc(db, PUBLIC_SLOTS, data.date), ...)`).
- **Boolean alanlar:** `is` öneki (`isOpen`, `isActive`).
- **Zaman alanları:** ISO 8601 string (`createdAt`, `updatedAt`) — Firestore native `Timestamp` tipi **kullanılmıyor**, tutarlılık için yeni alanlar da string ISO olmalı.
- **Enum benzeri alanlar:** düz string union tip (`AppointmentStatus = 'pending' | 'confirmed' | 'cancelled'`), Firestore'da native enum yok, TypeScript tarafında tip ile sınırlanıyor (çalışma zamanında Firestore rule ile kısmen doğrulanıyor).
- **Junction/ilişki tablosu:** Yok — bu veri modelinde çoklu-çoklu ilişki bulunmuyor.

## Index İsimlendirme
`firestore.indexes.json` içinde otomatik üretilen composite index'ler kullanılıyor, elle isimlendirme yok.

## Migration/Constraint İsimlendirmesi
Firestore'da SQL benzeri constraint/migration isimlendirmesi yoktur; bkz. [migrations.md](migrations.md).

## Güncelleme Koşulları
Yeni bir koleksiyon veya farklı bir ID stratejisi benimsendiğinde güncellenmelidir.

## İlgili Dosyalar
[schema.md](schema.md)

## Son Güncelleme
2026-07-15
