# Bilinen Sorunlar

## Amaç
Gözlemlenmiş ama henüz kök nedeni tam analiz edilmemiş veya düzeltme kararı verilmemiş sorunları kaydetmek. Teknik borçtan farkı: buradaki maddeler daha çok "davranışsal gözlem", [technical-debt.md](technical-debt.md) ise daha çok "yapısal/mimari" kayıtlardır — ikisi çakışabilir, ilişkili olan yerlerde birbirine link verilir.

## Kapsam
Kod incelemesi ve kök dizindeki `../../PROJECT_STATUS.md` "Bilinen Sorunlar" bölümünden aktarılan maddeler.

## Tek Ana Kaynak Uyarısı
Kök dizindeki **`../../PROJECT_STATUS.md`** "Bilinen Sorunlar" bölümü, bu görev tarihi itibarıyla güncel anlık görüntüyü içerir. Buradaki liste o dosyanın **kopyası değil**, bu sistemin formatına aktarılmış halidir — güncel durum için her zaman kök dosyaya bakılmalı.

## Kayıtlar

### KI-001 — `date-fns/locale/tr` dinamik import kullanımı
- **Kaynak:** `../../PROJECT_STATUS.md`
- **Açıklama:** Randevu sayfasında `date-fns/locale/tr` dinamik import ile yükleniyor, statik import'a alınması öneriliyor.
- **Durum:** Açık (kaynak dosyada da açık işaretli).

### KI-002 — PWA ikonları placeholder
- **Kaynak:** `../../PROJECT_STATUS.md`
- **Açıklama:** Gerçek PWA ikonları henüz oluşturulmamış.
- **Durum:** Açık.

### KI-003 — Firebase credentials eksik / production kurulumu yapılmamış
- **Kaynak:** `../../PROJECT_STATUS.md`
- **Açıklama:** `.env.local` doldurulana kadar Firestore bağlantısı tam çalışmaz.
- **Durum:** Doğrulanamadı — `.env.local` mevcut (bu görevde varlığı doğrulandı, içeriği okunmadı), gerçek/placeholder değer içerip içermediği teyit edilmedi.

### KI-004 — Yetkilendirme/publicSlots senkronizasyon riskleri
Bkz. [technical-debt.md](technical-debt.md) TD-001, TD-006, TD-007 — bunlar hem yapısal borç hem gözlemlenen davranışsal risk taşıdığı için orada detaylandırıldı, burada tekrar edilmiyor.

## Güncelleme Koşulları
Yeni bir davranışsal sorun gözlemlendiğinde veya kök `PROJECT_STATUS.md` güncellendiğinde bu dosya gözden geçirilmelidir.

## İlgili Dosyalar
[../../PROJECT_STATUS.md](../../PROJECT_STATUS.md), [technical-debt.md](technical-debt.md)

## Son Güncelleme
2026-07-15
