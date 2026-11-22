# Scratch Pad

A small transient text editor window for local notes.

## Overview

This illustrative Craftmentation fixture uses [app.py](app.py) and Tkinter to open
a wrapped text widget. Text is held only in the window; closing it discards the text.
There are no save, file-open, or packaging features.

## Requirements

Use Python 3 with a working Tkinter installation and a graphical desktop session.
Tkinter availability depends on the Python installation. No platform compatibility
matrix or GUI interaction has been tested.

## Installation

Use the local script; no installer or executable bundle is provided.

## Usage

From `examples/desktop-app/`:

```bash
python3 app.py
```

Type notes into the window. Close the window to exit. There is no persistence;
copy any notes elsewhere before closing. The entry point was inspected and syntax
checked; a graphical launch was not tested.

Screenshots and build instructions are omitted because no assets or packaging workflow
exist. See the [selection inventory](selection.json).
