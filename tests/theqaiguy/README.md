# theQAIguy

These tests are only for the live site **https://www.theqaiguy.com**.

They cover the practice labs (`/playground/…`) and QAflix (`/qaflix/…`). They do not start a local server. They do not hit any other website.

`npm test` from the repo root runs this folder in Chromium.

When you add another site, put it in a sibling folder (for example `tests/another-site/`) with its own specs and its own URL in `playwright.config.ts`. Do not mix two sites in this folder.
