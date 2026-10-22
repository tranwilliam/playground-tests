from playwright.sync_api import expect

from conftest import step
from helpers import sign_up

# Forgot password: https://www.theqaiguy.com/qaflix/forgot/
# Reset only works for an email that already exists in this browser.


def test_a_member_can_set_a_new_password_and_sign_in_with_it(page, qaflix_account):
    def create_account():
        sign_up(page, qaflix_account)

    step("Create an account", create_account)

    def open_forgot():
        page.goto("/qaflix/forgot/")
        page.get_by_label("Email").fill(qaflix_account["email"])
        page.get_by_role("button", name="Continue").click()

    step("Open Forgot password and continue with that email", open_forgot)

    def set_password():
        expect(page.get_by_role("heading", name="Set password")).to_be_visible()
        page.get_by_label("New password").fill("secret2")
        page.get_by_label("Confirm password").fill("secret2")
        page.get_by_role("button", name="Update password").click()

    step("Set a new password twice", set_password)

    def sign_in_new():
        expect(page.get_by_role("status")).to_have_text(
            "Password updated. Sign in with the new password."
        )
        page.get_by_label("Password").fill("secret2")
        page.get_by_role("button", name="Sign in").click()

    step("Sign in with the new password", sign_in_new)

    def check_plans():
        expect(page.get_by_role("heading", name="Choose how you watch")).to_be_visible()

    step("Check we are on Choose how you watch", check_plans)
