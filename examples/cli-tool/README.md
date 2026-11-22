# Line Count

Count the lines in a UTF-8 text file with a small Python command.

## Overview

Line Count demonstrates a CLI README grounded in an actual script,
[count_lines.py](count_lines.py). It reads one file, prints one integer, and reports file
or decoding errors on stderr. It does not modify the input, traverse directories, or
execute content found inside a file.

### Scope and limits

This is a local script, not a published Python package or installed global command.
It accepts UTF-8 text only. It counts Python text-file iteration results, not words,
bytes, or a benchmark of file-processing performance.

## Features

- One required file-path argument.
- UTF-8 decoding and a numeric result on stdout.
- Built-in argparse help and argument diagnostics.
- Nonzero exit status for unreadable or invalid UTF-8 input.

## Requirements

Use Python 3 and a readable UTF-8 file. The script uses only argparse and pathlib from
the standard library. It has no API key, external service, or third-party module dependency.

## Installation

Use [count_lines.py](count_lines.py) directly from this example directory. The input
[sample.txt](sample.txt) is included. No package installation or build step is provided.

## Usage

From `examples/cli-tool/` in the Craftmentation checkout:

```bash
python3 count_lines.py sample.txt
```

The included two-line sample produces:

```text
2
```

| Argument/option | Required | Behavior |
|---|---|---|
| `path` | Yes | File to read as UTF-8 text |
| `-h`, `--help` | No | Show argparse usage and exit |

| Exit status | Meaning |
|---|---|
| 0 | Count printed successfully, or help displayed |
| 1 | File access or Unicode decoding failed |
| 2 | argparse rejected the command syntax, such as a missing path |

## Examples

Show help from the same directory:

```bash
python3 count_lines.py --help
```

For a different existing UTF-8 file, replace the path argument. An empty file produces
`0`; a final nonempty line counts even without a trailing newline. Newline count and
text-line count are therefore not always the same measurement.

## Testing

The repository's fixture tests check the sample output, empty input, a final line without
a newline, invalid UTF-8, and a missing argument. From the **Craftmentation repository root**:

```bash
python3 -m unittest discover -s tests -p 'test_template_examples.py'
```

This is the parent repository's test suite, not a fictional test command installed by the
example. It also checks the other small Python fixtures.

## Troubleshooting

| Symptom | Meaning or next step |
|---|---|
| Usage error and status 2 | Supply the required path; inspect `--help` |
| Diagnostic beginning with `count_lines:` and status 1 | Check the path, access permissions, and UTF-8 encoding |
| Unexpected count | Remember that an unterminated final text line still counts |

See the [selection inventory](selection.json) for section evidence. Shell completion,
configuration files, package publication, compatibility badges, and benchmark claims
are omitted because they are not implemented or verified.
