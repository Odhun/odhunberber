# Database (Firestore) Promptu

## Amacı
Firestore şema/kural/index değişikliklerinde izlenecek kuralları tanımlamak.

## Ne Zaman Kullanılacağı
`firestore.rules`, `firestore.indexes.json`, `src/types/index.ts` (veri modeli), koleksiyon ekleme/kaldırma işlerinde.

## Gerekli Girdiler
- Mevcut şema (bkz. [../database/schema.md](../database/schema.md)).
- İsimlendirme standardı (bkz. [../database/naming.md](../database/naming.md)).

## Çalışma Kuralları
- Bkz. [shared-rules.md](shared-rules.md).
- Şema değişikliği hem `src/types/index.ts` hem `firestore.rules` hem [../database/schema.md](../database/schema.md) dosyasında **birlikte** yapılır.
- Yeni index gerekiyorsa `firestore.indexes.json`'a eklenir, `firebase deploy --only firestore:indexes` ile deploy edilmesi gerektiği belirtilir (deploy kullanıcı onayı gerektirir).
- Veri bütünlüğü kontrolü olmadan (foreign key yok) yeni referans alanı eklerken riskler [../database/data-integrity.md](../database/data-integrity.md)'ye kaydedilir.
- `src/firebase/rules.txt` güncellenmeyecekse veya güncellenecekse bu açıkça belirtilir — bu dosyanın gerçek deploy edilen kural olmadığı unutulmamalı.

## Beklenen Çıktı
Değişen şema/kural + hangi dokümanların güncellendiği listesi.

## Yasak İşlemler
Firestore Rules'ı test etmeden production'a deploy etmek (deploy zaten kullanıcı onayı gerektirir) · mevcut veri tipini (ör. ISO string tarih) sessizce değiştirmek.

## Örnek Kullanım Promptu
```
appointments koleksiyonuna customerEmail (opsiyonel string) alanı eklemek istiyorum.
src/types/index.ts, firestore.rules ve _project-system/database/schema.md dosyalarını
birlikte güncelle. Deploy etme, yalnızca değişikliği hazırla.
```

## Görev Sonu Kontrol Listesi
Bkz. [../checklists/task-finish.md](../checklists/task-finish.md) + [../database/migrations.md](../database/migrations.md) süreci.

## Son Güncelleme
2026-07-15
