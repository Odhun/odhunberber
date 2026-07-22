# Güvenlik İncelemesi Promptu

## Amacı
Güvenlik odaklı inceleme yaparken kontrol edilecek başlıkları tanımlamak.

## Ne Zaman Kullanılacağı
`firestore.rules`, `src/hooks/useAuth.ts`, `src/firebase/config.ts` veya kimlik doğrulama/yetkilendirme ile ilgili herhangi bir değişiklikte; ayrıca periyodik genel güvenlik gözden geçirmesinde.

## Gerekli Girdiler
İncelenecek dosya/değişiklik; bkz. [../docs/security.md](../docs/security.md) mevcut bilinen riskler.

## Çalışma Kuralları
- Bkz. [shared-rules.md](shared-rules.md).
- Kontrol listesi: kimlik doğrulama, yetkilendirme (özellikle admin e-posta kontrolünün her iki yerde de tutarlı olup olmadığı), input validation, rate limiting/App Check eksikliği, secret sızıntısı (`NEXT_PUBLIC_` olmayan bir değerin yanlışlıkla client'a sızması), Firestore Rules'ta aşırı gevşek `allow` ifadeleri.
- `../docs/security.md` içindeki "Bilinen Güvenlik Riskleri" listesi her incelemede yeniden değerlendirilir; çözülen bir risk varsa oradan kaldırılır/işaretlenir.
- Bulunan yeni bir risk hemen düzeltilmez — önce kullanıcıya raporlanır (etki + öneri), onay sonrası düzeltilir.

## Beklenen Çıktı
Risk listesi (önem sırasına göre) + her biri için öneri; mevcut [../docs/security.md](../docs/security.md) ile karşılaştırma.

## Yasak İşlemler
Güvenlik açığını kullanıcıya danışmadan "sessizce" kapatmak (özellikle Firestore Rules değişikliği deploy gerektirir ve kullanıcı onayı ister) · gizli anahtarları/örnek olarak bile gerçek değerleriyle dokümana yazmak.

## Örnek Kullanım Promptu
```
firestore.rules dosyasını _project-system/docs/security.md içindeki bilinen riskler
listesiyle karşılaştır. publicSlots yazma kuralının hâlâ geçerli olup olmadığını
doğrula ve varsa yeni riskleri raporla. Kural dosyasını değiştirme.
```

## Görev Sonu Kontrol Listesi
Bkz. [../checklists/code-review.md](../checklists/code-review.md) + `../docs/security.md` güncellemesi.

## Son Güncelleme
2026-07-15
