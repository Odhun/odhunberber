# Release Kontrol Listesi

- [ ] Sürüm kapsamı doğrulandı mı (`package.json` version + `../../CHANGELOG.md`)?
- [ ] `npm run build` başarılı mı?
- [ ] Firestore Rules/Index değişikliği varsa test edildi mi? (Emulator veya manuel doğrulama)
- [ ] Yedek/backup durumu değerlendirildi mi? (bkz. `../docs/deployment.md` — otomatik yedekleme yok, manuel önlem gerekebilir)
- [ ] Rollback planı var mı? (Firebase Hosting release geçmişi)
- [ ] Ortam değişkenleri (GitHub Secrets / `.env.local`) kontrol edildi mi?
- [ ] Güvenlik kontrolleri tamamlandı mı? (bkz. `../docs/security.md`)
- [ ] Release notları hazırlandı mı? (bkz. `../templates/release-notes.md`)
- [ ] Deployment sonrası smoke test planlandı mı? (ana sayfa + randevu akışı manuel kontrol)

## İlgili Dosyalar
[../docs/deployment.md](../docs/deployment.md), [../templates/release-notes.md](../templates/release-notes.md)

## Son Güncelleme
2026-07-15
