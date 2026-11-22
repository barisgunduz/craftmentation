# ASCII Slug

English · [Türkçe](README.tr.md)

A Python helper for lowercase ASCII slugs.

[Usage](#usage)

## Overview

The `slugify(text: str) -> str` function replaces runs outside `a-z` and `0-9` with hyphens.
It does not transliterate accented characters.

## Usage

Run from `examples/library/` with the local `slug.py` file:

```bash
python3 -c "from slug import slugify; print(slugify('Hello, World!'))"
```

Output:

```text
hello-world
```

No package installation or third-party module is needed.
