"""Phase 5 structural design tests, not CLI/Ajv runtime tests."""
import copy
import json
from pathlib import Path
import unittest
from schema_subset import load, validate

ROOT = Path(__file__).resolve().parents[1]


class CLIContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.registry = load(ROOT)

    def validate(self, kind, value):
        schema = self.registry[f"urn:craftmentation:{kind}:v1"]
        validate(schema, value, schema, self.registry)

    def fixture(self, name):
        return json.loads((ROOT / f"tests/fixtures/contracts/{name}.json").read_text(encoding="utf-8"))

    def test_synthetic_positive_contract_examples(self):
        for kind, filename in [("configuration", "config-minimal"), ("configuration", "config-full"),
                               ("analysis", "analysis-example"), ("report", "report-example")]:
            with self.subTest(kind=kind, filename=filename):
                self.validate(kind, self.fixture(filename))

    def test_library_schema_preserves_existing_catalog_profiles_and_layout(self):
        paths = [ROOT / "templates/catalog.json", ROOT / "templates/default/layout.json"]
        paths += list((ROOT / "templates/profiles").glob("*.json"))
        self.assertEqual(len(paths), 16)
        for path in paths:
            with self.subTest(path=path):
                self.validate("library", json.loads(path.read_text(encoding="utf-8")))

    def test_configuration_rejects_unsafe_and_ambiguous_shapes(self):
        cases = [{"schemaVersion": 2}, {"schemaVersion": True}, {"schemaVersion": "1"},
                 {"schemaVersion": 1, "unexpected": True},
                 {"schemaVersion": 1, "sections": {"usage": False}},
                 {"schemaVersion": 1, "sections": {"unregistered": True}},
                 {"schemaVersion": 1, "projectType": "invented"},
                 {"schemaVersion": 1, "profiles": {"library": {"projectType": "web-app"}}},
                 {"schemaVersion": 1, "additionalLanguages": ["tr", "tr"]},
                 {"schemaVersion": 1, "language": "en/../../x"},
                 {"schemaVersion": 1, "ai": {"enabled": True, "provider": None}},
                 {"schemaVersion": 1, "ai": {"apiKey": "not-allowed"}}]
        for output in ["../README.md", "docs/../README.md", "/tmp/README.md", "C:/README.md",
                       "C:README.md", "docs\\README.md", "docs/\x00README.md"]:
            cases.append({"schemaVersion": 1, "output": output})
        for value in cases:
            with self.subTest(value=value), self.assertRaises(ValueError):
                self.validate("configuration", value)

    def test_config_accepts_confined_design_paths_and_explicit_provider_id(self):
        for output in ["README.md", "docs/README.md", "docs/README.tr.md"]:
            self.validate("configuration", {"schemaVersion": 1, "output": output})
        self.validate("configuration", {"schemaVersion": 1, "template": "./templates/local"})
        self.validate("configuration", {"schemaVersion": 1, "ai": {"enabled": True, "provider": "future-provider"}})
        # Structurally valid settings still need capability/path/source semantics in Phase 6.

    def test_analysis_requires_provenance_and_redacts_unsafe_values(self):
        value = self.fixture("analysis-example")
        for change in [{"sources": []}, {"value": None}, {"safe": False}, {"verification": "executed"}]:
            invalid = copy.deepcopy(value)
            invalid["facts"][0].update(change)
            with self.subTest(change=change), self.assertRaises(ValueError):
                self.validate("analysis", invalid)
        value["facts"][0].update({"safe": False, "state": "unknown", "value": None})
        self.validate("analysis", value)

    def test_report_status_exit_consistency_and_precommand_errors(self):
        report = self.fixture("report-example")
        invalid = copy.deepcopy(report)
        invalid["exitCode"] = 3
        with self.assertRaises(ValueError):
            self.validate("report", invalid)
        invalid = copy.deepcopy(report)
        invalid["data"] = None
        with self.assertRaises(ValueError):
            self.validate("report", invalid)
        report.update({"command": None, "status": "error", "exitCode": 2, "data": None})
        self.validate("report", report)
        report.update({"command": "generate", "status": "ok", "exitCode": 0,
                       "data": {"path": "README.md", "operation": "create", "dryRun": True,
                                "committed": False, "documentHash": "0" * 64,
                                "sourceFingerprint": "0" * 64, "preview": "# Example\n",
                                "diff": None, "selected": [], "omitted": [], "unresolved": []}})
        self.validate("report", report)
        report["data"]["committed"] = True
        with self.assertRaises(ValueError):
            self.validate("report", report)


if __name__ == "__main__":
    unittest.main()
