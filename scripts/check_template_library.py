#!/usr/bin/env python3
"""Check library metadata and selection examples; never render or write documentation."""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CLASSES = {"Core", "Recommended", "Optional", "Project-specific"}
SECTION_KEYS = {"id", "standardItem", "classification", "order", "path", "fields"}


def require(condition, message):
    if not condition:
        raise ValueError(message)


def unique_object(pairs):
    result = {}
    for key, value in pairs:
        require(key not in result, f"Duplicate JSON key: {key}")
        result[key] = value
    return result


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"), object_pairs_hook=unique_object)


def keys(value, expected, context):
    require(isinstance(value, dict) and set(value) == expected, f"Invalid fields: {context}")


def version(value):
    require(isinstance(value, dict) and type(value.get("formatVersion")) is int and value["formatVersion"] == 1,
            "Unsupported formatVersion")


def string_list(value, context, nonempty=False):
    require(isinstance(value, list) and all(isinstance(x, str) and x.strip() for x in value),
            f"Invalid string list: {context}")
    require(len(set(value)) == len(value), f"Duplicate values: {context}")
    require(not nonempty or bool(value), f"Empty values: {context}")


def local_file(value):
    require(isinstance(value, str) and value and "\\" not in value,
            "Invalid fragment path")
    path = Path(value)
    require(not path.is_absolute() and ".." not in path.parts, "Unsafe fragment path")
    current = ROOT
    for part in path.parts:
        current = current / part
        require(not current.is_symlink(), "Symlink fragment path")
    require(current.is_file() and current.resolve().is_relative_to(ROOT), "Missing fragment")
    return current


def section(record, custom=False):
    keys(record, SECTION_KEYS, "section")
    require(isinstance(record["id"], str) and re.fullmatch(r"[a-z][a-z0-9]*(?:-[a-z0-9]+)*", record["id"]),
            "Invalid section ID")
    require(isinstance(record["standardItem"], str) and record["standardItem"].strip(), "Missing standard item")
    require(record["classification"] in CLASSES, "Invalid classification")
    require(type(record["order"]) is int and record["order"] > 0, "Invalid order")
    string_list(record["fields"], "fields", nonempty=True)
    require(all(re.fullmatch(r"[A-Z][A-Z0-9_]*", x) for x in record["fields"]), "Invalid field name")
    text = local_file(record["path"]).read_text(encoding="utf-8")
    require(set(re.findall(r"\{\{(.*?)\}\}", text, re.S)) == set(record["fields"]), "Fragment field mismatch")
    require(text.count("<!--") == text.count("-->"), "Unbalanced fragment comments")
    if custom:
        require(record["id"].startswith("custom-") and record["classification"] != "Core", "Invalid custom section")
    else:
        require(not record["id"].startswith("custom-"), "Reserved custom prefix")


def load_library():
    catalog = read_json(ROOT / "templates/catalog.json")
    keys(catalog, {"formatVersion", "standardVersion", "sections"}, "catalog")
    version(catalog)
    require(catalog["standardVersion"] == "0.1", "Unsupported standardVersion")
    require(isinstance(catalog["sections"], list), "Invalid sections")
    sections = {}
    for record in catalog["sections"]:
        section(record)
        require(record["id"] not in sections, "Duplicate section ID")
        sections[record["id"]] = record
    standard = (ROOT / "docs/standard.md").read_text(encoding="utf-8")
    rows = re.findall(r"^\| ([^|]+?) \| (Core|Recommended|Optional|Project-specific) \| .+ \|$", standard, re.M)
    require(len(rows) == len(sections) and dict(rows) == {r["standardItem"]: r["classification"] for r in sections.values()},
            "Standard/catalog mismatch")
    require([r["standardItem"] for r in sorted(sections.values(), key=lambda r: r["order"])] == [r[0] for r in rows],
            "Standard/catalog ordering mismatch")
    require(len({r["order"] for r in sections.values()}) == len(sections), "Duplicate built-in order")
    layout = read_json(ROOT / "templates/default/layout.json")
    version(layout)
    require(layout == {"formatVersion": 1, "id": "default", "catalog": "templates/catalog.json",
                       "selection": {"core": "required", "recommended": "candidate", "optional": "explicit-or-profile",
                                     "projectSpecific": "explicit-or-profile"}, "sort": ["order", "id"]}, "Unsupported layout")
    profiles = {}
    for path in sorted((ROOT / "templates/profiles").glob("*.json")):
        profile = read_json(path)
        keys(profile, {"formatVersion", "id", "name", "recommendations", "notes"}, "profile")
        version(profile)
        require(profile["id"] == path.stem and profile["id"] not in profiles, "Invalid profile ID")
        require(isinstance(profile["name"], str) and profile["name"].strip(), "Missing profile name")
        string_list(profile["recommendations"], "recommendations", nonempty=True)
        string_list(profile["notes"], "notes", nonempty=True)
        require(set(profile["recommendations"]) <= sections.keys(), "Unknown profile section")
        profiles[profile["id"]] = profile
    spec = (ROOT / "docs/PROJECT_SPEC.md").read_text(encoding="utf-8")
    types = spec.split("# 5. SUPPORTED PROJECT TYPES")[1].split("Each category")[0]
    require({p["name"] for p in profiles.values()} == set(re.findall(r"^\d+\. (.+)$", types, re.M)), "Project type coverage mismatch")
    return sections, profiles


