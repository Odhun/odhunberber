# Olay (Incident) Kontrol Listesi

Üretimde randevu sistemi çalışmıyor/veri kaybı/güvenlik ihlali gibi acil bir durumda kullanılır.

- [ ] Olayın etkisi netleştirildi mi? (Kim etkileniyor: misafir kullanıcılar mı, admin mi, her ikisi mi?)
- [ ] Firebase Console üzerinden Hosting/Firestore durumu kontrol edildi mi?
- [ ] Son deploy (`git log` + GitHub Actions run geçmişi) olayla zaman olarak örtüşüyor mu?
- [ ] Geçici bir rollback (önceki Hosting release'ine dönüş) mümkün mü ve gerekli mi?
- [ ] Kök neden analizi yapıldı mı? (bkz. `../prompts/debug.md`)
- [ ] Güvenlik ihlali şüphesi varsa `firestore.rules` acilen gözden geçirildi mi? (bkz. `../prompts/security-review.md`)
- [ ] Kullanıcı verisi (randevu/telefon/isim) etkilendi mi, KVKK açısından bildirim gerekiyor mu? (bkz. `../docs/security.md`)
- [ ] Olay ve alınan aksiyon `../memory/ai-handoff.md`'ye kaydedildi mi?
- [ ] Kalıcı düzeltme bir teknik borç/spec olarak açıldı mı?

## Yasak İşlemler
Kullanıcı onayı olmadan `git reset --hard`, force push veya Firestore verisini toplu silme/geri yükleme yapmak — bu görev için özellikle kritik önem taşır (bkz. `../prompts/shared-rules.md`).

## İlgili Dosyalar
[../prompts/debug.md](../prompts/debug.md), [../prompts/security-review.md](../prompts/security-review.md), [../docs/deployment.md](../docs/deployment.md)

## Son Güncelleme
2026-07-15
