# Local Health API

A small local-only HTTP service illustrating an API README.

## Overview

This Craftmentation fixture is implemented in [server.py](server.py) with Python's
standard HTTP server. It is intended for local documentation examples, not deployment.
It has no authentication, persistence, or production hardening.

## Requirements

Use Python 3 with its standard library. The server binds to `127.0.0.1:8765`;
that port must be available.

## Installation

No dependency installation or build step is required. Use the local script.

## Usage

From `examples/api/`, start the service:

```bash
python3 server.py
```

Request `/health` on the local address from an HTTP client. Stop the service with Ctrl+C.
Starting it opens a local listening socket; no external interface is configured.
The response behavior was checked at handler level, not through a live network request.

## API reference

| Request | Status | JSON body |
|---|---|---|
| GET /health | 200 | `{"status": "ok"}` |
| GET of any other path | 404 | `{"error": "not found"}` |

Responses set `Content-Type: application/json` and `Content-Length`. This table covers
only the implemented GET handler, not unspecified methods or a general API contract.

The [selection inventory](selection.json) includes this explicit custom section;
[its fragment](api-reference.template.md) uses the same metadata rules as built-ins.
