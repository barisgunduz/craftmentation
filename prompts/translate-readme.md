# Translate a README with Craftmentation

Read and apply the [shared workflow policy](../docs/ai-instructions.md),
[README standard](../docs/standard.md), and [library contract](../docs/templates.md)
from the supplied framework root. Identify the canonical source document, target language,
target path, and whether the request is a preview or an authorized edit. Do not guess the
language or overwrite the canonical source. Do not overwrite a target symlink.

Review the source and any existing translation. Record the exact source revision or a
content fingerprint before editing. Translate prose and headings while preserving fenced
code, commands, file paths, URLs, configuration keys, technical identifiers, and legal
notices. Adapt local heading anchors to translated headings; file links must still resolve.
Keep section order and valid localized custom content. Flag unsupported source claims.

Add navigation only between actual editions in the authorized scope. Report any source
navigation change needed outside that scope instead of silently editing it. Record AI
assistance and translation status honestly: matching source content is not evidence of
human review. Mark unresolved drift Needs update or Unreviewed as appropriate.

Return the draft or authorized translation and the shared report, including source
fingerprint, code/path/link preservation checks, translation status, review limitations,
and unresolved terminology or source issues. This is a manual agent workflow, not an
implemented translation service or automatic drift detector.
