# Debug Promptu

## Amacı
Hata ayıklarken izlenecek süreci tanımlamak.

## Ne Zaman Kullanılacağı
Bildirilen bir hata/beklenmeyen davranış incelenirken.

## Gerekli Girdiler
Hatanın tekrar üretme adımları, beklenen/gerçekleşen davranış.

## Çalışma Kuralları
- Bkz. [shared-rules.md](shared-rules.md).
- Önce hatayı **tekrar üret**, sonra kök nedeni bul (kod okuma + gerekiyorsa `console.log`/Firebase Console veri incelemesi).
- Sadece hatayı çözen **minimum** değişiklik yapılır — kapsam dışı iyileştirme eklenmez (bkz. [refactor.md](refactor.md) ile karıştırılmamalı).
- Bulunan ama görevle ilgisi olmayan başka bir hata varsa düzeltilmez, [../memory/known-issues.md](../memory/known-issues.md)'ye eklenir.
- Regression testi yoksa (bkz. [../docs/testing.md](../docs/testing.md)) en azından manuel doğrulama adımı belgelenir.

## Beklenen Çıktı
Kök neden açıklaması + minimum düzeltme + (varsa) regression testi.

## Yasak İşlemler
Hatayı "sessizce yutan" (try/catch ile gizleyen) düzeltme yapmak · kök nedeni bulmadan semptomu gidermek.

## Örnek Kullanım Promptu
```
Admin panelinde randevu onaylandığında saat hâlâ "dolu" görünmüyor, publicSlots
güncellenmiyormuş gibi. Kök nedeni bul (bkz. _project-system/architecture/data-flow.md
"Randevu Durum Güncelleme" akışı), minimum düzeltmeyi öner, uygulamadan önce bana sor.
```

## Görev Sonu Kontrol Listesi
Bkz. [../checklists/task-finish.md](../checklists/task-finish.md).

## Son Güncelleme
2026-07-15
