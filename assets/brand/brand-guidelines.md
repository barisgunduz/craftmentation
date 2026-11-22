# Craftmentation brand guidelines

## Reference and identity

The owner-supplied [identity board](identity-board.png) is the visual reference.
The symbol consists of two nested, angular, open hexagonal C forms, with diagonal
ribbon-like terminals. It does not contain a detached square. Production SVGs are
flat vector reconstructions of that geometry; the board's texture, lighting, and
mockup effects are not part of the reusable mark.

Character: minimal, technical, professional, clean, and developer-focused.
Tagline: **Craft better. Document smarter.**

## Palette

| Token | Hex | Use |
|---|---|---|
| Yellow | `#FBBF24` | Symbol and restrained emphasis |
| Dark | `#1F1F23` | Light-background wordmark and dark panels |
| Gray | `#6B7280` | Supporting text where contrast permits |
| Light | `#F9FAFB` | Dark-background wordmark and light surfaces |

## Asset selection

| File | Intended use |
|---|---|
| `symbol.svg` | Yellow nested-C mark with a transparent background |
| `symbol-light.svg` | Light monochrome mark on dark backgrounds, matching the board's monochrome variation |
| `logo-light.svg` | Yellow mark and dark wordmark on a transparent background, for light surfaces |
| `logo-dark.svg` | Yellow mark and light wordmark on a transparent background, for dark surfaces |
| `logo-readme.svg` | Dark background, yellow mark, light wordmark, and two-color tagline; readable in either README theme |
| `favicon.svg` | Yellow mark on a dark rounded tile |
| `identity-board.png` | Original supplied reference; not a replacement for production logo files |

The suffixes on `logo-light.svg` and `logo-dark.svg` describe the target background.
`symbol-light.svg` describes the monochrome ink color. Do not interchange these meanings.

## Typography and rendering

Inter is the primary typeface. Use system sans-serif fallbacks in ordinary documents.
Wordmarks use Inter at weight 650; the tagline uses weights 400 and 500. SVG lettering
is stored as vector outlines, so it requires no installed font, external stylesheet,
network request, or SVG text renderer. Accessible titles and descriptions identify the
outlined text; provide meaningful alt text when embedding the files.

Inter outlines were produced from the Google Fonts Inter variable font (`opsz` 32),
with font copyright and license preserved in [inter-OFL.txt](inter-OFL.txt). The font
binary is not bundled. Its source is
[Google Fonts Inter](https://github.com/google/fonts/tree/main/ofl/inter).

## Usage rules

- Preserve both nested C forms and their open right edges; do not add an inset square.
- Maintain proportions and leave clear space around the mark of at least one ribbon width.
- Use the supplied variants; do not stretch, rotate, add gradients, shadows, or textures to them.
- Do not use yellow as small text on a white background.
- Use `logo-readme.svg` for the README: its background is explicit, so browser color
  preference and GitHub's selected theme cannot choose a low-contrast combination.
- Keep header images responsive and include the project name and tagline as ordinary
  README text as well. Do not rely solely on the image for essential information.
- Check light and dark surrounding surfaces and compact sizes before publishing.
