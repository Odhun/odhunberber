# API Kuralları

## Amaç
Bu proje geleneksel bir REST/HTTP API sunmaz. Bu dosya, mevcut veri erişim modelini ("Firestore doğrudan istemci erişimi") belgeler ve ileride bir HTTP API (ör. Firebase Cloud Functions) eklenirse uyulacak standardı tanımlar.

## Kapsam
Mevcut durum: statik export edilen (`output: 'export'`) bir Next.js uygulaması — **API route'u yoktur** (Next.js API Routes, statik export ile desteklenmez). Tüm veri erişimi tarayıcıdan doğrudan Firebase Firestore/Auth SDK'sı ile yapılır.

## Kullanım Şekli
Yeni bir veri işlemi gerektiğinde önce "bu, `src/services/*.ts` içinde bir Firestore fonksiyonu ile çözülebilir mi" sorusu sorulmalı. Gerçek bir sunucu tarafı (ör. e-posta gönderimi, ödeme, üçüncü taraf entegrasyon) gerekiyorsa Firebase Cloud Functions eklenmesi gerekir — bu, mimariye yeni bir katman eklemek anlamına gelir ve kullanıcıya danışılmadan yapılmamalı (bkz. [../architecture/decisions.md](../architecture/decisions.md)).

## Kurallar (Mevcut Model: Firestore "Endpoint"leri)
Gerçek HTTP endpoint yerine, yetki sınırları `firestore.rules` üzerinden tanımlanan koleksiyonlar vardır:

| Koleksiyon | Okuma | Yazma | Notlar |
|---|---|---|---|
| `appointments` | Yalnızca admin | Herkes `create` edebilir (zorunlu alan + `status=pending` kontrolü ile) | bkz. [business-rules.md](business-rules.md) |
| `publicSlots` | Herkese açık | Herkes `create`/`update` edebilir (kontrolsüz — bkz. [security.md](security.md)) | Müşteri verisi içermez |
| `services` | Herkese açık | Yalnızca admin | Hizmet/fiyat listesi |
| `settings` | Herkese açık | Yalnızca admin | Site ayarları |
| `blockedDates` | Herkese açık | Yalnızca admin | Tatil günleri |
| `slots` | Herkese açık | Yalnızca admin | Kuralda tanımlı ama kod tabanında (`src/services/`) kullanıldığı **tespit edilmedi** — Durum: Doğrulanamadı, bkz. [technical-debt.md](../memory/technical-debt.md) |

- Kimlik doğrulama: Firebase Authentication (email/password), yalnızca admin girişi için. Misafir kullanıcı için kimlik doğrulama yoktur (tasarım gereği — anonim randevu modeli).
- Yetkilendirme: `request.auth.token.email == 'admin@odhunberber.com'` kontrolü (`firestore.rules`). Tek rol vardır (admin); rol tabanlı (RBAC) bir sistem yoktur.
- Rate limiting / idempotency: **Yoktur.** Firestore Security Rules seviyesinde rate limit desteklenmez; bu proje için hiçbir ek katman (App Check, Cloud Function) yapılandırılmamıştır. Bkz. [security.md](security.md).
- Tarih/saat formatı: Tarihler ISO `YYYY-MM-DD` string, saatler `HH:MM` string, timestamp alanları (`createdAt`/`updatedAt`) ISO 8601 string (`new Date().toISOString()`) — Unix timestamp veya Firestore `Timestamp` tipi **kullanılmıyor**, bu tutarlılık korunmalı.
- Validation: İstemci tarafında `zod` (form seviyesi) + Firestore Security Rules (yazma seviyesi, sınırlı). Sunucu tarafı (Cloud Function) validasyonu yoktur.
- Dosya yükleme: Bu projede dosya/görsel yükleme özelliği **tespit edilmedi** (image `unoptimized: true`, statik görseller `public/` altında elle konuluyor olmalı).
- API loglama: Yoktur (client-only mimari; Firestore kendi audit logunu Firebase Console'da tutar).
- Geriye dönük uyumluluk / deprecated yönetimi: Firestore şeması için resmi bir versiyonlama yoktur; alan eklerken/kaldırırken bkz. [../database/migrations.md](../database/migrations.md).

## Gelecekte HTTP API Eklenirse Uygulanacak Standart
Aşağıdaki zarf (envelope) formatı, ileride bir Cloud Function/HTTP API eklenirse referans alınmalıdır (şu an **hiçbir yerde uygulanmıyor**, sadece öneridir):

Başarılı yanıt:
```json
{ "success": true, "data": {}, "meta": {} }
```

Hata yanıtı:
```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "İstenen kayıt bulunamadı.",
    "details": null,
    "requestId": "unique-request-id"
  }
}
```

## Örnekler
Bkz. `src/services/appointments.ts` — mevcut "endpoint" mantığının gerçek örneği.

## Güncelleme Koşulları
Firestore koleksiyon/kural değişikliğinde veya (varsa) gerçek bir HTTP API eklendiğinde güncellenmelidir.

## İlgili Dosyalar
[security.md](security.md), [business-rules.md](business-rules.md), [../database/schema.md](../database/schema.md)

## Son Güncelleme
2026-07-15
