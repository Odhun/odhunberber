# Ortak AI Çalışma Kuralları

## Amaç
Bu proje zaman içinde birden fazla yapay zekâ aracı (Claude Code, Codex, Gemini, ChatGPT, Antigravity, vb.) tarafından geliştirilir. Bu dosya, hangi araç kullanılırsa kullanılsın **bağlayıcı** olan ortak kuralları tanımlar. Araca özel dosyalar (`tools/*.md`) bu dosyaya referans verir, kuralları tekrarlamaz.

## Kapsam
Tüm AI araçları, her görev türü (özellik, hata, refactor, dokümantasyon, inceleme).

## Görev Başlamadan Önce
1. `../README.md` oku.
2. `../memory/project-memory.md` oku.
3. `../memory/current-task.md` oku.
4. `../memory/ai-handoff.md` dosyasındaki **en güncel** (en üstteki) kaydı oku.
5. Görevle ilgili ürün/mimari/teknik dokümanları oku (`../docs/`, `../architecture/`, `../database/`).
6. `git status` çalıştır.
7. `git diff` ile mevcut (commit edilmemiş) değişiklikleri incele.
8. Son commit'leri incele (`git log`).
9. Başka bir araç tarafından yapılmış, commit edilmemiş değişiklik olup olmadığını belirle.
10. Kod değiştirmeden önce kısa bir uygulama planı oluştur.

## Çalışma Sırasında — Yapılmayacaklar
- Aynı anda gereksiz sayıda dosya değiştirme.
- Görevle ilgisi olmayan refactoring yapma.
- Çalışan kodu gerekçesiz biçimde yeniden yazma.
- Başka aracın yaptığı, commit edilmemiş değişiklikleri silme veya ezme.
- Kullanıcı açıkça istemedikçe mimariyi değiştirme (ör. `output: 'export'` kaldırmak, Firestore yerine başka bir veritabanı, ORM ekleme).
- Yeni bağımlılık eklemeden önce mevcut çözümü araştırmadan paket ekleme.
- Gizli bilgileri (`.env.local`, Firebase service account, API key) görüntüleme, taşıma veya dokümana yazma.
- Mevcut isimlendirme ve mimari standartlarına (bkz. [../docs/coding-standards.md](../docs/coding-standards.md)) uymama.
- Büyük değişiklikleri tek adımda yapma — küçük, mantıksal adımlara böl.
- Firestore yazma/okuma değişikliklerinde `firestore.rules` ile `src/services/*.ts` arasındaki tutarlılığı kontrol etmeden bırakma.
- API sözleşmesini (bu projede: Firestore koleksiyon/alan yapısı, bkz. [../docs/api-rules.md](../docs/api-rules.md)) farkında olmadan bozma.
- Geriye dönük uyumsuz değişiklikleri sessizce yapma — açıkça belirt.
- Kullanıcının yapmadığı değişiklikleri sahiplenme.
- Belirsiz/doğrulanamayan bilgiyi gerçekmiş gibi yazma — "Durum: Doğrulanamadı" formatını kullan.
- Kodda mevcut ama görevle ilgisiz hataları kendiliğinden düzeltme — bunun yerine `../memory/known-issues.md` veya `../memory/technical-debt.md`'ye kaydet.

## Görev Sonunda
1. Değişiklikleri incele (`git diff`).
2. Uygun testleri çalıştır (bu projede test altyapısı yok — bkz. [../docs/testing.md](../docs/testing.md); en azından `npm run lint` çalıştırılmalı).
3. Build/type-check çalıştır (`npm run build` veya `npx tsc --noEmit`).
4. Güvenlik ve yetki etkisini kontrol et (özellikle `firestore.rules` dokunulduysa, bkz. [../docs/security.md](../docs/security.md)).
5. İlgili dokümanları güncelle (bkz. [../README.md](../README.md) "Hangi Dosya Hangi Bilginin Ana Kaynağı" tablosu).
6. Roadmap durumunu gerekiyorsa güncelle (`../docs/roadmap.md`).
7. Değişiklik kullanıcı/proje açısından önemliyse kök `../../CHANGELOG.md`'ye kayıt ekle.
8. Yeni bir teknik borç oluştuysa `../memory/technical-debt.md`'ye kaydet.
9. `../memory/current-task.md` dosyasını güncelle.
10. `../memory/ai-handoff.md` dosyasının **en üstüne** yeni devir teslim kaydı ekle.
11. Kullanıcıya açık ve kısa sonuç raporu sun.

