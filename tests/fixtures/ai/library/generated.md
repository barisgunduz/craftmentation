# ASCII Slug

A Python helper that normalizes text into lowercase ASCII slug strings.

## Overview

The public `slugify(text: str) -> str` function replaces non-a-z/0-9 runs with a hyphen. It does not transliterate accented letters.

## Usage

From `examples/library/`, run:

```bash
python3 -c "from slug import slugify; print(slugify('Hello, World!'))"
```

Output:

```text
hello-world
```

## Requirements and limitations

Use Python 3 and the local `slug.py` file. No third-party dependencies or package install command are needed.
