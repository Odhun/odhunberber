# _project-system — Odhun Berber Kalıcı Proje Yönetim Sistemi

Bu klasör, **Odhun Berber Randevu Sistemi**'nin (Next.js 14 + Firebase) uzun yıllar boyunca farklı geliştiriciler ve farklı yapay zekâ araçları (Claude Code, Codex, Gemini, ChatGPT, Antigravity, vb.) tarafından güvenli, tutarlı ve sürdürülebilir biçimde geliştirilebilmesi için kurulmuş kalıcı bir yönetim altyapısıdır.

**Bu klasör uygulama kodu içermez.** Uygulama kodu `../src/` altındadır ve bu sistem tarafından değiştirilmez.

## Her AI Aracı İşe Başlamadan Önce Bu Dosyayı Okumalı
Kod değiştirmeye başlamadan önce sırasıyla:
1. Bu dosya (`README.md`)
2. [prompts/shared-rules.md](prompts/shared-rules.md)
3. [memory/project-memory.md](memory/project-memory.md)
4. [memory/current-task.md](memory/current-task.md)
5. [memory/ai-handoff.md](memory/ai-handoff.md) — en güncel (en üstteki) kayıt
6. Görevle ilgili teknik dokümanlar (aşağıdaki haritaya bakınız)

Yeni bir oturuma hızlıca başlamak için hazır prompt: [prompts/session-start.md](prompts/session-start.md).
Bir görevi kapatırken kullanılacak hazır prompt: [prompts/session-end.md](prompts/session-end.md).

## Klasör Haritası

| Klasör | Görevi |
|---|---|
| [docs/](docs/) | Ürün, iş kuralları, kodlama/API/test/güvenlik/deployment standartları, roadmap, changelog politikası |
| [architecture/](architecture/) | Sistem mimarisi, modüller, veri akışları, entegrasyonlar, mimari karar kayıtları (ADR) |
| [database/](database/) | Firestore şeması, isimlendirme, migration süreci, veri bütünlüğü |
| [specs/](specs/) | Aktif/tamamlanmış özellik-hata-teknik görev spesifikasyonları + şablonlar |
| [prompts/](prompts/) | Tüm AI araçları için ortak kurallar + göreve/araca özel promptlar |
| [memory/](memory/) | Uzun süreli proje hafızası, aktif görev, AI devir teslim, kararlar, reddedilen fikirler, teknik borç, bilinen sorunlar |
| [checklists/](checklists/) | Görev başlangıç/bitiş, kod inceleme, release, olay (incident) kontrol listeleri |
| [templates/](templates/) | Changelog/ADR/devir-teslim/release-notes şablonları |
| [archive/](archive/) | Büyüyen dosyaların arşivlendiği yer (silinmez, taşınır) |

## Yeni Bir AI Oturumu Nasıl Başlatılır
[prompts/session-start.md](prompts/session-start.md) içindeki hazır promptu kullanın. Araca özel ek notlar için [prompts/tools/](prompts/tools/) altındaki ilgili dosyaya bakın.

## Görev Tamamlandığında Yapılacaklar
[prompts/session-end.md](prompts/session-end.md) ve [checklists/task-finish.md](checklists/task-finish.md) izlenir: dokümanlar güncellenir, `memory/current-task.md` ve `memory/ai-handoff.md` güncellenir, kullanıcı onayı olmadan commit/push/deploy yapılmaz.

## Süreçler
| Süreç | Rehber |
|---|---|
| Yeni özellik geliştirme | [specs/README.md](specs/README.md) → `templates/feature-spec-template.md`, [prompts/frontend.md](prompts/frontend.md)/[prompts/backend.md](prompts/backend.md) |
| Hata düzeltme | [prompts/debug.md](prompts/debug.md), `specs/templates/bug-spec-template.md` |
| Refactoring | [prompts/refactor.md](prompts/refactor.md), `specs/templates/technical-task-template.md` |
| Devir teslim | [memory/ai-handoff.md](memory/ai-handoff.md), şablon: [templates/handoff-entry.md](templates/handoff-entry.md) |
| Kod inceleme | [prompts/review.md](prompts/review.md), [checklists/code-review.md](checklists/code-review.md) |
| Güvenlik incelemesi | [prompts/security-review.md](prompts/security-review.md) |
| Release/Deploy | [checklists/release.md](checklists/release.md), [docs/deployment.md](docs/deployment.md) |
| Olay (incident) müdahalesi | [checklists/incident.md](checklists/incident.md) |

