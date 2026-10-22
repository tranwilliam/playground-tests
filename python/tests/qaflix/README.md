# QAflix

These tests are only QAflix on **https://www.theqaiguy.com/qaflix/**

Each spec file is one area. Steps that several files need (sign up, sign in, pay) live in `helpers.py` so we do not copy-paste them.

| File | What it covers |
|---|---|
| `test_home.py` | Marketing home and Get Started |
| `test_signup.py` | Create account, empty name, short password |
| `test_login.py` | Sign in after sign-up, wrong password |
| `test_forgot.py` | Set a new password and sign in with it |
| `test_membership.py` | Screen plan and the card iframe |
| `test_profiles.py` | Pick a profile, add a second one |
| `test_watch.py` | Play the featured title |
| `test_account.py` | Plan on Account, sign out, cancel |
| `helpers.py` | Shared steps used by more than one of those files |

The playground labs are in `tests/labs/`. The hub is in `tests/playground/`.
