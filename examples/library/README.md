# ASCII Slug

Turn text into lowercase ASCII slug strings with one inspectable Python function.

## Overview

ASCII Slug exposes `slugify(text: str) -> str` from [slug.py](slug.py). It lowercases text,
replaces each run outside `a-z` and `0-9` with a hyphen, then removes leading and trailing
hyphens. This example shows how a library README can document its public API and edge
cases without pretending the code is a published SDK.

### Scope and limits

The function does not transliterate accented characters, preserve non-ASCII scripts,
check uniqueness, or reserve slugs in storage. Output may be empty. Applications needing
internationalized or unique identifiers must handle those needs separately.

## Features

- One public function with a string input and string output.
- Lowercase ASCII letters and digits in the result.
- Consecutive separator characters collapse to one hyphen.
- Leading and trailing separators are removed.
- No external package, service, or configuration is required.

## Requirements

Use Python 3 and its standard library. The implementation imports only re. No package
publication or tested version/platform compatibility matrix exists.

## Installation

Use [slug.py](slug.py) locally, with the file available in the import path. In this example,
run commands from `examples/library/`. There is no pip install command or build step.

## Usage

From `examples/library/`:

```bash
python3 -c "from slug import slugify; print(slugify('Hello, World!'))"
```

Output:

```text
hello-world
```

The public API is `slugify(text: str) -> str`. Pass text, then decide how to use or store
the returned string in your own application. The helper has no I/O or persistent state.

## Examples

| Input | Result | Why |
|---|---|---|
| `Hello, World!` | `hello-world` | Lowercase and collapse punctuation/spacing |
| `  abc 123 ` | `abc-123` | Strip outer separators; keep digits |
| `Crème` | `cr-me` | The accented character is replaced, not transliterated |
| Empty string | Empty string | Nothing remains to normalize |
| `---` | Empty string | Separators alone are stripped |

These cases are exercised by the parent repository's fixture test. The behavior follows
the source expression, not a claim of comprehensive Unicode support.

## Testing

From the **Craftmentation repository root**:

```bash
python3 -m unittest discover -s tests -p 'test_template_examples.py'
```

The library test checks the cases above by importing the actual function. The same test
module also covers other Python examples; it is not a test runner distributed with a
published ASCII Slug package.

## Troubleshooting

| Symptom | Meaning or next step |
|---|---|
| Import fails | Run from the example directory or make the actual slug.py file importable |
| Accented letters disappear or split a word | The function is deliberately ASCII-only and does not transliterate |
| Empty result | The input contained no remaining ASCII letters/digits; handle that outcome in the caller |

The [selection inventory](selection.json) records relevant sections. Package badges,
release compatibility guarantees, performance claims, and citation/funding sections are
omitted because there is no verified evidence for them.
