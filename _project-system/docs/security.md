# Güvenlik Standartları

## Amaç
Mevcut güvenlik modelini ve bilinen riskleri belgelemek. Bu görev kapsamında hiçbir güvenlik açığı **düzeltilmemiştir** — yalnızca tespit edilenler kaydedilmiştir.

## Kapsam
Kimlik doğrulama, yetkilendirme, veri güvenliği, secret yönetimi.

## Kimlik Doğrulama
Firebase Authentication (email/password), yalnızca admin girişi için (`src/hooks/useAuth.ts`, `src/app/admin/login`). Misafir kullanıcılar için kimlik doğrulama yok — bu bilinçli bir tasarım tercihidir (bkz. [product.md](product.md)).

## Yetkilendirme / Rol Yönetimi
Tek rol: admin. Kontrol iki ayrı yerde, **birbirinden bağımsız** yapılır:
1. `src/hooks/useAuth.ts` → `isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL || user?.email === 'admin@odhunberber.com'` (client-side, yalnızca UI/route koruması — gerçek güvenlik sınırı değildir).
2. `firestore.rules` → `isAdmin()` fonksiyonu, `request.auth.token.email == 'admin@odhunberber.com'` (**gerçek güvenlik sınırı** — env değişkenine değil sabit string'e bakar).

**Risk:** `NEXT_PUBLIC_ADMIN_EMAIL` değiştirilip `firestore.rules` güncellenmezse, yeni admin e-postası client'ta "admin" görünür ama Firestore yazma işlemleri kural seviyesinde reddedilir (veya tam tersi, kural güncellenip client env güncellenmezse UI admin'i tanımaz). Bkz. [technical-debt.md](../memory/technical-debt.md).

## Input Validation
- İstemci tarafı: `zod` şemaları (`react-hook-form` ile, `AppointmentForm.tsx`).
- Sunucu/kural tarafı: `firestore.rules` yalnızca `appointments.create` için alan varlığı + `customerName` uzunluğu (2-100) + `status == 'pending'` kontrolü yapar. **Telefon formatı, tarih/saat formatı, serviceId'nin gerçekten var olan bir hizmete karşılık gelip gelmediği Firestore kuralında doğrulanmıyor.**

## Bilinen Güvenlik Riskleri (Tespit Edildi, Düzeltilmedi)
1. **Rate limiting yok:** `appointments` koleksiyonuna herkes kimlik doğrulamadan `create` yapabilir. Bot/otomasyon ile sahte randevu doldurma (spam) mümkün — captcha/App Check/rate limit **yok**.
2. **`publicSlots` yazma kuralı gevşek:** `allow update: if request.resource.data.bookedTimes.hasAll(resource.data.bookedTimes)` — yalnızca "yeni liste eskiyi kapsıyor mu" kontrol eder, kimin/hangi tarihe yazdığını sınırlamaz. Kötü niyetli bir istemci, gerçek randevu oluşturmadan `publicSlots` içine keyfi saat ekleyip o saatleri "dolu" gösterebilir (kullanılabilirlik/DoS riski, veri bütünlüğü değil).
3. **Yetki kontrolü tutarsızlığı** (yukarıya bakınız — sabit e-posta vs env değişkeni).
4. **`slots` koleksiyonu** kuralda tanımlı ama kullanım yeri kodda bulunamadı — ölü/artık kural olabilir. Doğrulanamadı.
5. Bu maddeler yalnızca **belgelenmiştir**; düzeltme, kullanıcı onayı ve ayrı bir görev gerektirir (bkz. [../memory/technical-debt.md](../memory/technical-debt.md)).

## Secret Yönetimi
- Gerçek Firebase secret'ları yalnızca `.env.local` (git'e girmemeli — `.gitignore` durumu bu görevde doğrulanmadı, dosya içeriği okunmadı) ve GitHub Actions Secrets içinde tutulur.
- `NEXT_PUBLIC_*` önekli tüm değişkenler **tarayıcıya gömülür**, bunlar zaten "gizli" sayılmaz (Firebase API key'i genelde public kabul edilir, gerçek güvenlik Firestore Rules ile sağlanır).
- Gizli anahtar/gerçek kimlik bilgisi bu dokümantasyon sistemine hiçbir zaman yazılmamalıdır.

## Şifre Saklama / Oturum Güvenliği
Firebase Authentication tarafından yönetilir (Google altyapısı) — projeye özel şifre saklama kodu yoktur.

## Kişisel Veri Güvenliği (KVKK)
Site KVKK sayfası içeriyor (`src/app/(public)/kvkk`). Ancak randevu verisinin (ad, telefon) saklama süresi/silme politikası koda yansımamış — Durum: Doğrulanamadı, bkz. [business-rules.md](business-rules.md).

## Log Güvenliği
Client-only mimari olduğu için merkezi bir sunucu log sistemi yoktur. Tarayıcı konsoluna hassas veri (şifre, token) yazılmamalı.

## Bağımlılık Güvenliği
Durum: Doğrulanamadı. `npm audit` veya Dependabot gibi otomatik bir bağımlılık tarama süreci bu görev kapsamında tespit edilmedi.

## Güvenlik Açığı Bildirim Süreci
Durum: Doğrulanamadı. Aksiyon: Proje sahibi ile bir iletişim kanalı (ör. e-posta) belirlenmeli.

## Güncelleme Koşulları
Yetkilendirme modeli, Firestore kuralları veya secret yönetimi değiştiğinde güncellenmelidir.

## İlgili Dosyalar
[business-rules.md](business-rules.md), [api-rules.md](api-rules.md), [../memory/technical-debt.md](../memory/technical-debt.md)

## Son Güncelleme
2026-07-15
