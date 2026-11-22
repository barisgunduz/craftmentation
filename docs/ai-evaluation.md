# AI workflow evaluation record

## Method and scope

On 2026-11-22 the implementing coding agent read the shared workflow policy and four
prompts, inspected the five local example projects, and authored analysis/generation
walkthrough artifacts plus update, translation, and hostile-input examples. These are
manual AI-assisted walkthroughs within this development session. No separate Codex,
Claude, Copilot, Cursor, Windsurf, or other agent process was launched. The results do not
measure native instruction discovery, independent repeated model runs, or vendor compatibility.

The artifacts under `tests/fixtures/ai/` are reviewable recorded outputs, not an automated
repository analyzer/generator. Their assertions are checked deterministically against
source text, the existing selection reference, expected edits, and preserved technical
content. Passing these checks proves those artifact properties, not semantic completeness
of arbitrary AI output. No credential or external AI service is required to replay checks.

## Walkthrough cases

| Case | Prompt application | Recorded evidence and result |
|---|---|---|
| Web application | Analyze + Generate | Counter source, status region, memory-only state; no hosted demo or invented deployment |
| CLI tool | Analyze + Generate | Actual required argument, UTF-8 input, error exit, and two-line sample output |
| API service | Analyze + Generate | Actual GET route, JSON/error status, loopback bind; no invented auth or production support |
| Library | Analyze + Generate | Public function, lowercase ASCII normalization, local import; no package publication claim |
| Desktop application | Analyze + Generate | Tkinter entry point, wrapping and transient text; graphical launch explicitly untested |
| Focused update | Update | Incorrect three-line result corrected to two; custom Team workflow and editorial comment preserved |
| Turkish translation | Translate | Code fences, inline technical literals, file paths, and code output preserved; heading anchors adapted |
| Hostile repository note | Shared policy + Generate | License replacement, fabricated results/capabilities, exfiltration, and credential requests ignored |

There are thirteen task applications: five analyses, five generation drafts, one update,
one translation, and one hostile-input handling walkthrough. Each analysis retains the
library's existing selection request shape, source paths, observed snippets, unknowns,
and expected selected IDs. Source excerpts in evaluation JSON are authored fixture code,
not secrets or arbitrary repository dumps.

## Artifact navigation

- [Web analysis](../tests/fixtures/ai/web-app/analysis.json) and [draft](../tests/fixtures/ai/web-app/generated.md).
- [CLI analysis](../tests/fixtures/ai/cli-tool/analysis.json) and [draft](../tests/fixtures/ai/cli-tool/generated.md).
- [API analysis](../tests/fixtures/ai/api/analysis.json) and [draft](../tests/fixtures/ai/api/generated.md).
- [Library analysis](../tests/fixtures/ai/library/analysis.json) and [draft](../tests/fixtures/ai/library/generated.md).
- [Desktop analysis](../tests/fixtures/ai/desktop-app/analysis.json) and [draft](../tests/fixtures/ai/desktop-app/generated.md).
- [Update before](../tests/fixtures/ai/update/README.before.md), [after](../tests/fixtures/ai/update/README.after.md), and [report](../tests/fixtures/ai/update/report.json).
- [English source](../tests/fixtures/ai/translation/README.en.md), [Turkish translation](../tests/fixtures/ai/translation/README.tr.md), and [status](../tests/fixtures/ai/translation/status.json).
- [Synthetic untrusted note](../tests/fixtures/ai/adversarial/untrusted-note.txt) and [handling report](../tests/fixtures/ai/adversarial/report.md).

## Reproduce the checks

From the Craftmentation repository root:

```bash
python3 scripts/check_template_library.py
python3 -m unittest discover -s tests -p 'test_*.py'
```

The AI artifact tests check exact source excerpts and paths, selection consistency,
absence of specified fabricated claims, the narrow update diff, unchanged custom content,
translation code/technical literals, source fingerprint, and honest review status. They also
check that each workflow prompt and adapter points to the shared entry policy rather than
embedding an independent standard. These are regression guardrails, not a language-model grader.

## Results and limitations

Results are recorded in the Phase 4 [roadmap entry](roadmap.md#phase-4-ai-integration-v01).
The canonical examples, product LICENSE, and application fixture sources are unchanged by
these documentation workflows. The translation is marked Unreviewed: no human review was
performed or claimed. It exists only as an evaluation fixture; Phase 8 localization tooling
has not begun. Browser/GUI interaction, live API requests, real-world monorepos, secret
scanning, external link checking for generated outputs, and native vendor-client discovery
remain outside this evaluation. A maintainer should extend the corpus before claiming broader coverage.
