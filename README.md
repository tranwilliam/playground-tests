# playground-tests

This repo holds Playwright tests for live https://www.theqaiguy.com. Each folder under a language pack is one product on that site. Specs in that folder only open that product's pages.

Pick a language, then follow that folder's README.

```bash
git clone https://github.com/tranwilliam/playground-tests.git
cd playground-tests/typescript   # npm install && npm test
# or
cd playground-tests/python       # venv, pip, pytest
```

| Folder | Language | How to run |
|---|---|---|
| `typescript/` | Playwright Test | `cd typescript`, then `npm install` and `npm test` |
| `python/` | pytest-playwright | `cd python`, then the venv / pip / `pytest` steps in that README |

Old clones that ran `npm install` at the repo root now `cd typescript` first.

theQAIguy playground is fake on purpose. Nothing is stored on a server. Nothing is charged. You are learning how to test, not poking a real product. You do not need the website source code.

## Playwright MCP

Playwright MCP is configured at the repo root. Open this clone in Grok, Cursor, or Claude and start from https://www.theqaiguy.com/playground/sign-in/. The MCP configs (`playwright.mcp.json`, `.grok/config.toml`, `.cursor/mcp.json`, `.mcp.json`) live here, not inside `typescript/` or `python/`. MCP drives a browser. It does not run the coded specs unless you also ask it to run `npm test` or `pytest`.

Paste something like this:

```text
Open https://www.theqaiguy.com/playground/sign-in/
Sign in with username tester and password practice-only.
Tell me what the page said.
```
