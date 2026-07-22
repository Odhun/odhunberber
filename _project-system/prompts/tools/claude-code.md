# Claude Code İçin Talimatlar

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

## Claude Code'a Özel Notlar
- Bu proje kök dizininde ayrıca `/Users/odhun/.claude/projects/.../memory/` altında (kullanıcıya özel, bu repodan bağımsız) bir Claude auto-memory sistemi bulunabilir — **o sistem bu `_project-system` ile karıştırılmamalı**. `_project-system`, projeyle birlikte git'e commit edilen ve her araç tarafından okunabilen kalıcı sistemdir; Claude'un kişisel auto-memory'si yalnızca Claude'un kendi oturumları arası hafızasıdır.
- TodoWrite/plan modu kullanılıyorsa, plan onaylandıktan sonra uygulama adımları yine [shared-rules.md](../shared-rules.md)'deki "Görev Başlamadan Önce" listesini atlamamalı.
- `git commit`/`git push` yalnızca kullanıcı açıkça istediğinde yapılır (bkz. proje CLAUDE.md/genel Claude Code kuralları — bu proje için de geçerlidir).

## Son Güncelleme
2026-07-15
