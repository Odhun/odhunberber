# Karar Günlüğü (Kısa Referans)

## Amaç
Teknik/mimari kararların **detaylı** kaydı [../architecture/decisions.md](../architecture/decisions.md) (ADR formatı) içinde tutulur — burada tekrarlanmaz. Bu dosya yalnızca **süreç/ürün kararları** (mimari olmayan, ör. "hangi backlog maddesi ertelendi", "hangi tasarım tercihi onaylandı") için kısa bir günlüktür.

## Kapsam
Mimari olmayan, ürün/süreç düzeyinde alınan kararlar.

## Kullanım Şekli
Kullanıcı mimari olmayan ama kalıcı bir karar verdiğinde (ör. "Türkçe içerik kullanılacak", "tek admin modeli korunacak") buraya kısa bir madde eklenir. Mimari kararlar için bkz. [../architecture/decisions.md](../architecture/decisions.md).

## Kayıtlar

### 2026-07-15 — `_project-system` kurulumu kapsam kararı
Kök dizindeki mevcut `README.md`, `PROJECT_STATUS.md`, `CHANGELOG.md` dosyaları korunacak, `_project-system` içindeki karşılıkları bunları **kopyalamayacak**, yalnızca referans verecek. Gerekçe: "tek ana kaynak" ilkesi ([../README.md](../README.md) kural 5).

### 2026-07-15 — Uygulama kodu bu görev kapsamında değiştirilmedi
`_project-system` kurulumu sırasında hiçbir uygulama dosyası (`src/`, `firestore.rules`, vb.) değiştirilmedi; yalnızca mevcut durum belgelendi. Tespit edilen sorunlar [technical-debt.md](technical-debt.md) ve [known-issues.md](known-issues.md)'ye kaydedildi, düzeltilmedi.

## Güncelleme Koşulları
Yeni bir ürün/süreç kararı alındığında eklenir.

## İlgili Dosyalar
[../architecture/decisions.md](../architecture/decisions.md), [rejected-ideas.md](rejected-ideas.md)

## Son Güncelleme
2026-07-15
