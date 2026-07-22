# Ürün Dokümanı — Odhun Berber Randevu Sistemi

## Amaç
Bu dosya ürünün ne olduğunu, kimin için var olduğunu ve hangi problemi çözdüğünü tanımlar. Ürünle ilgili tüm kararlar bu dosyadaki tanıma göre değerlendirilmelidir.

## Kapsam
Odhun Berber, tek şubeli premium erkek kuaförü için web tabanlı, girişsiz (misafir) randevu alma sistemi ve bu randevuları yöneten bir admin panelidir. Statik olarak export edilen bir Next.js uygulaması olup veri katmanı Firebase (Auth + Firestore) üzerindedir.

### Çözdüğü Problem
- Müşterinin telefonla arama yapmadan, siteden 3 adımda (Tarih → Saat → Bilgi Formu) randevu oluşturabilmesi.
- Berberin (tek admin kullanıcı) randevuları tek panelden görüp onaylayabilmesi, iptal edebilmesi veya silebilmesi.
- Çalışma saatlerinin, tatil günlerinin ve hizmet/fiyat listesinin kod değişikliği gerektirmeden admin panelinden yönetilebilmesi.

### Hedef Kullanıcılar
- **Misafir müşteri:** Kayıt/giriş yapmadan randevu oluşturur. Kimliği doğrulanmaz, sadece ad-soyad ve telefon bilgisi alınır.
- **Admin (berber/işletme sahibi):** Firebase Authentication ile e-posta/şifre girişi yapan tek yetkili kullanıcı. Yetki kontrolü `NEXT_PUBLIC_ADMIN_EMAIL` değişkenine (bkz. [security.md](security.md)) dayanır.

### Temel Kullanıcı Senaryoları
1. Misafir kullanıcı ana sayfadan hizmetleri ve fiyatları görür, "Randevu Al" sayfasına gider.
2. Takvimden uygun bir gün seçer (kapalı günler ve tatil günleri işaretli/engelli gösterilir).
3. O gün için boş saat dilimini seçer (dolu/beklemede saatler gösterilir ama seçilemez).
4. Ad, telefon ve hizmet bilgisini girip randevuyu gönderir → randevu `pending` durumunda oluşturulur.
5. Admin, panelden bekleyen randevuyu görür, onaylar/iptal eder/not ekler/siler.

### Ana Özellikler
- 3 adımlı randevu akışı, aylık takvim bileşeni, saat durumu göstergesi (boş/dolu/beklemede/kapalı).
- Herkese açık sayfalar: Ana sayfa, Hizmetler, Fiyat Listesi, Hakkımızda, İletişim, yasal sayfalar (KVKK, Gizlilik, Çerez, Koşullar).
- Admin paneli: dashboard, randevu listesi (filtre/arama/onay/iptal/sil/not), çalışma saatleri düzenleme, tatil günü yönetimi, hizmet yönetimi, site ayarları.
- PWA desteği (yüklenebilir, next-pwa ile offline destek).

### Kapsam Dışı Alanlar
- Online ödeme / kapora alma.
- Otomatik SMS/e-posta bildirimi (backlog'da, bkz. [[roadmap]]).
- Çoklu şube veya çoklu personel (berber) desteği.
- Çoklu dil desteği (yalnızca Türkçe).
- Kullanıcı hesabı/üyelik sistemi (yalnızca admin girişi vardır).

### Başarı Ölçütleri
Durum: Doğrulanamadı. Aksiyon: Proje sahibi ile netleştirilmeli (ör. aylık randevu sayısı, no-show oranı, Lighthouse skorları gibi somut hedefler tanımlanmalı). `../PROJECT_STATUS.md` içinde Lighthouse hedefi (Performance 90+, SEO 100, Accessibility 95+) belirtilmiş; bu tek somut ölçüttür.

### Ürün Terminolojisi
| Terim | Anlamı |
|---|---|
| Randevu (Appointment) | Bir müşterinin belirli tarih/saat için oluşturduğu kayıt. Durumu: `pending`, `confirmed`, `cancelled`. |
| Slot | Belirli bir tarihteki randevu alınabilir zaman aralığı. |
| publicSlots | Müşteri verisi içermeyen, sadece dolu saatleri tutan herkese açık koleksiyon. |
| Çalışma Programı (WorkingSchedule) | Haftanın her günü için açık/kapalı, açılış/kapanış saati ve slot aralığı. |
| Tatil Günü (BlockedDate) | Belirli bir tarihte tüm günün veya belirli saatlerin kapatılması. |

## Kullanım Şekli
Yeni bir özellik önerilmeden önce bu dosyadaki kapsam ve kapsam dışı tanımına bakılmalı; kapsam dışı bir alan isteniyorsa önce kullanıcıyla teyit edilmeli.

## Kurallar
- Bu dosyadaki tanımlarla çelişen bir özellik geliştirilmeden önce kullanıcıya sorulmalı.
- Yeni bir kullanıcı senaryosu eklendiğinde bu dosya güncellenmeli.

## Örnekler
Yukarıdaki "Temel Kullanıcı Senaryoları" bölümüne bakınız.

## Güncelleme Koşulları
Ürünün amacı, hedef kullanıcı kitlesi veya ana özellik seti değiştiğinde güncellenmelidir.

## İlgili Dosyalar
[business-rules.md](business-rules.md), [roadmap.md](roadmap.md), [../architecture/system-design.md](../architecture/system-design.md)

## Son Güncelleme
2026-07-15
