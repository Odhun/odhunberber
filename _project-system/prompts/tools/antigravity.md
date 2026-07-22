# Antigravity İçin Talimatlar

Bu proje farklı zamanlarda birden fazla yapay zekâ geliştirme aracı tarafından geliştirilmektedir.

Kod değiştirmeden önce:
1. `_project-system/README.md`
2. `_project-system/prompts/shared-rules.md`
3. `_project-system/memory/project-memory.md`
4. `_project-system/memory/current-task.md`
5. `_project-system/memory/ai-handoff.md`
6. Görevle ilgili teknik dokümanlar

okunmalıdır.

Mevcut değişiklikler başka bir yapay zekâ aracına ait olabilir. Bu değişiklikleri silme, geri alma veya ezme.

Görev tamamlandığında `current-task.md` ve `ai-handoff.md` dosyalarını güncelle.

## Antigravity'ye Özel Notlar
- Otonom/ajan modunda çok adımlı görev çalıştırılıyorsa, her adımdan önce [shared-rules.md](../shared-rules.md)'deki "Çalışma Sırasında — Yapılmayacaklar" listesi otonom döngü içinde de geçerlidir; onay gerektiren adımlarda (deploy, commit, kural değişikliği) döngü durup kullanıcıdan onay istemelidir.

## Son Güncelleme
2026-07-15
