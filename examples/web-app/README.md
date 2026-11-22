# Focus Counter

Track completed focus sessions with a small browser counter that stays in the current tab.

## Overview

Focus Counter is an intentionally small web application used to demonstrate a complete,
relevant README. Its entire implementation is [index.html](index.html): HTML controls,
a status region, and JavaScript state. There is no server, account, database, or build pipeline.

### Scope and limits

The count is in memory. Refreshing or closing the page discards it. The application does
not record session durations, persist history, or synchronize between tabs or devices.

## Features

- Add one session with **Complete a session**.
- Clear the count with **Reset**.
- Display updates inside an HTML status region.
- Open the local HTML file directly; no package installation is needed.

## Requirements

Use a browser with JavaScript enabled. The source uses standard buttons, DOM selection,
and click handlers. A browser compatibility matrix and assistive-technology interaction
have not been tested; the presence of a status region is not an accessibility certification.

## Installation

Open [index.html](index.html) from this example directory in your browser. No npm command,
runtime server, environment variable, or generated asset is required.

## Usage

1. Open the page. The session count starts at **0**.
2. Finish a focus session and choose **Complete a session**. The count becomes **1**.
3. Choose it again for **2**, and choose **Reset** to return to **0**.
4. Keep the tab open if you want to retain the current count.

| Action | Result |
|---|---|
| Complete a session | Increment the displayed count by one |
| Reset | Set state and displayed count to zero |
| Reload the page | Start a new in-memory count at zero |

These results follow the supplied source; they are not captured screenshots or a claim
that a browser test ran.

## Testing

Manual browser check: open the page, increment twice, reset, then reload. Compare the
results with the table above. Browser interaction has not been exercised in the recorded
repository tests. Inspecting the script verifies the intended state transitions, but does
not prove rendering, keyboard behavior, or cross-browser compatibility.

## Troubleshooting

| Symptom | What to inspect |
|---|---|
| Buttons do not change the count | Check that JavaScript is enabled and inspect the browser console for script errors |
| The count disappeared | Reload/close starts a new page instance; persistence is not implemented |
| Separate tabs show different values | Each page instance has its own state; there is no shared backend |

The [selection inventory](selection.json) records how this README uses the standard.
Screenshots, hosted demo, deployment, database configuration, and package build instructions
are omitted because the example does not provide them. Its small scope is deliberate;
the finished README explains that scope rather than filling irrelevant headings.
