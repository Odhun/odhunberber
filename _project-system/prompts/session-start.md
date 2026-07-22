# Oturum Başlangıç Promptu

## Amacı
Yeni bir AI oturumu başlarken kullanılacak hazır prompt.

## Ne Zaman Kullanılacağı
Herhangi bir AI aracıyla (Claude Code, Codex, Gemini, ChatGPT, Antigravity, vb.) bu projede yeni bir çalışma oturumu başlatılırken.

## Gerekli Girdiler
Yok — doğrudan aşağıdaki prompt kullanılır.

## Çalışma Kuralları
Bkz. [shared-rules.md](shared-rules.md).

## Kullanıma Hazır Prompt
```
Bu proje farklı zamanlarda birden fazla yapay zekâ geliştirme aracı tarafından geliştirilmektedir.

Kod değiştirmeden önce _project-system/README.md dosyasını ve bu dosyada belirtilen zorunlu proje dokümanlarını oku.

Ardından:
- git status
- git diff
- son commitler
- aktif görev (_project-system/memory/current-task.md)
- son AI devir teslim kaydı (_project-system/memory/ai-handoff.md)
- ilgili mimari ve teknik dokümanlar

üzerinden mevcut durumu analiz et.

Başka araçların yaptığı değişiklikleri koru. Hiçbir değişikliği silme, geri alma veya ezme.

Önce bana şu başlıklarla kısa bir değerlendirme sun:
1. Mevcut durum
2. Son yapılan çalışmalar
3. Aktif görev
4. Tespit edilen riskler
5. Önerilen sonraki adım

Ben görev vermeden kod değiştirmeye başlama.
```

## Beklenen Çıktı
Yukarıdaki 5 başlıklı kısa değerlendirme; kod değişikliği yok.

## Yasak İşlemler
Kullanıcı görev vermeden kod/dosya değiştirmek.

## Görev Sonu Kontrol Listesi
Bu, bir görev sonu promptu değildir — bkz. [session-end.md](session-end.md).

## Son Güncelleme
2026-07-15