## Bu Projeye Özel Ek Kurallar
- **`output: 'export'` kısıtı:** Next.js API Routes, SSR, middleware kullanılamaz. Sunucu tarafı mantık öneriliyorsa bunun yeni bir Cloud Functions katmanı gerektirdiği açıkça belirtilmeli ve kullanıcı onayı istenmeli.
- **Firestore Rules ↔ kod tutarlılığı:** `firestore.rules` içindeki `isAdmin()` (sabit e-posta) ile `src/hooks/useAuth.ts` içindeki `isAdmin` (env değişkeni) **ayrı ayrı** güncellenir. Biri değiştirilip diğeri unutulmamalı (bkz. [../docs/security.md](../docs/security.md)).
- **`src/firebase/rules.txt`, gerçek kaynak değildir** — kök dizindeki `firestore.rules` tek gerçek kaynaktır. Kural değişikliği yapılırken `rules.txt` güncellenmeyecekse bu açıkça belirtilmeli.
- **`NEXT_PUBLIC_` önekli değişkenler asla gizli veri içermemeli** (tarayıcıya gömülür).

## AI Cevap Formatı
Kod/dosya değişikliği içeren görevlerde mümkün olduğunca şu sıra izlenmeli: 1) Analiz 2) Etkilenecek dosyalar 3) Riskler 4) Yapılacak değişiklikler 5) Uygulama 6) Test sonuçları 7) Sonuç. Küçük/açık görevlerde bu kısaltılabilir. Salt soru-cevap görevlerde uzun rapor zorunlu değildir.

## İstenmeyen Davranışlar (Kullanıcı Açıkça İstemeden Yapılmaz)
Tüm projeyi yeniden yapılandırmak · framework değiştirmek · veritabanını (Firestore) değiştirmek · ORM eklemek · authentication sistemini değiştirmek · çalışan modülleri gerekçesiz yeniden yazmak · gereksiz tasarım deseni/soyutlama eklemek · fazladan servis/repository üretmek · çok sayıda yeni bağımlılık eklemek · dosyaları topluca yeniden adlandırmak · geniş kapsamlı otomatik formatlama yapmak · commit geçmişini değiştirmek (`git reset`, `git clean`, `git rebase`, force push) · gizli dosya commit etmek · kullanıcı onayı olmadan production deploy/veri silme yapmak.

## Git ve Commit Kuralları
Büyük değişiklikler mantıksal küçük parçalara bölünür (ör. `docs: ...`, `feat: ...`, `fix: ...`, `refactor: ...`). Kullanıcı açıkça istemedikçe commit/push **yapılmaz** — yalnızca önerilen commit planı raporlanır. Başka araçların commit edilmemiş değişiklikleri geri alınmaz.

## Dokümantasyon Güncelleme Kuralı
Yalnızca gerçekten etkilenen dokümanlar güncellenir. Aşağıdaki durumlarda güncelleme **zorunludur**: yeni özellik, iş kuralı değişikliği, Firestore koleksiyon/kural değişikliği, mimari değişiklik, güvenlik değişikliği, deployment değişikliği, yeni bağımlılık, kullanıcı davranışını değiştiren hata düzeltmesi, yeni teknik borç, önemli karar. Kod ile doküman çelişiyorsa çelişki gizlenmez, açıkça belirtilir.

## Güncelleme Koşulları
Bu dosyadaki kurallardan biri değiştiğinde veya yeni bir proje-özel kural eklendiğinde güncellenir.

## İlgili Dosyalar
[session-start.md](session-start.md), [session-end.md](session-end.md), [../README.md](../README.md)

## Son Güncelleme
2026-07-15