## Dokümanların Hangi Durumda Güncelleneceği
Şu değişikliklerde ilgili doküman **güncellenmesi zorunludur**: yeni özellik, iş kuralı değişikliği, Firestore koleksiyon/kural değişikliği, mimari değişiklik, güvenlik değişikliği, deployment değişikliği, yeni bağımlılık, kullanıcı davranışını değiştiren hata düzeltmesi, yeni teknik borç, önemli karar. Detay: [prompts/shared-rules.md](prompts/shared-rules.md) "Dokümantasyon Güncelleme Kuralı".

## Öncelik Sırası (Çelişki Durumunda)
1. Kullanıcının o an verdiği açık talimat.
2. [prompts/shared-rules.md](prompts/shared-rules.md) (tüm araçlar için bağlayıcı ortak kurallar).
3. İlgili konunun ana kaynağı (aşağıdaki tablo).
4. Genel iyi pratik / öneri niteliğindeki içerik.

## Hangi Dosya Hangi Bilginin Ana Kaynağıdır (Tek Ana Kaynak Tablosu)
| Konu | Ana Kaynak | Not |
|---|---|---|
| Ürün tanımı, kapsam | [docs/product.md](docs/product.md) | |
| İş kuralları | [docs/business-rules.md](docs/business-rules.md) | `firestore.rules` ile birlikte değerlendirilmeli |
| Kodlama standardı | [docs/coding-standards.md](docs/coding-standards.md) | `.eslintrc.json`/`.prettierrc` araçsal kaynaktır |
| Proje klasör yapısı | [docs/project-structure.md](docs/project-structure.md) | |
| API/veri erişim modeli | [docs/api-rules.md](docs/api-rules.md) | Bu projede HTTP API yok, Firestore modeli anlatılır |
| Deployment | [docs/deployment.md](docs/deployment.md) | |
| Test | [docs/testing.md](docs/testing.md) | Şu an kurulu değil |
| Güvenlik | [docs/security.md](docs/security.md) | |
| **Backlog/Roadmap** | **`../PROJECT_STATUS.md`** (kök dizin) | [docs/roadmap.md](docs/roadmap.md) yalnızca format standardı tanımlar, çoğaltmaz |
| **Changelog** | **`../CHANGELOG.md`** (kök dizin) | [docs/changelog.md](docs/changelog.md) yalnızca format standardı tanımlar, çoğaltmaz |
| Sistem mimarisi | [architecture/system-design.md](architecture/system-design.md) | |
| Mimari kararlar (ADR) | [architecture/decisions.md](architecture/decisions.md) | |
| Firestore şeması | [database/schema.md](database/schema.md) | `src/types/index.ts` ile birlikte tutulmalı |
| Firestore güvenlik kuralları | **`../firestore.rules`** (kök dizin) | `src/firebase/rules.txt` **güncel değil**, kaynak olarak kullanılmamalı |
| Aktif görev | [memory/current-task.md](memory/current-task.md) | |
| Devir teslim geçmişi | [memory/ai-handoff.md](memory/ai-handoff.md) | |
| Teknik borç | [memory/technical-debt.md](memory/technical-debt.md) | |
| Bilinen sorunlar | [memory/known-issues.md](memory/known-issues.md) | `../PROJECT_STATUS.md` "Bilinen Sorunlar" ile birlikte |

## Sınır (Bu Sistem Ne Değildir)
- `_project-system` içine `frontend/`, `backend/`, `api/`, `src/`, `app/`, `server/`, `client/` gibi kod klasörleri **eklenmez**. Gerçek uygulama kodu yalnızca `../src/` altındadır.
- Bu kurulum sırasında **hiçbir uygulama dosyası değiştirilmedi** — yalnızca mevcut durum belgelendi (bkz. [memory/ai-handoff.md](memory/ai-handoff.md) ilk kayıt).

## Son Güncelleme
2026-07-15
