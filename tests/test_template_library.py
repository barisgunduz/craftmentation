"""Guardrails for library metadata parsing and local fragment access."""
from pathlib import Path
import runpy
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
CHECKER = runpy.run_path(str(ROOT / "scripts/check_template_library.py"))


class TemplateLibrarySafetyTests(unittest.TestCase):
    def test_duplicate_metadata_key_is_rejected(self):
        with tempfile.TemporaryDirectory() as temporary:
            path = Path(temporary) / "duplicate.json"
            path.write_text('{"formatVersion": 1, "formatVersion": 2}', encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "Duplicate JSON key"):
                CHECKER["read_json"](path)

    def test_symlink_fragment_is_rejected_even_inside_root(self):
        with tempfile.TemporaryDirectory(dir=ROOT / "tests") as temporary:
            path = Path(temporary) / "linked.md"
            try:
                path.symlink_to(ROOT / "README.md")
            except OSError as error:
                self.skipTest(f"Symlink creation unavailable: {error}")
            with self.assertRaisesRegex(ValueError, "Symlink fragment path"):
                CHECKER["local_file"](path.relative_to(ROOT).as_posix())

    def test_unsupported_and_boolean_versions_are_rejected(self):
        for value in [{"formatVersion": 2}, {"formatVersion": True}, {}, []]:
            with self.subTest(value=value), self.assertRaisesRegex(ValueError, "Unsupported formatVersion"):
                CHECKER["version"](value)


if __name__ == "__main__":
    unittest.main()
