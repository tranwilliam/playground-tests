import time

import pyotp
from conftest import step
from playwright.sync_api import expect

# Authenticator MFA against a host that has QAflix MFA (local :4332 until production ships it).


def _totp_submit(secret: str, submit, *, succeeded) -> None:
    totp = pyotp.TOTP(secret)
    submit(totp.now())
    try:
        succeeded()
    except AssertionError:
        time.sleep(1)
        submit(totp.now())
        succeeded()


def test_mfa_enable_enroll_challenge_and_disable(
    signup, login, plans, account, mfa, home, qaflix_account
):
    secret: dict[str, str] = {}

    step("Create an account", lambda: signup.create(qaflix_account))
    step(
        "Sign in with that email and password",
        lambda: login.submit(qaflix_account["email"], qaflix_account["password"]),
    )
    step("Check we are on Choose how you watch", plans.expect_visible)
    step("Open Account", account.open)
    step("Check MFA is Off", lambda: account.expect_mfa("Off"))
    step("Click Enable MFA", account.enable_mfa)

    def check_mfa_banner():
        login.expect_heading_sign_in()
        expect(login.page.get_by_role("status")).to_have_text(
            "MFA setup continues after you sign in."
        )

    step("Check login shows the MFA setup banner", check_mfa_banner)
    step(
        "Sign in again with the password",
        lambda: login.submit(qaflix_account["email"], qaflix_account["password"]),
    )
    step("Check the enroll screen with Secret", mfa.expect_enroll)

    def read_secret():
        secret["value"] = mfa.secret()
        assert secret["value"]

    step("Read the enrollment Secret", read_secret)

    def enroll():
        _totp_submit(
            secret["value"],
            mfa.confirm,
            succeeded=plans.expect_visible,
        )

    step("Confirm enrollment with a pyotp code", enroll)
    step("Open Account and check MFA is On", lambda: (account.open(), account.expect_mfa("On")))
    step("Sign out", account.sign_out)
    step("Check we are back on the marketing home", home.expect_hero)
    step(
        "Sign in with password to hit the MFA challenge",
        lambda: login.submit(qaflix_account["email"], qaflix_account["password"]),
    )
    step("Check the challenge screen (no Secret)", mfa.expect_challenge)

    def challenge():
        _totp_submit(
            secret["value"],
            mfa.verify,
            succeeded=plans.expect_visible,
        )

    step("Verify with a pyotp code", challenge)
    step("Open Account", account.open)

    def disable():
        _totp_submit(
            secret["value"],
            account.disable_mfa,
            succeeded=lambda: account.expect_mfa("Off"),
        )

    step("Disable MFA with a pyotp code", disable)
    step("Sign out", account.sign_out)
    step(
        "Sign in with password only (no MFA page)",
        lambda: login.submit(qaflix_account["email"], qaflix_account["password"]),
    )
    step("Check we land on plans without an MFA step", plans.expect_visible)
