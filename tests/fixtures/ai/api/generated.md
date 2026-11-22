# Local Health API

A local-only HTTP health endpoint implemented with the Python standard library.

## Overview

This fixture defines GET /health and returns JSON. It is not a production deployment example.

## Usage

From `examples/api/`, run:

```bash
python3 server.py
```

Request `/health` on `127.0.0.1:8765` for status 200 and `{"status": "ok"}`. Other GET paths return status 404 and `{"error": "not found"}`. Stop the service with Ctrl+C.

## Requirements and limitations

Use Python 3 with the port available. Starting the script opens a local listening socket. No live request was made in this walkthrough; handler behavior is covered by repository tests.
