# Local Health API

A local-only HTTP health endpoint for demonstrating a source-backed API README.

## Overview

The service in [server.py](server.py) uses Python's standard HTTP server and one GET
handler. It binds to `127.0.0.1:8765` and returns JSON for an exact health path or an
unknown GET path. It is a documentation fixture, not a production server or hosted API.

### Scope and limits

No authentication, persistence, authorization, deployment workflow, rate limiting, or
production hardening is implemented. The loopback bind limits the configured listener
to the local machine; it is not a general security guarantee.

## Features

- `GET /health` returns a successful JSON health response.
- Other GET paths return a JSON not-found response.
- Responses declare content type and byte length.
- No external package or API key is required.

## Requirements

Use Python 3 with its standard library. Local port `8765` must be available. The source
fixes the address and port; no environment-variable or configuration-file interface exists.

## Installation

Use the local [server.py](server.py) file. There is no dependency installation, container
image, package release, or build step to perform.

## Usage

From `examples/api/` in the Craftmentation checkout, start the service:

```bash
python3 server.py
```

Keep that process running. In another terminal, with curl available:

```bash
curl -i http://127.0.0.1:8765/health
```

Stop the service with **Ctrl+C**. Starting it creates a local listening socket. The request
above is an illustrative client command derived from the source; recorded verification
checks the handler directly and does not claim a live HTTP request was performed.

## API reference

| Request | Status | JSON body |
|---|---|---|
| `GET /health` | 200 | `{"status": "ok"}` |
| GET of another path | 404 | `{"error": "not found"}` |

Both responses set `Content-Type: application/json` and `Content-Length`. Only the exact
`/health` string matches: query handling and additional routes are not implemented.
This table describes the custom GET handler; it does not promise equivalent JSON behavior
for unspecified HTTP methods.

Example unknown-path request, while the service is running:

```bash
curl -i http://127.0.0.1:8765/missing
```

## Testing

From the **Craftmentation repository root**:

```bash
python3 -m unittest discover -s tests -p 'test_template_examples.py'
```

The API test calls the GET handler with in-memory response capture, checking status,
JSON, content type, and content length for health and missing paths. It does not bind a
port or establish network/platform compatibility.

## Troubleshooting

| Symptom | What to check |
|---|---|
| Service cannot bind | Check whether port 8765 is occupied and inspect the local Python error |
| Connection refused | Check that the process is running and the client uses the same local address/port |
| A path returns 404 | Only exact `/health` is implemented; other GET paths are intentionally not found |

The [selection inventory](selection.json) includes an explicit custom API-reference section;
[its fragment](api-reference.template.md) demonstrates the extension point. Hosted URLs,
security promises, authentication setup, and deployment instructions are deliberately absent.
