# Create, review, and maintain a README

For most projects, start with [your existing coding agent](../README.md#quick-start).
Supply the standard and starter, ask for a repository-backed draft, review it, then save.
You do not need to install the CLI or maintain section metadata to use that route.

The optional local CLI provides an offline workflow below. It never executes scripts it
finds, calls a model, or downloads documentation. It reads JSON package metadata, existing
Markdown, and explicitly supplied content; it does not understand arbitrary application code.

## Build the local CLI

From the Craftmentation checkout, using Node 24/26 and npm:

```bash
npm ci --ignore-scripts
npm run build
```

Run the following commands from that checkout. `--root` explicitly selects the project
being documented; change the example root to your own existing project directory.
No public npm installation command is available yet.

## Preview a draft

Try a supplied project without changing its curated README:

```bash
node dist/cli/index.js generate --root examples/library --output README.preview.md --dry-run
```

Review the printed Markdown. To save it as a **new** file, run the same command without
`--dry-run`. If the output already exists, generation refuses to replace it. You can
validate the saved draft with:

```bash
node dist/cli/index.js validate --root examples/library --document README.preview.md
```

For an existing README, your agent can reconcile the draft with the original. The CLI
will not automatically claim ownership of existing content or overwrite it.

## Fill a genuine information gap

A package name and description do not establish how to use a project. If generation
reports missing usage, create a UTF-8 Markdown file inside your target repository,
for example `USAGE.md`, containing the real steps and examples. Supply **usage body**,
without an extra `## Usage` heading. It can link to existing local source or guides.
Ask your agent to inspect source if you need help writing it; review the claims yourself.

For a fresh repository with package name/description and a reviewed USAGE.md:

```bash
node dist/cli/index.js generate --root /path/to/your-project --usage-file USAGE.md --managed --dry-run
```

`/path/to/your-project` is an example location to replace. When satisfied, repeat without
`--dry-run` to create README.md. This needs no Craftmentation configuration. A non-Node
project without an existing README may also need explicit identity/overview information;
provide a source-backed draft with your agent, or use the optional
[configuration content fields](configuration.md#mvp-population-details).

`--usage-file` is reviewed user input, not automatically verified behavior. Paths must
stay inside the target root; secrets, unsafe Markdown, unresolved fields, missing links,
and empty content are rejected. Existing content can supply features, requirements,
installation, examples, testing, and other supported sections. Declared npm scripts can
be included with `--include scripts`; their presence is not a successful execution result.

## Maintain a CLI-managed README

`generate --managed` explicitly adds invisible section markers and exact content hashes
to a newly generated file. This enables updates to those sections. It does not assign
ownership to arbitrary existing READMEs. Keep custom content outside managed regions.
If you edit inside a region, the next update stops rather than overwriting your changes.
Do not manually change marker hashes to silence a conflict; reconcile it with your agent.

From the checkout, for a target README originally created with `--managed`:

```bash
node dist/cli/index.js update --root /path/to/your-project
```

This prints a proposed diff and **Document hash** without writing anything. Review it,
then apply that exact document using the printed hash:

```bash
node dist/cli/index.js update --root /path/to/your-project --write --expect REVIEWED_SHA256
```

Replace `REVIEWED_SHA256` with the printed 64-character lowercase hash. Repeat any content,
output, or configuration options from the preview, including `--usage-file` if used.
The CLI reanalyzes and refuses if the candidate differs. Use a quiet workspace with no
other editor/process writing the target during application. Cooperative locks and final
checks do not eliminate the last check-to-rename race with an unrelated writer.

Updates refresh **existing managed regions only**. They do not insert new sections,
remove sections, reorder the document, or change custom spans. New sections or ownership
adoption need an explicit human/agent edit. An unchanged result is a no-op with no backup.
A legacy README gets preservation guidance; `--write` is rejected.

For automation, `--json` returns `data.preview`, `data.diff`, `data.documentHash`, selection,
and commit status. `generate` also accepts `--expect` to bind saving to an exact JSON
preview hash. No patch file is executed and no input is interpreted as template code.

## Backup and recovery

Every successful replacement retains a sibling file named
`README.md.craftmentation-<operation-id>.bak` (using the actual output basename).
The `I_BACKUP` diagnostic identifies it and records original/new hashes. It contains the
exact original bytes and has restrictive permissions. These local backups are ignored
by this repository's Git rules; adopters can apply the same ignore pattern deliberately.

If an operation fails, inspect its commit outcome and reported backup before retrying.
A failure after replacement can still have `committed: true`. A backup whose creation
failed may be incomplete: compare its hash before using it. Never delete an unfamiliar
lock or recovery file automatically. To restore a verified backup, review its contents
and replace the target deliberately with your editor or normal version-control workflow.
There is no automatic rollback, multi-file transaction, or hostile-filesystem guarantee.

Native runtime verification currently covers macOS. Linux/Windows remain release checks.
See the [CLI reference](cli-reference.md) for supported flags and
[safe operations](safe-file-operations.md) for the precise boundary.
