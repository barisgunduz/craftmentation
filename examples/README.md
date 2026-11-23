# Example gallery

Use these READMEs to see how Craftmentation adapts to a real project rather than filling
every possible heading. Start with [Craftmentation’s own README](../README.md) for a
working framework with several components, or choose the closest small project below.

| Project | What the finished README teaches |
|---|---|
| [Web app](web-app/README.md) | Opening a browser counter, exercising controls, checking accessibility feedback, and explaining in-memory state |
| [CLI tool](cli-tool/README.md) | Copyable invocation, sample output, arguments, exit codes, empty-file behavior, and file errors |
| [API](api/README.md) | Local startup, HTTP requests/responses, exact route matching, unsupported operations, and an API reference |
| [Library](library/README.md) | Local import, public function behavior, input/output examples, and limitations of ASCII slug conversion |
| [Desktop app](desktop-app/README.md) | Tkinter requirements, graphical startup, editing behavior, manual checks, and the absence of persistence |

Each includes an overview, verified features, requirements, installation, usage, testing,
and troubleshooting. CLI and library examples also show multiple inputs and results.
Each README ends by explaining its selection and omitted sections. You can inspect the
linked source next to each claim. No package installation, deployment, authentication,
screenshots, contributors, or platform guarantees are invented to make a README longer.

## Use an example

1. Read the example closest to your project.
2. Follow the [main quick start](../README.md#quick-start) in your own repository.
3. Keep the useful structure and replace every claim with evidence from your project.
4. Remove sections your project does not need; review commands and links before saving.

The examples are deliberately small runnable programs, not production products. A small
program should have a complete, useful README without pretending to be a large application.
Browser/desktop interaction is documented as a manual check and has not been exercised in
the recorded automated verification. API handler tests do not establish a live server test.

## Actual source-only AI output

The CLI has also been exercised without these curated READMEs. See the actual
[library AI draft](library/README.ai.md) beside its source and the
[live source-only evaluation](../docs/ai-source-evaluation.md) for all five examples.
These are model proposals requiring review, not claims of automatically verified facts.

## Curated examples and CLI output

These READMEs were composed and reviewed manually against source. They illustrate the
quality to aim for with a human or coding agent. They are **not** captured automatic CLI
output, and no model/provider evaluation is implied.

Without --agent, the CLI reuses supported sections of an existing README and JSON package
metadata. With an explicit agent, it can interpret the selected source excerpts. Generating from these examples therefore reuses their curated documentation;
it does not prove that the analyzer can infer all behavior from Python, HTML, or arbitrary
source code. A repository without usage evidence still needs reviewed content. The [practical workflow](../docs/workflow.md) explains reviewed usage input and safe
managed updates; arbitrary source understanding is still outside the CLI’s capability.

## For framework maintainers

`selection.json` is a test inventory: profile, inspected evidence sources, and expected
included sections. It does not generate the adjacent README and is not required in an
adopting repository. The API example additionally demonstrates a custom section fragment;
custom-section loading is not implemented by the CLI MVP. See the
[library guide](../docs/templates.md) to maintain profiles or section metadata.

The examples use browser HTML/JavaScript or the Python standard library and add no product
dependency. These files belong to Craftmentation under its root [MIT License](../LICENSE).
Using their structure does not assign that license to an adopting project.
