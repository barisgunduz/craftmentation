# Line Count

A small Python command for counting lines in a UTF-8 file.

## Overview

This illustrative Craftmentation fixture uses [count_lines.py](count_lines.py).
It counts iterated text lines, including a final line without a trailing newline.

## Requirements

Use Python 3 and a readable UTF-8 input file. No third-party module is needed.

## Installation

Use the script directly; it is not a published package or installed shell command.

## Usage

From `examples/cli-tool/`:

```bash
python3 count_lines.py sample.txt
```

The included [sample](sample.txt) produces:

```text
2
```

Run `python3 count_lines.py --help` for the required `path` argument. A missing
argument uses argparse's error exit; an unreadable or invalid UTF-8 file exits with
status 1 and a diagnostic. Successful counting exits with status 0.

Shell completion and configuration files are not implemented. See the
[selection inventory](selection.json) for included and omitted content.
