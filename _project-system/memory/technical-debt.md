# Teknik Borç Kayıtları

## Amaç
Kod incelemesi sırasında tespit edilen, bu görev kapsamında **düzeltilmeyen** teknik borçları kaydetmek. Kod içinde yalnızca yorum olarak bırakılmaz — burada resmi kayıt tutulur.

## Kapsam
`_project-system` kurulumu (2026-07-15) ve Anamur SEO/UX/admin panel genişletme görevi (2026-07-22) sırasında tespit edilen maddeler.

## Kayıtlar

### TD-001 — Admin yetki kontrolü iki bağımsız yerde tanımlı
- **Açıklama:** `src/hooks/useAuth.ts` (`isAdmin`, env değişkeni + hardcoded fallback) ile `firestore.rules` (`isAdmin()`, yalnızca hardcoded e-posta) birbirinden bağımsız. Biri güncellenip diğeri unutulursa yetki tutarsızlığı oluşur.
- **Ortaya çıkma sebebi:** Tek admin modeli basit tutulmak istenmiş (bkz. [../architecture/decisions.md](../architecture/decisions.md) ADR-003), ancak tek kaynaktan yönetilmiyor.
- **Etkilenen alan:** Kimlik doğrulama/yetkilendirme, `src/hooks/useAuth.ts`, `firestore.rules`.
- **Risk Seviyesi:** Orta-Yüksek (yetki tutarsızlığı, admin'in kendi verisine erişememesi veya beklenmedik erişim).
- **Kullanıcı Etkisi:** Admin e-postası değiştirildiğinde panel bozulabilir.
- **Geçici Çözüm:** Yok — iki dosya elle senkron tutuluyor.
- **Kalıcı Çözüm Önerisi:** Firebase custom claims (`role: admin`) kullanılarak tek kaynaktan yönetim (kullanıcı onayı gerektirir, mimari değişiklik).
- **Öncelik:** Orta
- **Durum:** Açık
- **İlgili Dosyalar:** [../docs/security.md](../docs/security.md), [../architecture/decisions.md](../architecture/decisions.md)
- **Oluşturulma Tarihi:** 2026-07-15

### TD-002 — `src/firebase/rules.txt`, deploy edilen `firestore.rules` ile senkron değil
- **Açıklama:** `diff` ile doğrulandı: `rules.txt` içinde `customerPhone.size() >= 10 && <= 15` kontrolü var, gerçek `firestore.rules`'ta yok. Gerçek kural, yedek dosyadan daha gevşek.
- **Ortaya çıkma sebebi:** `rules.txt` muhtemelen eski bir kopya/yedek, güncel kural değişikliklerinde güncellenmemiş.
- **Etkilenen alan:** `src/firebase/rules.txt`, `firestore.rules`, veri doğrulama.
- **Risk Seviyesi:** Düşük-Orta (yanıltıcı dokümantasyon; gerçek güvenlik açığı değil ama kafa karışıklığına yol açar).
- **Kullanıcı Etkisi:** Geliştirici `rules.txt`'e bakıp "telefon doğrulanıyor" sanabilir, oysa gerçek kural doğrulamıyor.
- **Geçici Çözüm:** `_project-system` dokümanlarında `firestore.rules` (kök) tek gerçek kaynak olarak işaretlendi.
- **Kalıcı Çözüm Önerisi:** `rules.txt` ya silinip yerine "bkz. kök `firestore.rules`" notu bırakılmalı ya da build script ile otomatik senkron tutulmalı (kullanıcı onayı gerekir).
- **Öncelik:** Düşük
- **Durum:** Açık
- **İlgili Dosyalar:** [../database/migrations.md](../database/migrations.md), [../architecture/modules.md](../architecture/modules.md)
- **Oluşturulma Tarihi:** 2026-07-15

### TD-003 — `src/app/` altında boş/duplicate route klasörleri
- **Açıklama:** `(public)/about`, `(public)/appointment` vb. route group'ların yanında, aynı isimde **boş** üst düzey klasörler de var (`src/app/about`, `src/app/appointment`, ...).
- **Ortaya çıkma sebebi:** Doğrulanamadı — muhtemelen route group'a geçiş sırasında eski klasörler silinmedi.
- **Etkilenen alan:** `src/app/` yapısı.
- **Risk Seviyesi:** Düşük (işlevsel etkisi yok gibi görünüyor, kafa karışıklığı riski var).
- **Kullanıcı Etkisi:** Yok (muhtemelen), ama yeni geliştirici yanlış klasöre dosya ekleyebilir.
- **Geçici Çözüm:** [../docs/project-structure.md](../docs/project-structure.md)'de açıkça işaretlendi, dokunulmadı.
- **Kalıcı Çözüm Önerisi:** Proje sahibi onayı ile boş klasörler silinmeli.
- **Öncelik:** Düşük
- **Durum:** Açık — kullanıcı onayı bekleniyor
- **İlgili Dosyalar:** [../docs/coding-standards.md](../docs/coding-standards.md), [../docs/project-structure.md](../docs/project-structure.md)
- **Oluşturulma Tarihi:** 2026-07-15

### TD-004 — İki ayrı "utils" konumu
- **Açıklama:** `src/utils/` klasörü tamamen boş; gerçek yardımcı fonksiyonlar `src/lib/utils.ts` içinde.
- **Ortaya çıkma sebebi:** Doğrulanamadı.
- **Etkilenen alan:** Proje yapısı, yeni kod eklerken kafa karışıklığı.
- **Risk Seviyesi:** Düşük.
- **Kullanıcı Etkisi:** Yok.
- **Geçici Çözüm:** Standart olarak `src/lib/utils.ts` kullanılacağı [../docs/coding-standards.md](../docs/coding-standards.md)'de belirtildi.
- **Kalıcı Çözüm Önerisi:** Boş `src/utils/` klasörü kaldırılabilir (kullanıcı onayı gerekir).
- **Öncelik:** Düşük
- **Durum:** Açık
- **İlgili Dosyalar:** [../docs/coding-standards.md](../docs/coding-standards.md)
- **Oluşturulma Tarihi:** 2026-07-15

### TD-005 — Test altyapısı yok
- **Açıklama:** `package.json`'da hiçbir test kütüphanesi/script'i yok; kod tabanında test dosyası bulunamadı.
- **Ortaya çıkma sebebi:** Proje henüz erken/tek geliştiricili aşamada, test yatırımı yapılmamış.
- **Etkilenen alan:** Tüm proje.
- **Risk Seviyesi:** Orta (regresyonların fark edilmeden production'a gitme riski).
- **Kullanıcı Etkisi:** Hata düzeltmeleri/yeni özellikler manuel test gerektiriyor.
- **Geçici Çözüm:** Yok.
- **Kalıcı Çözüm Önerisi:** En azından Firestore Rules için Firebase Emulator testi ve kritik randevu akışı için bir e2e test aracı (kullanıcı onayı ile) kurulmalı.
- **Öncelik:** Orta
- **Durum:** Açık
- **İlgili Dosyalar:** [../docs/testing.md](../docs/testing.md)
- **Oluşturulma Tarihi:** 2026-07-15

### TD-006 — `publicSlots` ↔ `appointments` senkronizasyonu tek yönlü ve "best effort"
- **Açıklama:** Randevu oluşturulurken `publicSlots.bookedTimes`'a saat eklenir (`try/catch`, hata olursa yutuluyor); randevu iptal/silindiğinde bu saatin `publicSlots`'tan kaldırıldığına dair kod bulunamadı.
- **Ortaya çıkma sebebi:** `createAppointment` içindeki yorum "Non-critical — appointment still created" bilinçli bir tasarım tercihi gibi görünüyor, ancak iptal/silme tarafı ele alınmamış.
- **Etkilenen alan:** `src/services/appointments.ts`, randevu/slot tutarlılığı.
- **Risk Seviyesi:** Orta (iptal edilen randevunun saati "dolu" görünmeye devam edebilir, müşteri o saati bir daha alamaz).
- **Kullanıcı Etkisi:** Misafir kullanıcı, aslında boş olan bir saati dolu sanabilir.
- **Geçici Çözüm:** Yok.
- **Kalıcı Çözüm Önerisi:** `updateAppointmentStatus`/`deleteAppointment` içine `publicSlots.bookedTimes`'tan ilgili saati çıkaran mantık eklenmeli (kullanıcı onayı ile ayrı görev).
- **Öncelik:** Orta
- **Durum:** Açık
- **İlgili Dosyalar:** [../architecture/data-flow.md](../architecture/data-flow.md), [../database/data-integrity.md](../database/data-integrity.md)
- **Oluşturulma Tarihi:** 2026-07-15

### TD-007 — Rate limiting / bot koruması yok
- **Açıklama:** `appointments.create` ve `publicSlots` yazımı kimlik doğrulamasız herkese açık; App Check/captcha/rate limit yok.
- **Ortaya çıkma sebebi:** Misafir randevu modeli bilinçli bir tercih, ancak kötüye kullanım koruması eklenmemiş.
- **Etkilenen alan:** `firestore.rules`, güvenlik.
- **Risk Seviyesi:** Orta (spam randevu/slot doldurma riski).
- **Kullanıcı Etkisi:** Kötü niyetli biri tüm saatleri sahte randevu ile doldurabilir.
- **Geçici Çözüm:** Yok.
- **Kalıcı Çözüm Önerisi:** Firebase App Check veya bir captcha/rate-limit Cloud Function eklenmesi (kullanıcı onayı ile, mimari değişiklik).
- **Öncelik:** Orta
- **Durum:** Açık
- **İlgili Dosyalar:** [../docs/security.md](../docs/security.md)
- **Oluşturulma Tarihi:** 2026-07-15

### TD-008 — Gerçek işletme bilgisi (adres/telefon/sosyal medya) eksik
- **Açıklama:** `src/lib/constants.ts` içindeki `CONTACT.phone`, `CONTACT.address` (açık adres), `CONTACT.instagram`, `CONTACT.facebook` gerçek/doğrulanmış değil — 2026-07-22 görevinde bilinçli olarak yer tutucu bırakıldı (kullanıcı: "şimdilik yer tutucu kullan"). İlçe düzeyi bilgi (Anamur, Mersin) gerçek ve doğru.
- **Ortaya çıkma sebebi:** İşletmenin gerçek NAP (isim-adres-telefon) bilgisi görev anında mevcut değildi.
- **Etkilenen alan:** `src/lib/constants.ts`, `LocationSection.tsx`, `Footer.tsx`, `contact/page.tsx`, `schema.ts` (LocalBusiness), admin `settings/page.tsx` varsayılan değerleri.
- **Risk Seviyesi:** Orta (gerçek adres/telefon olmadan Google Business/yerel SEO ve müşteri iletişimi tam çalışmaz).
- **Kullanıcı Etkisi:** Ziyaretçi "Yol Tarifi Al" linkine tıkladığında yalnızca "Anamur Merkez, Mersin" genel aramasına yönlenir, tam adrese değil. Telefon numarası `+90 5XX XXX XX XX` formatında olup gerçek bir numara değildir.
- **Geçici Çözüm:** Kod içinde `// TODO` yorumu ve bu kayıt ile açıkça işaretlendi.
- **Kalıcı Çözüm Önerisi:** Proje sahibi gerçek adres/telefon/sosyal medya hesaplarını sağladığında `src/lib/constants.ts`, `firestore.rules` gerekmez ama `settings/siteConfig` (admin panelinden) güncellenmeli.
- **Öncelik:** Yüksek (production'a çıkmadan önce mutlaka çözülmeli)
- **Durum:** Açık
- **İlgili Dosyalar:** [../docs/security.md](../docs/security.md), [../architecture/integrations.md](../architecture/integrations.md)
- **Oluşturulma Tarihi:** 2026-07-22

### TD-009 — Admin dashboard "tahmini haftalık ciro" güncel fiyata göre hesaplanıyor
- **Açıklama:** `src/app/admin/page.tsx` içindeki ciro tahmini, randevu anındaki gerçek fiyatı değil, **mevcut** hizmet fiyat listesini kullanır (`appointments` dokümanında fiyat alanı saklanmıyor, yalnızca `serviceId`/`serviceName`). Fiyatlar zamanla değiştiyse geçmiş haftaların tahmini yanlış olabilir.
- **Ortaya çıkma sebebi:** Veri modelinde randevu anındaki fiyatı saklayan bir alan yok (bkz. [../database/schema.md](../database/schema.md)).
- **Etkilenen alan:** `src/app/admin/page.tsx` dashboard analitiği.
- **Risk Seviyesi:** Düşük (yalnızca tahmini/bilgilendirici bir metrik, sayfada bu sınırlama zaten kullanıcıya not olarak gösteriliyor).
- **Kullanıcı Etkisi:** Admin, geçmiş dönem gerçek cirosunu değil güncel fiyatla tahmini görür.
- **Geçici Çözüm:** Dashboard'da açıklayıcı not eklendi ("Tahmini ciro, mevcut hizmet fiyat listesine göre hesaplanır...").
- **Kalıcı Çözüm Önerisi:** `appointments` dokümanına oluşturma anındaki `price` alanı eklenmesi (şema değişikliği, kullanıcı onayı gerektirir).
- **Öncelik:** Düşük
- **Durum:** Açık
- **İlgili Dosyalar:** [../database/schema.md](../database/schema.md), [../database/data-integrity.md](../database/data-integrity.md)
- **Oluşturulma Tarihi:** 2026-07-22

## Güncelleme Koşulları
Yeni bir teknik borç tespit edildiğinde eklenir; çözüldüğünde "Durum" alanı "Çözüldü" olarak güncellenir, kayıt silinmez.

## İlgili Dosyalar
[../docs/security.md](../docs/security.md), [known-issues.md](known-issues.md)

## Son Güncelleme
2026-07-22
