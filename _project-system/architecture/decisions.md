# Mimari Karar Kayıtları (ADR)

## Amaç
Önemli mimari kararları, gerekçeleriyle birlikte kalıcı olarak kaydetmek — böylece gelecekteki bir AI aracı veya geliştirici "neden bu şekilde yapılmış" sorusuna kod okumadan cevap bulabilir.

## Kapsam
Bu projeyi etkileyen mimari kararlar.

## Kullanım Şekli
Yeni bir mimari karar alındığında (yeni teknoloji, katman, yapı değişikliği) buraya `ADR-XXX` formatında eklenir. Var olan bir ADR silinmez; durumu "Değiştirildi" olarak güncellenip yeni ADR'ye referans verilir.

## Önemli Not — Geriye Dönük Kayıtlar
Aşağıdaki ADR-001, ADR-002 ve ADR-003, bu `_project-system` kurulumu sırasında **mevcut kod incelenerek geriye dönük olarak** yazılmıştır. Orijinal karar anındaki tartışma/alternatif değerlendirmesi belgelenmemişti; bu nedenle "Gerekçe" ve "Alternatifler" bölümleri, kod tabanından çıkarılan **gözlemlere** dayanır, doğrulanmış orijinal karar metinlerine değil. Durum: Doğrulanamadı (orijinal karar süreci).

---

## ADR-001: Statik Export (`output: 'export'`) ile Next.js Kullanımı

### Durum
Kabul Edildi (kod tabanında uygulanmış durumda)

### Bağlam
Uygulama Firebase Hosting üzerinde barındırılıyor ve sunucu tarafı çalıştırma (Node.js sunucusu) gerektirmeyen basit bir statik site yeterli görünüyor.

### Karar
`next.config.js` içinde `output: 'export'` kullanılarak tam statik site üretiliyor.

### Gerekçe (gözlemlenen)
Firebase Hosting statik dosya sunmada ücretsiz/basit; randevu verisi zaten client-side Firestore SDK ile okunup yazıldığı için sunucu tarafı render'a ihtiyaç yok.

### Alternatifler
Next.js sunucu modu (SSR/ISR) + Firebase Functions/Cloud Run — daha karmaşık, bu proje ölçeğinde gereksiz karmaşıklık olurdu.

### Sonuçlar
Next.js API Routes kullanılamaz; `images.unoptimized: true` zorunlu; her sayfa build-time'da statik üretilir.

### Tarih
Doğrulanamadı (mevcut kodda zaten uygulanmış haliyle tespit edildi)

---

## ADR-002: Firestore + Client SDK ile Doğrudan Veri Erişimi (Özel Backend Yok)

### Durum
Kabul Edildi

### Bağlam
Küçük ölçekli, tek şubeli bir randevu sistemi için özel bir backend (Node/Express vb.) geliştirmek yerine Firebase'in BaaS (Backend-as-a-Service) modeli tercih edilmiş.

### Karar
Tüm veri erişimi `src/services/*.ts` üzerinden doğrudan Firestore client SDK ile yapılıyor; güvenlik sınırı `firestore.rules` ile sağlanıyor.

### Gerekçe (gözlemlenen)
Geliştirme hızı ve düşük operasyonel yük; küçük veri modeli (randevu, hizmet, ayar) için özel bir API katmanı gereksiz karmaşıklık olurdu.

### Alternatifler
Özel REST/GraphQL API + ayrı veritabanı — daha fazla altyapı/bakım yükü.

### Sonuçlar
Güvenlik tamamen Firestore Rules'a bağımlı (bkz. [../docs/security.md](../docs/security.md)); sunucu tarafı iş mantığı (ör. çakışma kontrolü, bildirim) eklemek için Cloud Functions gerekecek.

### Tarih
Doğrulanamadı

---

## ADR-003: Tek Admin Rolü, E-posta Eşleşmesi ile Yetkilendirme

### Durum
Kabul Edildi

### Bağlam
İşletme tek şubeli ve tek yetkili kullanıcı (berber/işletme sahibi) tarafından yönetiliyor; çoklu rol/izin sistemine ihtiyaç görünmüyor.

### Karar
Yetkilendirme, `firestore.rules` içinde `request.auth.token.email == 'admin@odhunberber.com'` sabit karşılaştırması ile yapılıyor; client tarafında ayrıca `NEXT_PUBLIC_ADMIN_EMAIL` ile ikinci bir kontrol var.

### Gerekçe (gözlemlenen)
Tek kullanıcı için custom claims/roller tanımlamak yerine en basit çözüm seçilmiş.

### Alternatifler
Firebase custom claims (`role: admin`) ile daha esnek, çoklu-admin destekleyen bir model — şu an uygulanmamış.

### Sonuçlar
Yeni bir admin eklemek veya admin e-postasını değiştirmek için **hem** `firestore.rules` **hem de** ortam değişkeni güncellenmeli — tek noktadan yönetilmiyor (bkz. [../memory/technical-debt.md](../memory/technical-debt.md)). Çoklu personel/admin ihtiyacı doğarsa bu ADR gözden geçirilmeli.

### Tarih
Doğrulanamadı

## Güncelleme Koşulları
Yeni bir mimari karar alındığında yeni bir ADR eklenir; mevcut ADR'ler silinmez.

## İlgili Dosyalar
[system-design.md](system-design.md), [../memory/technical-debt.md](../memory/technical-debt.md), [../memory/rejected-ideas.md](../memory/rejected-ideas.md)

## Son Güncelleme
2026-07-15
