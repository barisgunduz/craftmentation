# Template library

Start with the [library guide](../docs/templates.md), then choose a
[project profile](../docs/project-profiles.md). The [catalog](catalog.json) maps
all 48 Standard v0.1 items to reusable fragments. The [default layout](default/layout.json)
specifies candidate selection and ordering; it is metadata, not a rendering engine.

Use [README.template.md](../README.template.md) for a single-file manual starting point,
or compose individual fragments after checking evidence. All double-brace fields and
instructional comments must be resolved or removed before publication. Do not copy the
catalog, fragments, or a Craftmentation license into an adopting repository without review.

Run `python3 scripts/check_template_library.py` from the Craftmentation root to check
metadata, paths, fields, profile references, and evidence-gated selection examples.
