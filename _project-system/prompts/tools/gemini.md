# Gemini İçin Talimatlar

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

## Gemini'ye Özel Notlar
- Çok dosyalı büyük bağlam pencereleri ile çalışırken bile, görev kapsamını [shared-rules.md](../shared-rules.md)'de belirtilen "gereksiz sayıda dosya değiştirme" kuralına göre sınırlı tutulmalı.
- Firestore/Firebase SDK önerileri verirken bu projenin **statik export** kısıtına (`next.config.js` → `output: 'export'`) dikkat edilmeli; SSR/API route öneren kod üretilmemeli.

## Son Güncelleme
2026-07-15
