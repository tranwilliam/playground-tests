# playground-tests

This folder is a starter Playwright project for the practice labs and QAflix on [theQAIguy](https://www.theqaiguy.com/playground/).

The site is fake on purpose. Nothing is stored on a server. Nothing is charged. You are learning how to test, not poking a real product.

You do not need the website source code. These tests hit the live pages.

## What you can do

- Clone this repo and run the Playwright tests on your machine.
- Ask a Playwright MCP agent (Grok, Cursor, Claude, and similar) to open the same pages and click through them.
- Reuse the fixtures, page objects, and locators when you add your own specs.
- Use the practice account `tester` / `practice-only` and the practice card `4242 4242 4242 4242`.
- Make a fake QAflix account. It stays in that browser.

## What you cannot do

- Charge a real card, or send card data to Stripe.
- Create an account that lives on a server. Refresh or another browser is a blank QAflix.
- Use this pack as a login to theQAIguy, Beehiiv, or anything else. It only talks to `/playground` and `/qaflix`.

## Two ways to use it

**A. Run the tests yourself.** Playwright opens Chrome, follows the `.spec.ts` files, and reports pass or fail. This is the coded suite.

**B. Use Playwright MCP.** An agent opens a browser and drives the live site. It does not run the `.spec.ts` files unless you also ask it to run `npm test`. MCP is "go click this page for me."

Do A if you want a report. Do B if you want an agent to walk the labs with you.

---

## A. Step by step: run the tests

1. Install [Node.js](https://nodejs.org/) if you do not have it (LTS is fine).
2. Open a terminal and clone this repo:

```bash
git clone https://github.com/tranwilliam/playground-tests.git
cd playground-tests
```

3. Install the packages and the Chromium browser Playwright uses:

```bash
npm install
npx playwright install chromium
```

4. Run the suite:

```bash
npm test
```

If a test fails, open that spec and the page it hits. Decide whether the test, the locator, or the page is wrong.

If you are pointing at a local copy of the site, set `PLAYGROUND_URL` first, for example `PLAYGROUND_URL=http://127.0.0.1:4330 npm test`.

---

## B. Step by step: use Playwright MCP

You need a chat app that can load MCP servers (Grok, Cursor, Claude Code, and similar) and Node.js, same as above.

### 1. Clone this folder

Same clone as above. Stay in `playground-tests`. This folder includes `playwright.mcp.json`, which starts Chromium with WebMCP on so the labs can register tools like `sign_in`.

### 2. Add the Playwright MCP server

**Grok (this folder):** a new Grok session opened in `playground-tests` should pick up `.grok/config.toml` and start Playwright MCP.

If you have to add it by hand:

```bash
grok mcp add --scope project playwright -- npx -y @playwright/mcp@latest --config playwright.mcp.json
```

Then start a **new** Grok session in this folder. An old session will not see the server.

**Cursor:** `.cursor/mcp.json` is already in the repo. Restart Cursor or reload MCP if the tools do not show up.

**Anyone else:** from this folder run:

```bash
npx @playwright/mcp@latest --config playwright.mcp.json
```

and point your MCP client at that process.

### 3. Ask the agent to open a lab

Paste something like this:

```text
Open https://www.theqaiguy.com/playground/sign-in/
Sign in with username tester and password practice-only.
Tell me what the page said.
```

The agent should open a browser, fill the form or call the `sign_in` tool, and read back `Signed in as tester. This session stays in the browser.`

### 4. Try the other labs the same way

| Page | What to ask |
|---|---|
| `/playground/` | List the labs. |
| `/playground/sign-in/` | Sign in as tester. Then try locked / locked. |
| `/playground/payment/` | Pay with 4242 4242 4242 4242. Then try 4000 0000 0000 0002. |
| `/playground/dialogs/` | Open the notice, then close it. |
| `/playground/checkout/` | Choose Team, fill Ada / ada@example.com, place the order. |
| `/playground/locators/` | Click Save report. Then click Add 1 and tell me the number. |
| `/playground/access/` | Sign in as member / practice-only. |
| `/qaflix/` | Create a fake account, pick Screen, pay with 4242, open Who's watching. |

Practice password is always `practice-only` on the labs. QAflix uses whatever fake password you typed at sign up.

### 5. What "tools" means on a lab

If WebMCP is on, each lab registers tools on that page only. Sign-in has `sign_in`. Payment has `submit_payment`. The hub has `list_labs`. The agent can call those instead of hunting for buttons. Leave the lab and those tools go away.

If the agent says WebMCP is off, the labs still work. It will click the real fields instead.

### 6. MCP does not replace `npm test`

Asking an agent to "run the tests" means it should use the terminal (`npm test`). Playwright MCP is the browser. Both can live in the same chat if you want.

---

## Folder layout

```
tests/
  fixtures.ts          Practice user, card, and a fresh QAflix email
  support/             Shared locators (name first, test id as fallback)
  pages/               One page object per lab, plus QAflix
  *.spec.ts            Hub, seven labs, QAflix membership smoke
playwright.config.ts
playwright.mcp.json    Chromium with WebMCP for MCP agents
```

Specs use `getByRole` and `getByLabel` where they can. The locators lab ships a redesign that changes the button id; `findControl` still clicks **Save report** by its name.
