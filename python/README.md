# playground-tests (Python)

This folder holds pytest-playwright tests for **live websites**. Each folder under `tests/` is one product on a site. Specs in that folder only open that product's pages.

Right now everything hits https://www.theqaiguy.com, split like this:

| Folder | Live URL | What it covers |
|---|---|---|
| `tests/playground/` | https://www.theqaiguy.com/playground/ | Playground hub (the list of labs) |
| `tests/labs/` | https://www.theqaiguy.com/playground/sign-in/ and the other labs | The seven practice labs |
| `tests/qaflix/` | https://www.theqaiguy.com/qaflix/ | QAflix membership smoke |

theQAIguy playground is fake on purpose. Nothing is stored on a server. Nothing is charged. You are learning how to test, not poking a real product. You do not need the website source code.

On theQAIguy: use `tester` / `practice-only` and card `4242 4242 4242 4242`. A fake QAflix account stays in that browser.

## Run the tests

1. Install [Python 3](https://www.python.org/) if you do not have it.
2. Clone this repo and enter this folder:

```bash
git clone https://github.com/tranwilliam/playground-tests.git
cd playground-tests/python
```

3. Create a venv, install packages, and install Chromium:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
playwright install chromium
```

4. Run the suite:

```bash
pytest
```

That command hits `tests/playground`, `tests/labs`, and `tests/qaflix` against https://www.theqaiguy.com. There is no local website to start. Default is Chromium, headless, retries 0.

If a test fails, open that spec and the page it hits. Decide whether the test, the locator, or the page is wrong.

The `test_*.py` files are written for someone who has not coded much. Each file starts with a short "what this lab is." Each step has a comment, and the same sentence prints in the terminal while the test runs (`→ Open the sign-in lab`). `expect(...)` means "check that this is true." `page.goto` means "open this URL." If you do not know a line, read the comment above it.

### What `pytest` does by default

| Setting | This folder |
|---|---|
| Site | theQAIguy, https://www.theqaiguy.com |
| Browser | Chromium |
| Window | Headless. No browser window. You only see the terminal. |
| Retries | 0. A failure stays a failure. |

Watch the clicks with `pytest --headed`. Follow one file with `pytest --headed -k sign_in`.

Playwright MCP lives in the repo root. Open `playground-tests` (the parent folder) in Grok, Cursor, or Claude. See the root README.

## Folder layout

```
tests/
  playground/          Hub only: https://www.theqaiguy.com/playground/
  labs/                Seven labs: /playground/sign-in, payment, dialogs, checkout, locators, injection, access
  qaflix/              QAflix only: https://www.theqaiguy.com/qaflix/
                       pages/ = one class per screen; journeys.py = shared membership steps
conftest.py            Practice user, card, unique QAflix email, and the step() logger
pytest.ini             Live URL for theQAIguy
```

Lab specs are beginner-style: `page.goto`, `get_by_label`, `get_by_role`, `expect`. QAflix uses page objects under `tests/qaflix/pages/`. The locators lab clicks **Save report** by its visible name, so it still works after the button id changes.
