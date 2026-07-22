# Backend Promptu (Firebase / Firestore Katmanı)

## Amacı
Bu projede özel bir backend sunucusu yoktur — "backend" burada `src/services/*.ts` (Firestore veri erişimi) ve `firestore.rules` (yetkilendirme/validasyon) katmanını ifade eder. Bu dosya bu katmanda çalışırken izlenecek kuralları tanımlar.

## Ne Zaman Kullanılacağı
Yeni bir Firestore sorgusu/yazma işlemi eklenirken, `firestore.rules` değiştirilirken, `src/hooks/useAuth.ts` gibi veri/yetki katmanı hook'ları değiştirilirken.

## Gerekli Girdiler
- Değiştirilecek koleksiyon/servis dosyası.
- İlgili iş kuralı (bkz. [../docs/business-rules.md](../docs/business-rules.md)).
- İlgili şema (bkz. [../database/schema.md](../database/schema.md)).

## Çalışma Kuralları
- Bkz. [shared-rules.md](shared-rules.md) (tüm ortak kurallar geçerli).
- Firestore erişimi yalnızca `src/services/*.ts` içinde yapılır — bileşen içine doğrudan Firestore çağrısı eklenmez (bkz. [../docs/coding-standards.md](../docs/coding-standards.md)).
- Bir servis fonksiyonu eklenirken/değiştirilirken **aynı görev kapsamında** `firestore.rules`'ın buna izin verip vermediği kontrol edilir; izin vermiyorsa kural değişikliği de görevin bir parçası olarak önerilir (ayrı onayla).
- Yeni zorunlu alan eklenirken geriye dönük uyumluluk (eski dokümanlarda alan yoksa ne olur) değerlendirilir (bkz. [../database/migrations.md](../database/migrations.md)).
- `NEXT_PUBLIC_` önekli olmayan gizli bir sunucu tarafı değişken gerekiyorsa (ör. üçüncü taraf API key), bunun Cloud Functions gerektirdiği ve statik export mimarisiyle çelişebileceği açıkça belirtilir.

## Beklenen Çıktı
Değiştirilen servis fonksiyonu/kuralı + hangi iş kuralına karşılık geldiğinin açıklaması + `firestore.rules` ile tutarlılık kontrolü sonucu.

## Yasak İşlemler
Firestore yerine başka bir veritabanı önermek (kullanıcı istemeden) · özel bir Express/Node backend sunucusu eklemeye başlamak · `firestore.rules`'ı test etmeden/incelemeden gevşetmek.

## Örnek Kullanım Promptu
```
src/services/appointments.ts içine, bir randevu iptal edildiğinde publicSlots.bookedTimes'tan
o saati kaldıran bir fonksiyon ekle. İlgili firestore.rules kuralının buna izin verip
vermediğini kontrol et, gerekirse kural değişikliğini ayrıca öner (uygulamadan önce sor).
```

## Görev Sonu Kontrol Listesi
Bkz. [../checklists/task-finish.md](../checklists/task-finish.md) + özellikle "Firestore Rules ile tutarlı mı?" kontrolü.

## Son Güncelleme
2026-07-15
