"""Behavior checks for the tiny source projects supporting the README examples."""
import io
import json
from pathlib import Path
import runpy
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]


class TemplateExampleTests(unittest.TestCase):
    def test_cli_sample_and_error_contract(self):
        script = ROOT / "examples/cli-tool/count_lines.py"
        directory = script.parent
        result = subprocess.run([sys.executable, str(script), "sample.txt"], cwd=directory,
                                text=True, capture_output=True)
        self.assertEqual((result.returncode, result.stdout), (0, "2\n"))
        with tempfile.TemporaryDirectory() as temp:
            path = Path(temp) / "input.txt"
            for content, expected in [(b"", "0\n"), (b"a\nb", "2\n")]:
                path.write_bytes(content)
                result = subprocess.run([sys.executable, str(script), str(path)], text=True, capture_output=True)
                self.assertEqual((result.returncode, result.stdout), (0, expected))
            path.write_bytes(b"\xff")
            result = subprocess.run([sys.executable, str(script), str(path)], capture_output=True)
            self.assertEqual(result.returncode, 1)
            self.assertIn(b"count_lines:", result.stderr)
        result = subprocess.run([sys.executable, str(script)], capture_output=True)
        self.assertEqual(result.returncode, 2)

    def test_api_handler_contract_without_listening_socket(self):
        handler = runpy.run_path(str(ROOT / "examples/api/server.py"))["Handler"]

        class Response:
            def __init__(self, path):
                self.path, self.wfile, self.headers = path, io.BytesIO(), {}

            def send_response(self, status):
                self.status = status

            def send_header(self, key, value):
                self.headers[key] = value

            def end_headers(self):
                pass

        for path, status, body in [("/health", 200, {"status": "ok"}),
                                   ("/missing", 404, {"error": "not found"})]:
            with self.subTest(path=path):
                response = Response(path)
                handler.do_GET(response)
                self.assertEqual(response.status, status)
                self.assertEqual(json.loads(response.wfile.getvalue()), body)
                self.assertEqual(response.headers["Content-Type"], "application/json")
                self.assertEqual(int(response.headers["Content-Length"]), len(response.wfile.getvalue()))

    def test_library_documented_results(self):
        slugify = runpy.run_path(str(ROOT / "examples/library/slug.py"))["slugify"]
        for text, expected in [("Hello, World!", "hello-world"), ("Crème", "cr-me"),
                               ("", ""), ("---", ""), ("  abc 123 ", "abc-123")]:
            with self.subTest(text=text):
                self.assertEqual(slugify(text), expected)

    def test_python_fixture_syntax_without_gui_launch(self):
        for path in (ROOT / "examples").glob("*/*.py"):
            with self.subTest(path=path):
                compile(path.read_text(encoding="utf-8"), str(path), "exec")


if __name__ == "__main__":
    unittest.main()
