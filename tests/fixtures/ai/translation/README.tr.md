# ASCII Slug

[English](README.en.md) · Türkçe

Küçük harfli ASCII slug değerleri için bir Python yardımcısı.

[Kullanım](#kullanım)

## Genel bakış

`slugify(text: str) -> str` fonksiyonu, `a-z` ve `0-9` dışındaki karakter dizilerini tirelerle değiştirir.
Aksanlı karakterleri Latin harflerine dönüştürmez.

## Kullanım

Yerel `slug.py` dosyasıyla `examples/library/` dizininden çalıştırın:

```bash
python3 -c "from slug import slugify; print(slugify('Hello, World!'))"
```

Çıktı:

```text
hello-world
```

Paket kurulumu veya üçüncü taraf modül gerekmez.
