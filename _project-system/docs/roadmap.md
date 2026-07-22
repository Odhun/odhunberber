# Roadmap Sistemi

## Amaç
Proje yol haritası kayıtlarının nasıl tutulacağını tanımlamak.

## Kapsam
Planlanan, geliştirilmekte olan ve tamamlanan özellikler.

## Tek Ana Kaynak Uyarısı
Bu proje, `_project-system` kurulmadan önce de bir backlog tutuyordu: kök dizindeki **`../../PROJECT_STATUS.md`**. O dosya "Devam Eden / TODO" ve "Bilinen Sorunlar" bölümleriyle halihazırda güncel backlog'u içeriyor. Bilgiyi çoğaltmamak için:
- **`PROJECT_STATUS.md` (kök dizin), bu görev tarihi itibarıyla mevcut backlog'un ana kaynağıdır.**
- Bu dosya (`docs/roadmap.md`) yalnızca **format standardını** tanımlar; yeni roadmap kayıtları aşağıdaki kategori/alan yapısına göre girilmeli.
- İleride roadmap tamamen bu sisteme taşınırsa `PROJECT_STATUS.md` içeriği buraya migrate edilip kök dosyada bu dosyaya link bırakılmalı.

## Kullanım Şekli
Yeni bir özellik fikri, önce kullanıcı tarafından "geliştirilmesi kabul edildi" onayı almadan roadmap'e eklenmez.

## Durum Kategorileri
`Planlanan` · `Analiz Ediliyor` · `Hazır` · `Geliştiriliyor` · `Test Ediliyor` · `Tamamlandı` · `Ertelendi` · `İptal Edildi`

## Kayıt Formatı
```
### RM-XXX — Özellik Adı
- Açıklama:
- İş Değeri:
- Öncelik: Yüksek / Orta / Düşük
- Bağımlılıklar:
- Risk:
- Durum:
- İlgili Spec:
- Hedef Sürüm:
- Notlar:
```

## PROJECT_STATUS.md'den Aktarılan Mevcut Backlog (2026-07-15 itibarıyla anlık görüntü)
Bu bölüm, kök dosyanın bir kopyası **değil**, yeni format şablonuna nasıl aktarılacağının örneğidir. Güncel/gerçek durum için her zaman `PROJECT_STATUS.md`'ye bakılmalı.

### RM-001 — Firebase Production Kurulumu
- Açıklama: Gerçek Firebase proje credentials'ının `.env.local`/Secrets'a girilmesi.
- Öncelik: Yüksek
- Durum: Planlanan (kaynak: `PROJECT_STATUS.md` "Yüksek Öncelik")

### RM-002 — SMS/E-posta Randevu Bildirimi
- Açıklama: Firebase Functions ile otomatik bildirim.
- Öncelik: Orta
- Durum: Planlanan (kaynak: `PROJECT_STATUS.md` "Orta Öncelik")
- Not: Mimariye yeni bir sunucu tarafı katman (Cloud Functions) ekler — bkz. [../architecture/decisions.md](../architecture/decisions.md).

### RM-003 — Çoklu Dil Desteği (i18n)
- Öncelik: Düşük
- Durum: Planlanan

Diğer maddeler için bkz. `PROJECT_STATUS.md` → "Devam Eden / TODO".

## Güncelleme Koşulları
Kullanıcı yeni bir özellik onayladığında veya mevcut backlog durumu değiştiğinde güncellenmelidir.

## İlgili Dosyalar
[../../PROJECT_STATUS.md](../../PROJECT_STATUS.md), [../specs/README.md](../specs/README.md)

## Son Güncelleme
2026-07-15
