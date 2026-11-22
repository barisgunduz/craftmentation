# Line Count

A Python script for counting UTF-8 text lines.

## Overview

The script prints the number of text lines, including a final line without a newline.

## Usage

From `examples/cli-tool/`, run:

```bash
python3 count_lines.py sample.txt
```

The included sample contains two lines, so the output is `2`. Missing arguments use argparse errors; invalid UTF-8 or unreadable input exits with status 1.

## Requirements and limitations

Use Python 3 and a readable UTF-8 input file. No third-party module or installed command is required.
