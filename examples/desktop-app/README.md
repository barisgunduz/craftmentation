# Scratch Pad

A small desktop text window for temporary notes that do not need persistence.

## Overview

Scratch Pad opens a Tkinter text widget from [app.py](app.py). The widget wraps words,
expands with its window, and receives focus when the application starts. It demonstrates
how to explain a desktop application's setup, behavior, and limits with source evidence.

### Scope and limits

Text exists only in the current window. Closing it discards the contents. There is no
save/open workflow, file browser, installer, packaged binary, or background synchronization.
Copy anything you need elsewhere before closing.

## Features

- A window titled **Scratch Pad**.
- A multiline text widget with word wrapping.
- An initial widget size of 60 character columns by 20 text lines.
- Expansion in both directions with available window space.
- Initial keyboard focus in the editor.

These properties are visible in source. They do not imply native UI testing or a
cross-platform accessibility certification.

## Requirements

Use Python 3 with a working Tkinter installation and a graphical desktop session.
Tkinter availability depends on the Python distribution and local system. No platform
matrix, installer support, or GUI interaction has been verified.

## Installation

Use the local [app.py](app.py) script. There is no package manager, application bundle,
or compilation workflow provided by this example.

## Usage

From `examples/desktop-app/` in the Craftmentation checkout:

```bash
python3 app.py
```

Type into the text area. Resize the window to give the editor more space. Closing the
window ends the application and loses its contents. Use it only for transient text you
are prepared to discard.

## Testing

The recorded checks inspect and compile the Python source without opening a window.
From the **Craftmentation repository root**:

```bash
python3 -m unittest discover -s tests -p 'test_template_examples.py'
```

A manual graphical check would launch the script, confirm focus/wrapping/resizing, type
sample notes, and close the window. That manual check has not been run; source/syntax
verification is not a substitute for a supported-platform GUI test.

## Troubleshooting

| Symptom | What to inspect |
|---|---|
| Tkinter cannot be imported | Check whether your chosen Python installation includes working Tk support |
| Window cannot open in a headless session | Use a graphical desktop environment; no terminal-only UI is implemented |
| Notes disappear after closing | This is the designed in-memory behavior, not a saved-document workflow |

The [selection inventory](selection.json) records section evidence. Screenshots, app-store
links, platform badges, installers, and deployment/build instructions are absent because
no such artifacts or workflows are provided.
