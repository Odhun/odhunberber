# Oturum Sonu Promptu

## Amacı
Bir çalışma oturumunu güvenli ve eksiksiz biçimde kapatmak için kullanılacak hazır prompt.

## Ne Zaman Kullanılacağı
Bir görev/özellik/hata düzeltmesi tamamlandığında, oturumu bitirmeden önce.

## Gerekli Girdiler
Yok.

## Çalışma Kuralları
Bkz. [shared-rules.md](shared-rules.md) "Görev Sonunda" bölümü.

## Kullanıma Hazır Prompt
```
Bu çalışma oturumunu güvenli biçimde tamamla.

Öncelikle yapılan değişiklikleri incele ve uygun testleri çalıştır.

Ardından:
- Etkilenen dokümanları güncelle.
- Gerekliyse roadmap kaydını güncelle.
- Gerekliyse changelog kaydı ekle.
- Oluşan teknik borçları kaydet.
- current-task.md dosyasını güncelle.
- ai-handoff.md dosyasının en üstüne yeni devir teslim kaydı ekle.
- Kullanıcı onayı olmadan commit veya push yapma.

Sonuç raporunda şunları belirt:
1. Yapılan işler
2. Değiştirilen dosyalar
3. Test sonuçları
4. Bilinen sorunlar
5. Teknik borçlar
6. Sonraki önerilen adım
7. Kullanıcı kararı gereken konular
```

## Beklenen Çıktı
Yukarıdaki 7 başlıklı sonuç raporu; güncellenmiş `current-task.md` ve `ai-handoff.md`.

## Yasak İşlemler
Kullanıcı onayı olmadan commit/push/deploy yapmak.

## Görev Sonu Kontrol Listesi
Bkz. [../checklists/task-finish.md](../checklists/task-finish.md).

## Son Güncelleme
2026-07-15
