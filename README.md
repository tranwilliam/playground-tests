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

3. Install the packages and Chromium (enough for a first run):

```bash
npm install
npx playwright install chromium
```

Firefox, Safari (WebKit), and the phone project need their browsers too:

```bash
npx playwright install firefox webkit
```

The mobile project uses Chromium with an iPhone 14 viewport, so Chromium covers that one.

4. Run the suite:

```bash
npm test
```

That command is `playwright test --project=chromium`. It hits the live site (https://www.theqaiguy.com). There is no local website to start.

If a test fails, open that spec and the page it hits. Decide whether the test, the locator, or the page is wrong.

The `.spec.ts` files are written for someone who has not coded much. Each file starts with a short "what this lab is." Each step has a comment, and the same sentence prints in the terminal while the test runs (`→ Open the sign-in lab`). `expect(...)` means "check that this is true." `page.goto` means "open this URL." If you do not know a line, read the comment above it.

### What `npm test` does by default

| Setting | This repo |
|---|---|
| Site | https://www.theqaiguy.com |
| Browser | Chromium (Chrome's engine), project name `chromium` |
| Viewport | Desktop Chrome, 1280 x 720 |
| Window | Headless. No browser window. You only see the terminal. |
| Workers | Playwright picks a count from your CPU (about half the cores on a laptop). `fullyParallel` is on, so tests in the same file can run at the same time. |
| Retries | 0. A failure stays a failure. |

You can add flags after `--` so npm passes them through, for example `npm test -- --headed --workers=1`. Or use the scripts below.

### Headless or headed

Headless (default) means Playwright runs the browser with no window.

```bash
npm test
```

Headed means a real window opens and you can watch the clicks.

```bash
npm run test:headed
```

Same thing with a flag: `npm test -- --headed`.

`npm run test:slow` is headed **and** `--workers=1`, so one test at a time in a window you can follow.

| | Headless | Headed |
|---|---|---|
| What it does | Browser runs in the background. | A window opens for each worker. |
| Pros | Faster. Fine on a small laptop. What CI uses. | You see the page, the fill, the click. Easier to learn and to debug. |
| Cons | A failure is only a stack trace. Easy to miss that you hit the live site. | Slower. Windows steal focus. Several workers means several windows. |

Use headed when you are learning or chasing one failure. Use headless when you already trust the run.

### Workers

A worker is one parallel browser. `--workers=1` is a single browser, tests in order. `--workers=4` is four browsers at once.

```bash
npm test -- --workers=1
npm test -- --workers=4
```

| | One worker | Several workers |
|---|---|---|
| What it does | One test at a time. | Tests share the CPU and open more browsers against the live site. |
| Pros | Easy to watch. Fewer tabs on theQAIguy. Failures are simpler to read. | Finishes sooner on a decent machine. |
| Cons | Slow. | The live site sees more traffic. Headed mode becomes a pile of windows. QAflix accounts are per browser, so parallel QAflix tests do not share a login, which is what we want. |

Start with one worker if the report feels chaotic. Go back to the default when you want speed.

### Browser types

`npm test` is Chromium only. The other engines are separate projects. Install them first (`npx playwright install firefox webkit`).

```bash
npm run test:firefox
npm run test:webkit
```

Flags: `npx playwright test --project=firefox` and `--project=webkit`.

| Project | Engine | What it does |
|---|---|---|
| `chromium` | Chrome / Edge | Default. Fast to install. Closest to what most people use. |
| `firefox` | Firefox | A second engine. Catches "works in Chrome only" gaps. |
| `webkit` | Safari | Closest you get to Safari on macOS and iOS from Playwright. |

| | Chromium only | Extra browsers |
|---|---|---|
| Pros | One install. Fastest first run. | You see the labs in more than one engine. |
| Cons | You never learn if Firefox or Safari disagrees. | Bigger download. Slower suite. A few locators or fonts can differ. |

Stay on Chromium until `npm test` makes sense. Add Firefox or WebKit when you want to see another engine.

### Viewports

A viewport is the page size. Default is **desktop** 1280 x 720 (Playwright's Desktop Chrome device).

**Mobile** is Playwright's iPhone 14 device: 390 x 664, touch, mobile user agent. Still Chromium, not a real iPhone.

```bash
npm run test:mobile
```

Flag: `npx playwright test --project=mobile`.

| | Desktop (default) | Mobile project |
|---|---|---|
| What it does | Wide layout, mouse. | Narrow layout, touch. |
| Pros | Matches the lab layout most people see on a laptop. | Shows overflow, stacked fields, and controls that only fit on a phone. |
| Cons | Misses small-screen bugs. | Not a real iPhone. Some labs are easier on a wide screen. Headed mobile still opens a desktop Chrome window with a small inner size. |

You can mix flags, for example watch the phone layout one test at a time:

```bash
npx playwright test --project=mobile --headed --workers=1
```

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

**Claude Code:** `.mcp.json` is already in the repo. Open this folder in Claude Code and start a new session. Approve the Playwright MCP server if it asks.

**Claude Desktop:** add the same server in Settings: command `npx`, args `-y @playwright/mcp@latest --config playwright.mcp.json`, working directory this folder. Restart Claude Desktop.

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