def select(sections, profiles, request):
    """Reference evidence-gated selection, without source inspection or rendering."""
    keys(request, {"profile", "include", "exclude", "evidence", "customSections"}, "selection request")
    require(request["profile"] in profiles, "Unknown profile")
    records = dict(sections)
    require(isinstance(request["customSections"], list), "Invalid custom sections")
    for record in request["customSections"]:
        section(record, custom=True)
        require(record["id"] not in records, "Duplicate section ID")
        records[record["id"]] = record
    for name in ("include", "exclude"):
        string_list(request[name], name)
        require(set(request[name]) <= records.keys(), "Unknown section ID")
    require(isinstance(request["evidence"], dict), "Invalid evidence")
    require(set(request["evidence"]) <= records.keys(), "Unknown evidence ID")
    for evidence in request["evidence"].values():
        keys(evidence, {"state", "sources", "safe"}, "evidence")
        require(evidence["state"] in {"verified", "missing", "unknown"}, "Invalid evidence state")
        string_list(evidence["sources"], "sources")
        require(type(evidence["safe"]) is bool, "Invalid evidence safety")
    core = {sid for sid, r in records.items() if r["classification"] == "Core"}
    require(not core.intersection(request["exclude"]), "Cannot exclude Core information")
    candidates = core | {sid for sid, r in sections.items() if r["classification"] == "Recommended"}
    candidates |= set(profiles[request["profile"]]["recommendations"]) | set(request["include"])
    selected, unresolved = set(), set()
    for sid in candidates - set(request["exclude"]):
        evidence = request["evidence"].get(sid, {})
        if evidence.get("state") == "verified" and evidence.get("sources") and evidence.get("safe") is True:
            selected.add(sid)
        elif sid in core or sid in request["include"]:
            unresolved.add(sid)
    order = lambda sid: (records[sid]["order"], sid)
    return {"selected": sorted(selected, key=order), "unresolved": sorted(unresolved, key=order),
            "omitted": sorted(records.keys() - selected - unresolved, key=order)}


def main():
    sections, profiles = load_library()
    fixture = read_json(ROOT / "tests/fixtures/templates/selection-cases.json")
    keys(fixture, {"formatVersion", "cases"}, "selection cases")
    version(fixture)
    require(isinstance(fixture["cases"], list) and fixture["cases"], "Missing policy cases")
    total = 0
    for case in fixture["cases"]:
        try:
            actual = select(sections, profiles, case["request"])
        except ValueError as error:
            require(case.get("error") == str(error), f"{case['name']}: unexpected error {error}")
        else:
            require("error" not in case, f"{case['name']}: expected rejection")
            for key, value in case["expected"].items():
                require(actual[key] == value, f"{case['name']}: {key}: {actual[key]} != {value}")
        total += 1
    examples = list((ROOT / "examples").glob("*/selection.json"))
    require(len(examples) >= 5, "Missing representative examples")
    for path in examples:
        example = read_json(path)
        keys(example, {"formatVersion", "request", "expected"}, "example selection")
        version(example)
        actual = select(sections, profiles, example["request"])
        require(actual["selected"] == example["expected"] and not actual["unresolved"], f"Example selection mismatch: {path}")
        for evidence in example["request"]["evidence"].values():
            for source in evidence["sources"]:
                local_file(source)
        readme = path.with_name("README.md").read_text(encoding="utf-8")
        require("{{" not in readme and len(re.findall(r"^# ", readme, re.M)) == 1, f"Unfinished example: {path}")
    print(f"PASS: {len(sections)} sections, {len(profiles)} profiles, {total} policy cases, {len(examples)} evidence-backed examples")


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError, KeyError, TypeError) as error:
        print(f"FAIL: {error}", file=sys.stderr)
        sys.exit(1)
