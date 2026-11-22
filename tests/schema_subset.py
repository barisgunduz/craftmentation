"""Narrow offline oracle for Phase 5 contracts; NOT a JSON Schema/metaschema engine.

Only the listed keyword subset is supported. Unknown keywords/URNs fail explicitly.
Phase 6 must additionally compile these schemas with the actual Ajv 2020 engine.
"""
import json
import re
from pathlib import Path

KEYWORDS = {"$schema", "$id", "$defs", "$ref", "title", "description", "default",
            "type", "const", "enum", "allOf", "anyOf", "oneOf", "if", "then", "else",
            "properties", "required", "additionalProperties", "propertyNames", "items",
            "minItems", "maxItems", "uniqueItems", "minLength", "maxLength", "pattern",
            "minimum", "maximum"}


def equal(left, right):
    if isinstance(left, bool) or isinstance(right, bool):
        return type(left) is type(right) and left == right
    if isinstance(left, dict) and isinstance(right, dict):
        return left.keys() == right.keys() and all(equal(left[k], right[k]) for k in left)
    if isinstance(left, list) and isinstance(right, list):
        return len(left) == len(right) and all(equal(a, b) for a, b in zip(left, right))
    return left == right


def resolve(reference, document, registry):
    name, _, fragment = reference.partition("#")
    target = registry[name] if name else document
    if fragment:
        if not fragment.startswith("/"):
            raise ValueError("Only JSON Pointer fragments are supported")
        for part in fragment[1:].split("/"):
            target = target[part.replace("~1", "/").replace("~0", "~")]
    return target, registry[name] if name else document


def inspect_schema(schema, document, registry):
    if isinstance(schema, bool):
        return
    if not isinstance(schema, dict) or set(schema) - KEYWORDS:
        raise ValueError(f"Unsupported schema keywords: {set(schema) - KEYWORDS}")
    if "$ref" in schema:
        resolve(schema["$ref"], document, registry)
    if "pattern" in schema:
        re.compile(schema["pattern"])
    for name in ("$defs", "properties"):
        for child in schema.get(name, {}).values():
            inspect_schema(child, document, registry)
    for name in ("allOf", "anyOf", "oneOf"):
        for child in schema.get(name, []):
            inspect_schema(child, document, registry)
    for name in ("if", "then", "else", "items", "additionalProperties", "propertyNames"):
        if name in schema:
            inspect_schema(schema[name], document, registry)


def validate(schema, value, document, registry):
    def check(condition, message):
        if not condition:
            raise ValueError(message)

    def apply(child, item=value):
        validate(child, item, document, registry)

    def matches(child):
        try:
            apply(child)
        except ValueError:
            return False
        return True

    if isinstance(schema, bool):
        check(schema, "False schema")
        return
    check(not set(schema) - KEYWORDS, "Unsupported schema keyword")
    if "$ref" in schema:
        target, base = resolve(schema["$ref"], document, registry)
        validate(target, value, base, registry)
    for child in schema.get("allOf", []):
        apply(child)
    if "anyOf" in schema:
        check(any(matches(child) for child in schema["anyOf"]), "No anyOf match")
    if "oneOf" in schema:
        check(sum(matches(child) for child in schema["oneOf"]) == 1, "Expected one oneOf match")
    if "if" in schema:
        branch = "then" if matches(schema["if"]) else "else"
        if branch in schema:
            apply(schema[branch])
    if "const" in schema:
        check(equal(value, schema["const"]), "Invalid constant")
    if "enum" in schema:
        check(any(equal(value, item) for item in schema["enum"]), "Invalid enum")
    if "type" in schema:
        types = {"object": isinstance(value, dict), "array": isinstance(value, list),
                 "string": isinstance(value, str), "boolean": isinstance(value, bool),
                 "null": value is None, "integer": type(value) in (int, float) and float(value).is_integer()}
        check(schema["type"] in types, "Unsupported type")
        check(types[schema["type"]], "Invalid type")
    if isinstance(value, dict):
        check(set(schema.get("required", [])) <= value.keys(), "Missing property")
        properties = schema.get("properties", {})
        for name, item in value.items():
            if "propertyNames" in schema:
                apply(schema["propertyNames"], name)
            if name in properties:
                apply(properties[name], item)
            elif "additionalProperties" in schema:
                apply(schema["additionalProperties"], item)
    if isinstance(value, list):
        check(len(value) >= schema.get("minItems", 0), "Too few items")
        check(len(value) <= schema.get("maxItems", len(value)), "Too many items")
        if schema.get("uniqueItems"):
            check(not any(equal(a, b) for i, a in enumerate(value) for b in value[i + 1:]), "Duplicate items")
        if "items" in schema:
            for item in value:
                apply(schema["items"], item)
    if isinstance(value, str):
        check(len(value) >= schema.get("minLength", 0), "String too short")
        check(len(value) <= schema.get("maxLength", len(value)), "String too long")
        if "pattern" in schema:
            check(re.search(schema["pattern"], value) is not None, "Pattern mismatch")
    if type(value) in (int, float):
        check(value >= schema.get("minimum", value), "Below minimum")
        check(value <= schema.get("maximum", value), "Above maximum")


def load(root):
    schemas = [json.loads(p.read_text(encoding="utf-8")) for p in (root / "schemas").glob("*.schema.json")]
    registry = {s["$id"]: s for s in schemas}
    if len(registry) != len(schemas):
        raise ValueError("Duplicate schema resource ID")
    for schema in schemas:
        if schema["$schema"] != "https://json-schema.org/draft/2020-12/schema":
            raise ValueError("Unexpected dialect")
        inspect_schema(schema, schema, registry)
    return registry
