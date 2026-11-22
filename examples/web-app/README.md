# Focus Counter

A small browser counter for tracking completed focus sessions in one tab.

## Overview

This illustrative Craftmentation fixture implements an in-memory counter in
[index.html](index.html). Reloading the page discards the count; it stores no session history.

## Features

- Increment the displayed count with Complete a session.
- Return the count to zero with Reset.
- Announce count changes through a status region.

## Requirements

A browser with JavaScript enabled is needed to interact with the counter.
No browser compatibility matrix has been tested.

## Installation

Open `index.html` in your browser. There is no build step or dependency installation.

## Usage

Choose Complete a session after finishing a focus session. Choose Reset to start
again. All state belongs to the current page instance.

No hosted demo, screenshots, deployment workflow, or persistent storage is provided.
The [selection inventory](selection.json) records why these sections were chosen.
