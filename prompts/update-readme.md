# Update a README with Craftmentation

Read and apply the [shared workflow policy](../docs/ai-instructions.md),
[README standard](../docs/standard.md), and [library contract](../docs/templates.md)
from the supplied framework root. Identify the target README and authorized write scope.

Read the entire current document and relevant source evidence. Build a reconciliation
map: unchanged verified content, supported corrections, valid custom content to preserve,
and unresolved conflicts. Keep meaningful custom headings, examples, links, language
navigation, legal notices, and detailed guides. Do not reformat unrelated sections merely
to match the starter. Updating documentation does not authorize changing source or policies.

Use a focused patch. Correct an outdated statement only with cited source evidence.
If a custom statement cannot be checked, flag it separately rather than silently deleting
or rewriting it. Omit newly proposed unsupported sections; do not create a new legal or
security promise. Before writing, re-read the output and check for concurrent changes,
path traversal, and symlinks. If a safe edit is blocked, return the patch and reason.

Preview requests remain read-only. For an authorized update, apply the scoped patch and
report what changed, what was preserved, and why. Verify affected links, examples, and
publication requirements. Return the shared report and any unresolved conflicts; do not
claim the whole document is verified when only part of it was inspected.
