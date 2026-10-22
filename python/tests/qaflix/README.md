# QAflix

These tests are a small page-object suite for live **https://www.theqaiguy.com/qaflix/**

Each spec file is one area. Screens live under `pages/` (auth, membership, browse, account). Journeys that several files need (start a membership, pick a profile) live in `journeys.py`. Pytest injects the page objects into tests.

New screens belong under the matching folder: MFA under `pages/auth/`, saved cards under `pages/membership/`, richer playback under `pages/browse/`.

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
| `pages/` | Locators and actions for each QAflix screen |
| `journeys.py` | Shared steps used by more than one of those files |

The playground labs are in `tests/labs/`. The hub is in `tests/playground/`.
