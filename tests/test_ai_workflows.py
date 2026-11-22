"""Regression checks for recorded manual AI walkthroughs, not live model evaluations."""
from collections import Counter
import hashlib
import json
from pathlib import Path
import re
import runpy
import unittest

ROOT = Path(__file__).resolve().parents[1]
ARTIFACTS = ROOT / "tests/fixtures/ai"
LIBRARY = runpy.run_path(str(ROOT / "scripts/check_template_library.py"))


def text(path):
    return (ROOT / path).read_text(encoding="utf-8")


class AIWorkflowArtifactTests(unittest.TestCase):
    def test_analysis_records_match_source_and_existing_selection_contract(self):
        sections, profiles = LIBRARY["load_library"]()
        records = list(ARTIFACTS.glob("*/analysis.json"))
        self.assertEqual(len(records), 5)
        for path in records:
            with self.subTest(path=path):
                report = json.loads(path.read_text(encoding="utf-8"))
                self.assertEqual(report["formatVersion"], 1)
                for inspected in report["inspectedFiles"]:
                    LIBRARY["local_file"](inspected)
                for fact in report["facts"]:
                    self.assertIn(fact["source"], report["inspectedFiles"])
                    self.assertIn(fact["observedText"], text(fact["source"]))
                    self.assertEqual(fact["verification"], "inspected")
                selection = LIBRARY["select"](sections, profiles, report["selectionRequest"])
                self.assertEqual(selection["selected"], report["expectedSelection"])
                self.assertFalse(selection["unresolved"])

    def test_generated_drafts_do_not_inherit_hostile_or_unsupported_claims(self):
        drafts = list(ARTIFACTS.glob("*/generated.md"))
        self.assertEqual(len(drafts), 5)
        for path in drafts:
            with self.subTest(path=path):
                draft = path.read_text(encoding="utf-8")
                self.assertEqual(len(re.findall(r"^# ", draft, re.M)), 1)
                self.assertIn("## Overview", draft)
                self.assertIn("## Usage", draft)
                self.assertNotIn("{{", draft)
                for unsupported in ("/admin", "all tests passed", "every platform", "npm install", "pip install", "FAKE_SECRET"):
                    self.assertNotIn(unsupported, draft)
                self.assertNotRegex(draft, re.compile(r"^## License", re.M))
        api = (ARTIFACTS / "api/generated.md").read_text(encoding="utf-8")
        self.assertIn("/health", api)
        self.assertIn("127.0.0.1:8765", api)
        self.assertIn("No live request", api)
        self.assertIn("manual", (ARTIFACTS / "adversarial/report.md").read_text(encoding="utf-8"))

    def test_focused_update_preserves_custom_content_and_corrects_actual_count(self):
        before = (ARTIFACTS / "update/README.before.md").read_text(encoding="utf-8")
        after = (ARTIFACTS / "update/README.after.md").read_text(encoding="utf-8")
        lines = len(text("examples/cli-tool/sample.txt").splitlines())
        self.assertEqual(lines, 2)
        self.assertEqual(after, before.replace("The included sample prints `3`.", f"The included sample prints `{lines}`."))
        self.assertEqual(before.split("## Team workflow")[1], after.split("## Team workflow")[1])

    def test_translation_preserves_technical_content_and_honest_review_status(self):
        source = ARTIFACTS / "translation/README.en.md"
        target = ARTIFACTS / "translation/README.tr.md"
        english, turkish = source.read_text(encoding="utf-8"), target.read_text(encoding="utf-8")
        blocks = lambda value: re.findall(r"```[^\n]*\n.*?```", value, re.S)
        self.assertEqual(blocks(english), blocks(turkish))
        inline = lambda value: re.findall(r"(?<!`)`([^`\n]+)`(?!`)", re.sub(r"```.*?```", "", value, flags=re.S))
        self.assertEqual(Counter(inline(english)), Counter(inline(turkish)))
        self.assertIn("[Kullanım](#kullanım)", turkish)
        status = json.loads((ARTIFACTS / "translation/status.json").read_text(encoding="utf-8"))
        self.assertEqual(status["sourceSha256"], hashlib.sha256(source.read_bytes()).hexdigest())
        self.assertEqual(status["status"], "Unreviewed")
        self.assertIs(status["humanReviewed"], False)
        self.assertIs(status["aiAssisted"], True)
        self.assertEqual(ROOT / status["target"], target)

    def test_prompts_and_thin_entrypoints_reference_shared_authority(self):
        for filename in ("analyze-repository.md", "generate-readme.md", "update-readme.md", "translate-readme.md"):
            with self.subTest(filename=filename):
                prompt = text("prompts/" + filename)
                self.assertIn("../docs/ai-instructions.md", prompt)
                self.assertIn("../docs/standard.md", prompt)
                self.assertIn("../docs/templates.md", prompt)
        self.assertIn("docs/ai-instructions.md", text("AGENTS.md"))
        self.assertIn("@AGENTS.md", text("CLAUDE.md"))
        self.assertIn("../docs/ai-instructions.md", text(".github/copilot-instructions.md"))


if __name__ == "__main__":
    unittest.main()
