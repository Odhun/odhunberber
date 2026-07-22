# Dokümantasyon Promptu

## Amacı
`_project-system` içindeki dokümanları oluştururken/güncellerken izlenecek kuralları tanımlamak.

## Ne Zaman Kullanılacağı
Yeni bir doküman oluşturulurken, mevcut doküman güncellenirken veya kod-doküman uyumsuzluğu tespit edildiğinde.

## Gerekli Girdiler
Hangi konu, hangi mevcut dosyanın (varsa) ana kaynak olduğu (bkz. [../README.md](../README.md) tablosu).

## Çalışma Kuralları
- Bir bilginin **tek ana kaynağı** olmalı — aynı kural birden fazla dosyada tekrar edilmez, diğer dosyalar bağlantı verir.
- Bilinmeyen/doğrulanamayan bilgi "Durum: Doğrulanamadı. Aksiyon: ..." formatıyla işaretlenir, gerçekmiş gibi yazılmaz.
- Hiçbir doküman boş bırakılmaz.
- Kod ile doküman çelişiyorsa çelişki gizlenmez, hangi tarafın güncel olduğu doğrulanmalı notu eklenir.

## Beklenen Çıktı
Güncellenmiş/oluşturulmuş doküman + değişen bağlantıların kontrolü.

## Yasak İşlemler
Aynı bilgiyi birden fazla dosyaya kopyalamak · uydurma/varsayımsal bilgiyi kesin bilgi gibi sunmak · kod değişikliği olmadan sırf "daha iyi görünsün" diye mevcut doğru bilgiyi silmek.

## Örnek Kullanım Promptu
```
src/services/settings.ts dosyasını incele ve _project-system/database/schema.md
içindeki "settings" koleksiyonu bölümünü, "Doğrulanamadı" notlarını kaldırarak
gerçek alan yapısıyla güncelle.
```

## Görev Sonu Kontrol Listesi
Bozuk link kontrolü, boş dosya kontrolü, "Son Güncelleme" tarihinin güncellenmesi.

## Son Güncelleme
2026-07-15
