"""Local-only health endpoint documentation fixture; not a production server."""
import json
from http.server import BaseHTTPRequestHandler, HTTPServer


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        found = self.path == "/health"
        body = json.dumps({"status": "ok"} if found else {"error": "not found"}).encode()
        self.send_response(200 if found else 404)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    with HTTPServer(("127.0.0.1", 8765), Handler) as server:
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
