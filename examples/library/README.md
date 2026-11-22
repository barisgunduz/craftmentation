# ASCII Slug

A small Python function for converting text into lowercase ASCII slug strings.

## Overview

This illustrative Craftmentation fixture exposes `slugify(text: str) -> str` from
[slug.py](slug.py). It replaces runs outside `a-z` and `0-9` with hyphens and removes
leading and trailing hyphens. It does not transliterate non-ASCII characters.

## Requirements

Use Python 3 and its standard library. No published package or compatibility matrix exists.

## Installation

Use `slug.py` locally. There is no package installation command.

## Usage

From `examples/library/`:

```bash
python3 -c "from slug import slugify; print(slugify('Hello, World!'))"
```

Output:

```text
hello-world
```

For example, `slugify('Crème')` returns `cr-me`, and `slugify('')` returns an empty string.
See the [selection inventory](selection.json) for the source-backed selection.
