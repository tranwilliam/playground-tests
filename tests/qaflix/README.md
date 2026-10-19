# QAflix

These tests are only QAflix on **https://www.theqaiguy.com/qaflix/**

Each spec file is one area. Steps that several files need (sign up, sign in, pay) live in `helpers.ts` so we do not copy-paste them.

| File | What it covers |
|---|---|
| `home.spec.ts` | Marketing home and Get Started |
| `signup.spec.ts` | Create account, empty name, short password |
| `login.spec.ts` | Sign in after sign-up, wrong password |
| `forgot.spec.ts` | Set a new password and sign in with it |
| `membership.spec.ts` | Screen plan and the card iframe |
| `profiles.spec.ts` | Pick a profile, add a second one |
| `watch.spec.ts` | Play the featured title |
| `account.spec.ts` | Plan on Account, sign out, cancel |
| `helpers.ts` | Shared steps used by more than one of those files |

The playground labs are in `tests/labs/`. The hub is in `tests/playground/`.
