# Installation and upgrade guidance

Version 0.1.0 is the initial release.
Use Node 24.22.3+ within 24.x or 26.13.1+ within 26.x. Python 3.9+ is needed only for
contributor verification, not for the installed deterministic CLI.

## Install from npm

```bash
npm install --global craftmentation@0.1.0
craftmentation --version
craftmentation --help
```

Run `craftmentation analyze --root /path/to/your-project` for read-only repository analysis.
For source interpretation, install and authenticate Codex CLI or Claude Code separately,
then follow the [AI drafting guide](ai-drafting.md). Deterministic commands need neither.

Without a global installation, use `npx --yes craftmentation@0.1.0 --help`, or install
the package locally in a separate tooling directory and run it with npm exec.

## Source checkout

After deliberately updating your Craftmentation checkout, preserve local changes and run:

```bash
npm ci --ignore-scripts
npm run build
node dist/cli/index.js --version
```

The CLI should report 0.1.0. No command updates Git or rewrites adopting projects.
Existing older development installations need the newer Node floor before building.

## Try the local tarball

From this checkout, npm run package:check builds and tests the artifact, then records
artifacts/craftmentation-0.1.0.tgz and artifacts/verification.json. These are generated
local files ignored by Git. Verify the recorded digest before sharing an artifact.

To test it yourself, create a separate empty directory and initialize its package.json
with npm init --yes. From there, replace the path below with the actual candidate path:

```bash
npm install --ignore-scripts /absolute/path/to/craftmentation/artifacts/craftmentation-0.1.0.tgz
npm exec --offline -- craftmentation --version
npm exec --offline -- craftmentation --help
```

This installs only into that consumer. It is not a registry publication or a global
installation. Use the npm route above for registry installation.
No preinstall/install/postinstall/prepare hook is shipped; the prepack build is for maintainers.

## Preserve adopting projects

Back up or commit your own project changes before deliberately upgrading tooling. Keep
craftmentation.config.json and any original-byte backups. Version-1 configuration and
library IDs remain unchanged, and reserved settings still fail explicitly. There is no
automatic migration or network/model call caused by upgrading/installing Craftmentation.

Inspect and validate generated documentation after an upgrade. Plain/custom READMEs stay
unowned. Managed regions edited by hand still conflict; --write is not a force overwrite.
Use the [workflow](workflow.md) for preview/review/save and backup recovery. Agent-generated
drafts require factual review and do not become managed regions automatically.

For rollback, reinstall the exact previously reviewed version or local artifact and validate your
configuration/documentation before applying another update. No automatic rollback rewrites
project files or removes unknown locks/backups. See [known limits](release-notes.md).
