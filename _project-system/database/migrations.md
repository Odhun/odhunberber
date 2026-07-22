# Migration Kuralları (Firestore)

## Amaç
Firestore şemasız olduğu için geleneksel SQL migration aracı yoktur; bu dosya şema değişikliği yapılırken izlenecek süreci tanımlar.

## Kapsam
Koleksiyon/alan ekleme-kaldırma, Firestore Rules ve Index değişiklikleri.

## Kullanım Şekli
Yeni bir alan eklenmeden önce bu süreç izlenir; production'da elle veri dönüşümü yapılmadan önce mutlaka önce test edilir.

## Kurallar
- **Kural/Index değişiklikleri versiyon kontrollüdür:** `firestore.rules` ve `firestore.indexes.json` git ile takip edilir — bunlar projenin "migration dosyaları" yerine geçer.
- Uygulanmış (deploy edilmiş) bir kural dosyası doğrudan "geri alınmaz" şekilde değiştirilmemeli — değişiklik yeni bir commit ile yapılır, `git log` üzerinden geçmiş izlenebilir.
- Yeni bir zorunlu alan eklenirken **mevcut dokümanlarda o alan olmayabilir** — Firestore yeni alanı zorunlu kılan bir kural eklerse, eski dokümanlar okunabilir ama güncelleme kuralına göre reddedilebilir. Yeni zorunlu alan eklemeden önce geriye dönük uyumluluk değerlendirilmeli.
- Büyük veri dönüşümü (ör. tüm `appointments` dokümanlarına yeni alan eklemek) gerekiyorsa, tek seferde tüm koleksiyonu güncelleyen script yerine kademeli/toplu (batched write) yaklaşım kullanılmalı — Firestore yazma limitleri göz önünde bulundurulmalı.
- Rollback: Kural dosyası için `git revert` + `firebase deploy --only firestore:rules`. Veri seviyesinde rollback için yedek (backup) gereklidir — mevcut projede otomatik yedekleme **tespit edilmedi** (Doğrulanamadı, bkz. [../docs/deployment.md](../docs/deployment.md)).
- Production'da veri dönüşümü, önce Firebase Emulator Suite ile test edilmeden çalıştırılmamalı. Durum: Emulator kullanımı bu projede **tespit edilmedi** — kurulu değilse önce kurulması önerilir.

## Mevcut Kural/Index Deploy Komutları
```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

## Bilinen Tutarsızlık
`src/firebase/rules.txt`, deploy edilen `firestore.rules` ile **senkron değil** (rules.txt'te olup gerçek kuralda olmayan bir telefon uzunluk kontrolü tespit edildi). Migration/kural güncellemesi yapılırken hangi dosyanın "gerçek" olduğu karıştırılmamalı: **`firestore.rules` (kök dizin) tek gerçek kaynaktır**, `src/firebase/rules.txt` güncel değildir. Bkz. [../memory/technical-debt.md](../memory/technical-debt.md).

## Güncelleme Koşulları
Migration süreci veya araç değiştiğinde (ör. Emulator Suite kurulursa) güncellenmelidir.

## İlgili Dosyalar
[schema.md](schema.md), [../docs/deployment.md](../docs/deployment.md)

## Son Güncelleme
2026-07-15
