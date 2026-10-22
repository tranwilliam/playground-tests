from playwright.sync_api import expect

from conftest import step
from helpers import sign_up

# Sign in: https://www.theqaiguy.com/qaflix/login/
# Needs an account first, so we reuse sign_up() from helpers.py.


def test_the_right_password_opens_the_plans_page(page, qaflix_account):
    def create_account():
        sign_up(page, qaflix_account)

    step("Create an account", create_account)

    def sign_in_ok():
        page.get_by_label("Email").fill(qaflix_account["email"])
        page.get_by_label("Password").fill(qaflix_account["password"])
        page.get_by_role("button", name="Sign in").click()

    step("Sign in with that email and password", sign_in_ok)

    def check_plans():
        expect(page.get_by_role("heading", name="Choose how you watch")).to_be_visible()

    step("Check we are on Choose how you watch", check_plans)


def test_the_wrong_password_is_refused(page, qaflix_account):
    def create_account():
        sign_up(page, qaflix_account)

    step("Create an account", create_account)

    def sign_in_wrong():
        page.get_by_label("Email").fill(qaflix_account["email"])
        page.get_by_label("Password").fill("nope-nope")
        page.get_by_role("button", name="Sign in").click()

    step("Sign in with the wrong password", sign_in_wrong)

    def check_error():
        expect(page.locator(".form-error")).to_have_text("No account matches that email and password.")

    step("Check the form says no account matches", check_error)
