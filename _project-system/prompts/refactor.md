# Refactor Promptu

## Amacı
Davranışı değiştirmeden kod iyileştirmesi yapılırken izlenecek sınırları tanımlamak.

## Ne Zaman Kullanılacağı
Kod tekrarını azaltma, isimlendirme düzeltme, dosya taşıma gibi davranış-koruyan değişikliklerde.

## Gerekli Girdiler
Refactor edilecek dosya(lar) ve gerekçe.

## Çalışma Kuralları
- Bkz. [shared-rules.md](shared-rules.md).
- Refactor, **davranışı değiştirmemelidir** — girdi/çıktı aynı kalmalı.
- Kapsam net sınırlanır: yalnızca istenen dosya(lar); "yeri gelmişken" başka dosyaları da değiştirmek yasak.
- Refactor öncesi ve sonrası davranışın aynı olduğunu gösteren bir kontrol yapılır (test yoksa, en azından `npm run build` + manuel akış kontrolü — bkz. [../docs/testing.md](../docs/testing.md)).
- `src/utils/` (boş) ve `src/lib/utils.ts` gibi bilinen tutarsızlıklar bu görev kapsamında **otomatik düzeltilmez** — ayrı bir teknik görev olarak önerilir (bkz. [../memory/technical-debt.md](../memory/technical-debt.md)).

## Beklenen Çıktı
Davranışı değiştirmeyen diff + "öncesi/sonrası aynı davranış" doğrulaması.

## Yasak İşlemler
Kapsam dışı dosyalarda "iyileştirme" yapmak · yeni soyutlama katmanı eklemek (gerekmiyorsa) · davranışı sessizce değiştirmek.

## Örnek Kullanım Promptu
```
src/services/appointments.ts içindeki tarih formatlama mantığını (new Date().toISOString())
tek bir yardımcı fonksiyona çıkar, davranışı değiştirme. Yalnızca bu dosyaya dokun.
```

## Görev Sonu Kontrol Listesi
Bkz. [../checklists/task-finish.md](../checklists/task-finish.md).

## Son Güncelleme
2026-07-15
