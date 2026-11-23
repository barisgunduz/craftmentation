<!-- AI-assisted draft: review factual accuracy before publishing. -->

# ASCII Slug Normalization Fixture

A Python fixture that converts text to slugs made of lowercase ASCII letters, digits, and hyphens\.

## Overview

`slugify` lowercases the input, replaces each consecutive run of characters outside `a-z` and `0-9` with a single hyphen, and strips hyphens from both ends. Characters still outside that range after lowercasing become separators. For example, `Café noir` becomes `caf-noir`. If no letters or digits remain, the result is an empty string.

## Usage

From a Python session where `slug.py` is importable, call `slugify` with a string.

```python
from slug import slugify

slugify("  Hello, World!  ")  # 'hello-world'
slugify("A__B 42")            # 'a-b-42'
slugify("!!!")                # ''
```
