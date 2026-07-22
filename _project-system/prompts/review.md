# Kod İnceleme Promptu

## Amacı
Bir değişikliği (diff/PR) incelerken kontrol edilecek başlıkları tanımlamak.

## Ne Zaman Kullanılacağı
Bir görev tamamlanmadan önce veya başka bir aracın değişikliğini gözden geçirirken.

## Gerekli Girdiler
İncelenecek diff/branch/dosya.

## Çalışma Kuralları
- Bkz. [shared-rules.md](shared-rules.md).
- Kontrol başlıkları: doğruluk, güvenlik (bkz. [../docs/security.md](../docs/security.md)), mimari uyum (bkz. [../architecture/system-design.md](../architecture/system-design.md)), test yeterliliği, performans riski, geriye dönük uyumluluk.
- Firestore'a dokunan her değişiklikte `firestore.rules` ile tutarlılık ayrıca kontrol edilir.
- Bulunan sorunlar önem sırasına göre listelenir; öneri niteliğinde olanlar "zorunlu" olanlardan ayrılır.

## Beklenen Çıktı
Önem sırasına göre bulgu listesi (dosya:satır + sorun + öneri).

## Yasak İşlemler
İnceleme sırasında kod değiştirmek (istenmedikçe) · övgü/dolgu yorum yazmak.

## Örnek Kullanım Promptu
```
Son commit'teki değişikliği incele: güvenlik, mimari uyum ve firestore.rules tutarlılığı
açısından değerlendir. Sorunları önem sırasına göre listele, kod değiştirme.
```

## Görev Sonu Kontrol Listesi
Bkz. [../checklists/code-review.md](../checklists/code-review.md).

## Son Güncelleme
2026-07-15
