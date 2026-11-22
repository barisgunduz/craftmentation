# Template library examples

These small, deliberately authored projects are documentation fixtures. They are not
third-party repositories, production products, or evidence that Craftmentation has a CLI.
Their source files make README claims inspectable. Each `selection.json` records the
profile, evidence sources, and expected included sections. The example READMEs were
composed manually; selection metadata does not generate them.

| Example | Evidence and teaching focus |
|---|---|
| [Web app](web-app/README.md) | Actual browser counter source; omit deployment, screenshots, and environment variables |
| [CLI tool](cli-tool/README.md) | Actual arguments, UTF-8 input, error behavior, and captured sample output |
| [API](api/README.md) | Local-only health service; explicit custom API-reference section |
| [Library](library/README.md) | Actual public function and local import; no fictional package install |
| [Desktop app](desktop-app/README.md) | Real Tkinter entry point; honest graphical-environment requirements and untested GUI limitation |

The fixtures use browser HTML/JavaScript or the Python standard library. They introduce
no dependency to the Craftmentation product. No screenshots, platform support guarantees,
authentication mechanisms, hosted URLs, sponsors, or adopters' licenses are fabricated.
Example files are part of Craftmentation under its root [MIT License](../LICENSE);
this is not an assignment of that license to repositories adopting these patterns.

For verified results and untested behavior, see the Phase 3 entry in the
[roadmap](../docs/roadmap.md). Browser and desktop GUI interaction were not verified.
Use the [library guide](../docs/templates.md) to author a different profile or custom section.
