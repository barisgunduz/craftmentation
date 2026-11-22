# Project profiles

Profiles recommend relevant content; they never force unsupported sections or override
[README Standard v0.1](standard.md). Fourteen JSON profiles are available. Choose a type
from repository evidence, or use General Repository when no more specific category is
justified. Mixed repositories may use a primary profile plus explicit section inclusions.
The MVP provides limited JSON-manifest and static-HTML hints; unsupported formats
remain unknown. Explicit profile selection supports all fourteen categories without
claiming complete automatic ecosystem detection.

The shared default includes candidates for Core and Recommended content. Each profile
adds the recommendations below; only verified, safe, sourced information is selected.
For example, API authentication/endpoints belong in verified Usage or explicit custom
sections, while CLI flags and supported completion belong in their actual command guide.

| Profile | File | Profile recommendations |
|---|---|---|
| AI / Machine Learning | [ai-ml](../templates/profiles/ai-ml.json) | requirements, installation, usage, configuration, testing, references, citation |
| API / Backend Service | [api](../templates/profiles/api.json) | requirements, installation, usage, configuration, environment-variables, architecture, testing, deployment |
| CLI Tool | [cli-tool](../templates/profiles/cli-tool.json) | requirements, installation, usage, examples, configuration, testing |
| Desktop Application | [desktop-app](../templates/profiles/desktop-app.json) | requirements, installation, usage, screenshots, building, testing |
| Developer Tool | [developer-tool](../templates/profiles/developer-tool.json) | features, installation, usage, configuration, examples, testing, contributing |
| General Repository | [general](../templates/profiles/general.json) | overview, usage, contributing, license |
| Infrastructure / DevOps | [infrastructure](../templates/profiles/infrastructure.json) | architecture, requirements, installation, usage, configuration, environment-variables, deployment, security |
| Library / SDK | [library](../templates/profiles/library.json) | requirements, installation, usage, examples, testing, references |
| Mobile Application | [mobile-app](../templates/profiles/mobile-app.json) | requirements, installation, usage, screenshots, configuration, building, testing |
| Monorepo | [monorepo](../templates/profiles/monorepo.json) | project-structure, requirements, installation, usage, local-development, scripts, testing, building |
| Research Project | [research](../templates/profiles/research.json) | overview, usage, requirements, examples, references, citation, license |
| SaaS Product | [saas](../templates/profiles/saas.json) | features, requirements, quick-start, usage, configuration, deployment, support, security |
| Static Website | [static-website](../templates/profiles/static-website.json) | requirements, installation, usage, project-structure, building, deployment |
| Web Application | [web-app](../templates/profiles/web-app.json) | features, requirements, installation, quick-start, usage, configuration, testing, deployment, screenshots |

## Domain evidence guidance

### AI / Machine Learning

- Document actual model/data requirements, training/inference workflows, and limitations.
- Only include verified metrics and preserve dataset/model licensing and provenance.

### API / Backend Service

- Document verified authentication, endpoints, and request/response examples under Usage.
- Explicitly distinguish an API contract from a running service; never infer authentication.

### CLI Tool

- Document actual commands, flags, exit behavior, and working directory under Usage.
- Add custom shell-completion guidance only if completion is implemented.

### Desktop Application

- Confirm platform/runtime requirements and packaging artifacts.
- Include screenshots only when real, permitted assets exist.

### Developer Tool

- Explain the developer workflow and verified integration surfaces.
- Do not imply compatibility with untested tools or platforms.

### General Repository

- Use verified reading or adaptation steps if the repository has no executable.
- Do not infer installation, build, tests, project license, or a runtime.

### Infrastructure / DevOps

- Document actual provider requirements, resource effects, credentials handling, and rollback.
- Never execute discovered infrastructure commands or invent cloud accounts.

### Library / SDK

- Document compatibility and public API from package/source evidence.
- Distinguish published package installation from local imports.

### Mobile Application

- Verify supported platforms and permissions from native configuration and source.
- Document platform build steps only when present; never invent store listings.

### Monorepo

- Describe actual workspace packages, package relationships, and shared scripts.
- State the working directory for each command; do not infer all packages share requirements.

### Research Project

- Document reproducible methods, real datasets, and limitations.
- Do not invent publication identifiers, authors, results, or citations.

### SaaS Product

- Verify hosted service URLs, access conditions, and local development separately.
- Do not infer pricing, uptime, account availability, or security guarantees.

### Static Website

- Distinguish directly opened HTML from a site requiring a build.
- Document hosting/build workflows only when implemented.

### Web Application

- Confirm browser/client behavior from source.
- Include deployment only with an actual supported deployment workflow.

See the [template library contract](templates.md) for metadata, precedence, custom
sections, and exclusion behavior, and [examples](../examples/README.md) for source-backed
manual compositions. A profile is guidance, not a claim of runtime compatibility.
