# Codex İçin Talimatlar

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

## Codex'e Özel Notlar
- Sandbox/onay modu ne olursa olsun, `firebase deploy`, `git push`, prod ortamı etkileyen komutlar kullanıcı onayı olmadan çalıştırılmaz.
- Uzun görevlerde ilerlemeyi `ai-handoff.md`'ye ara kayıt olarak da düşürmek, oturum kesilirse bir sonraki aracın kaldığı yeri bulmasını kolaylaştırır.

## Son Güncelleme
2026-07-15
