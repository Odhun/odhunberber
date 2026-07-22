# Kod İnceleme Kontrol Listesi

- [ ] Değişiklik, görev kapsamıyla sınırlı mı (kapsam dışı refactor yok mu)?
- [ ] `../docs/coding-standards.md`'deki isimlendirme/klasör kurallarına uyuluyor mu?
- [ ] Firestore'a dokunan bir değişiklikse `firestore.rules` ile tutarlı mı?
- [ ] Yeni bir güvenlik riski oluşturuyor mu? (bkz. `../docs/security.md`)
- [ ] Geriye dönük uyumsuz bir değişiklik varsa açıkça belirtilmiş mi?
- [ ] Performans riski var mı (ör. gereksiz Firestore okuması, büyük bundle)?
- [ ] Test var mı / regression testi gerekiyor mu? (bkz. `../docs/testing.md`)
- [ ] Yeni bağımlılık eklendiyse gerekçesi var mı?
- [ ] İlgili dokümanlar güncellenmiş mi?

## İlgili Dosyalar
[../prompts/review.md](../prompts/review.md), [../prompts/security-review.md](../prompts/security-review.md)

## Son Güncelleme
2026-07-15
