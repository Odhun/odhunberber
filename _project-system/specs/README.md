# Specs Sistemi

## Amaç
Geliştirilecek özellik/hata/teknik görevlerin resmi spesifikasyon kayıtlarını tutmak.

## Kapsam
`active/` (üzerinde çalışılan), `completed/` (tamamlanmış), `templates/` (şablonlar).

## Kullanım Şekli
1. Yeni bir özellik/hata/teknik görev kullanıcı tarafından onaylandığında, `templates/` altındaki uygun şablon kopyalanır.
2. Dosya `active/` altına `RM-XXX-kisa-baslik.md` (roadmap kimliği ile eşleşecek şekilde, bkz. [../docs/roadmap.md](../docs/roadmap.md)) adıyla konur.
3. Görev tamamlandığında dosya `completed/` altına taşınır, `../memory/ai-handoff.md`'ye devir teslim kaydı eklenir.

## Kurallar
- Her spec dosyası tek bir özellik/hata/teknik görevi kapsar — birden fazla konuyu tek dosyada birleştirmeyin.
- `active/` altında aynı anda birden fazla dosya olabilir ancak `../memory/current-task.md` yalnızca birini "aktif ana görev" olarak işaret etmelidir.
- Spec tamamlandığında silinmez, `completed/`'e taşınır (geçmiş kayıt olarak kalır).

## Şablonlar
- [templates/feature-spec-template.md](templates/feature-spec-template.md) — yeni özellik
- [templates/bug-spec-template.md](templates/bug-spec-template.md) — hata düzeltme
- [templates/technical-task-template.md](templates/technical-task-template.md) — refactor/teknik borç/altyapı görevi

## Güncelleme Koşulları
Yeni bir spec türü gerektiğinde yeni şablon eklenir; süreç değiştiğinde bu dosya güncellenir.

## İlgili Dosyalar
[../docs/roadmap.md](../docs/roadmap.md), [../memory/current-task.md](../memory/current-task.md)

## Son Güncelleme
2026-07-15
