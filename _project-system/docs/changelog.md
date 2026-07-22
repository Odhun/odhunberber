# Changelog Sistemi

## Amaç
Değişiklik geçmişi kayıt standardını tanımlamak.

## Tek Ana Kaynak Uyarısı
Kök dizindeki **`../../CHANGELOG.md`** bu projenin **mevcut ve tek** changelog dosyasıdır ve kullanılmaya devam edilmelidir. Bu dosya (`docs/changelog.md`) yeni bir changelog dosyası **değildir** — yalnızca hangi formatın kullanılacağını tanımlar, içerik çoğaltılmaz.

## Kullanım Şekli
Yeni bir kullanıcı/proje açısından önemli değişiklik yapıldığında kayıt kök `CHANGELOG.md` dosyasına eklenir.

## Format (Mevcut Kullanım — Korunacak)
Kök `CHANGELOG.md` zaten Türkçe başlık kullanıyor (`Eklendi`), İngilizce "Keep a Changelog" başlıklarına (`Added/Changed/Fixed/...`) **geçilmemeli** — mevcut standart korunur:

```
## [X.Y.Z] — YYYY-MM-DD

### Eklendi
- ...

### Değiştirildi
- ...

### Düzeltildi
- ...

### Kaldırıldı
- ...

### Güvenlik
- ...
```

## Ne Zaman Kayıt Eklenir
- Yeni özellik, davranış değişikliği, önemli hata düzeltmesi, veritabanı/API değişikliği, güvenlik düzeltmesi, geriye dönük uyumsuz değişiklik, önemli mimari değişiklik.
- Küçük kod düzenlemeleri (yorum, formatlama, değişken adı) eklenmez.

## Tarih Formatı
`YYYY-MM-DD`

## Güncelleme Koşulları
Changelog format standardı değişirse (ör. İngilizce başlıklara geçiş kararı alınırsa) bu dosya güncellenir.

## İlgili Dosyalar
[../../CHANGELOG.md](../../CHANGELOG.md), [../templates/changelog-entry.md](../templates/changelog-entry.md)

## Son Güncelleme
2026-07-15
