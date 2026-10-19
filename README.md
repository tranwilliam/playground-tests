# playground-tests

A small Playwright suite for the practice labs and QAflix on [theQAIguy](https://www.theqaiguy.com/playground/).

Clone this repo. You do not need the website source. The tests hit the live site.

## Run

```bash
npm install
npx playwright install chromium
npm run test:pass
```

`npm run test:pass` should stay green.

`npm test` also runs `tests/bugs`. Those specs describe the correct behavior. They fail because the labs have planted bugs. That red run is the point.

`npm run test:bugs` runs only the planted-bug specs.

## Folders

- `tests/pass` covers each practice lab plus a short QAflix membership smoke (sign up, plan, card in the iframe, Who's watching).
- `tests/bugs` asserts what the page should do. Read a failing spec, then open that lab and find the gap.

Practice data: username `tester`, password `practice-only`, card `4242 4242 4242 4242`. QAflix accounts stay in the browser. Nothing is charged.

Override the site with `PLAYGROUND_URL` if you are pointing at a local copy.
