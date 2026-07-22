# Proje Hafızası (Uzun Süreli)

## Amaç
Projenin uzun vadede değişmeyecek temel gerçeklerini tutmak. Bu dosya günlük çalışma günlüğü **değildir** — geçici görevler [current-task.md](current-task.md), teknik borçlar [technical-debt.md](technical-debt.md), kısa süreli devir teslim bilgileri [ai-handoff.md](ai-handoff.md) dosyasında tutulur.

## Ürünün Temel Amacı
Tek şubeli premium erkek kuaförü için misafir (girişsiz) randevu alma sistemi + tek-admin yönetim paneli. Detay: [../docs/product.md](../docs/product.md).

## Değişmeyecek Ana İş Kuralları
- Her randevu `pending` durumunda oluşur, yalnızca admin durumunu değiştirebilir/silebilir.
- `publicSlots` koleksiyonu **asla** müşteri kişisel verisi içermemeli — bu bir gizlilik/mimari sınırdır.
- Admin tek kullanıcıdır, e-posta eşleşmesiyle yetkilendirilir (bkz. [../architecture/decisions.md](../architecture/decisions.md) ADR-003).
Detay: [../docs/business-rules.md](../docs/business-rules.md).

## Önemli Mimari Tercihler
- Next.js statik export (`output: 'export'`) + Firebase Hosting — sunucu yok, API route yok.
- Firestore doğrudan client SDK ile kullanılıyor — özel backend/ORM yok.
- Detay ve gerekçeler: [../architecture/decisions.md](../architecture/decisions.md).

## Kullanılmaması Gereken Teknolojiler/Yaklaşımlar
- Next.js API Routes / SSR / middleware — statik export ile **çalışmaz**.
- Özel bir SQL veritabanı veya ORM — mevcut mimariyle çelişir, kullanıcı açıkça istemeden önerilmemeli.
- `src/utils/` klasörü — boş, kullanılmıyor; yeni yardımcı kod `src/lib/utils.ts`'e eklenmeli.

## Kabul Edilen Çalışma Yöntemleri
- Kod İngilizce isimlendirme, kullanıcıya gösterilen metin ve iş kuralı yorumları Türkçe (bkz. [../docs/coding-standards.md](../docs/coding-standards.md)).
- Firestore erişimi yalnızca `src/services/*.ts` üzerinden.
- Format: Prettier (tek tırnak, noktalı virgül, ES5 trailing comma) + `next/core-web-vitals` ESLint.

## Daha Önce Yaşanan Önemli Sorunlar / Sık Tekrarlanan Hatalar
- `src/firebase/rules.txt` ile deploy edilen `firestore.rules` arasında **tespit edilmiş** bir sürüklenme var (rules.txt'te olup gerçekte olmayan telefon uzunluk kontrolü). Herhangi bir kural değişikliğinde bu iki dosya karıştırılmamalı — `firestore.rules` (kök) tek gerçek kaynaktır.
- `src/app/` altında route group (`(public)`) ile aynı isimli boş klasörler var — muhtemelen migration artığı, henüz temizlenmedi.
- Test altyapısı hiç kurulmamış — bu proje için "test çalıştır" adımı şu an yalnızca `npm run lint`/`npm run build` anlamına gelir.

## Gelecekteki AI Araçlarının Bilmesi Gereken Bilgiler
- `_project-system/` bu görev kapsamında (2026-07-15) sıfırdan kuruldu; mevcut kod **değiştirilmedi**, yalnızca belgelendi.
- Kök dizinde zaten `README.md`, `PROJECT_STATUS.md`, `CHANGELOG.md` var ve bunlar **hâlâ ana kaynak** olarak kullanılıyor ([roadmap.md](../docs/roadmap.md) ve [changelog.md](../docs/changelog.md) bunlara link verir, içeriği kopyalamaz).
- Bu sistemi kullanmadan önce mutlaka [../README.md](../README.md) okunmalı.

## Güncelleme Koşulları
Yalnızca kalıcı/uzun vadeli bir gerçek değiştiğinde güncellenir (günlük iş için [current-task.md](current-task.md) ve [ai-handoff.md](ai-handoff.md) kullanılır).

## İlgili Dosyalar
[current-task.md](current-task.md), [ai-handoff.md](ai-handoff.md), [technical-debt.md](technical-debt.md), [../architecture/decisions.md](../architecture/decisions.md)

## Son Güncelleme
2026-07-15
