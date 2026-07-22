# Test Standartları

## Amaç
Projenin mevcut test durumunu belgelemek ve gelecekte test eklenirse uyulacak standardı tanımlamak.

## Kapsam
Tüm test seviyeleri (unit, integration, API, e2e, regression, güvenlik, performans, smoke).

## Kullanım Şekli
Yeni test eklenmeden önce bu dosyadaki hedef standarda bakılır. Mevcut kodda test bulunmadığı için "önce test yaz" beklentisi bu görev kapsamında **zorunlu tutulmamıştır** — ancak yeni bir test altyapısı kurulursa burası güncellenmelidir.

## Mevcut Durum
Durum: **Kurulu değil.** `package.json` içinde herhangi bir test kütüphanesi (Jest/Vitest/Playwright/Cypress/Testing Library) veya `test` script'i **yoktur**. Kod tabanında test dosyası tespit edilmedi. Bkz. [technical-debt.md](../memory/technical-debt.md).

## Test Türleri (Hedef Standart — İleride Kurulacaksa)
| Tür | Bu Projede Karşılığı |
|---|---|
| Unit test | İş kuralı fonksiyonları (`src/services/*.ts`, `src/lib/utils.ts`) |
| Integration test | Servis + Firestore (Firebase Emulator Suite ile) |
| API test | Yok (API route'u yok, bkz. [api-rules.md](api-rules.md)) |
| E2E test | Randevu akışı (Tarih → Saat → Form → Gönder), admin login → onay akışı |
| Regression test | Hata düzeltmelerinde eklenmeli |
| Güvenlik testi | `firestore.rules` için Firebase Emulator kural testleri (özellikle `publicSlots` ve `appointments.create` kuralları — bkz. [security.md](security.md)) |
| Performans testi | Lighthouse (hedef: Performance 90+, SEO 100, Accessibility 95+ — `PROJECT_STATUS.md`) |
| Smoke test | Deploy sonrası ana sayfa + randevu sayfası erişilebilirlik kontrolü |

## Asgari Kurallar (Kurulduğunda Geçerli Olacak)
- Kritik iş kuralları (randevu durum geçişleri, slot çakışma kontrolü) unit test ile korunmalı.
- Firestore güvenlik kuralları emulator testleri ile doğrulanmalı — özellikle "misafir kullanıcı başka birinin randevusunu okuyamaz" ve "misafir `publicSlots` içine keyfi veri yazamaz" senaryoları.
- Test verisi gerçek müşteri verisi içermemeli (KVKK).
- Testler birbirinden bağımsız çalışmalı, sabit tarih/saat (ör. `date-fns` ile üretilen "bugün") mock'lanmalı.
- Test isimleri davranışı tanımlamalı, örn. `should_reject_appointment_when_slot_already_booked`.

## Güncelleme Koşulları
Bir test framework'ü kurulduğunda bu dosya "Mevcut Durum" bölümü güncellenerek gerçek komutlar/klasörler eklenmelidir.

## İlgili Dosyalar
[../checklists/task-finish.md](../checklists/task-finish.md), [security.md](security.md)

## Son Güncelleme
2026-07-15
