from playwright.sync_api import expect

from conftest import practice_user, step

# Lab on theQAIguy: https://www.theqaiguy.com/playground/sign-in/
# Sign-in lab: a fake login form. tester / practice-only should work.
# locked / locked should stay locked. An empty username should name that field.


def test_signs_in_the_practice_account_and_names_an_empty_username(page):
    def open_lab():
        page.goto("/playground/sign-in/")

    step("Open the sign-in lab", open_lab)

    def sign_in_practice():
        page.get_by_label("Username").fill(practice_user["username"])
        page.get_by_label("Password").fill(practice_user["password"])
        page.get_by_role("button", name="Sign in").click()

    step(
        f'Type username "{practice_user["username"]}" and password "{practice_user["password"]}", then click Sign in',
        sign_in_practice,
    )

    def check_signed_in():
        expect(page.locator("#sign-in-result")).to_have_text(
            "Signed in as tester. This session stays in the browser."
        )

    step(
        "Check the page says we signed in as tester and the session stays in the browser",
        check_signed_in,
    )

    def submit_empty():
        page.get_by_label("Username").fill("")
        page.get_by_label("Password").fill("")
        page.get_by_role("button", name="Sign in").click()

    step("Clear both fields and click Sign in again", submit_empty)

    def check_username_error():
        expect(page.locator("#username-error")).to_have_text("Enter a username.")

    step('Check the username field shows "Enter a username."', check_username_error)


def test_keeps_the_locked_practice_account_locked(page):
    def open_lab():
        page.goto("/playground/sign-in/")

    step("Open the sign-in lab", open_lab)

    def sign_in_locked():
        page.get_by_label("Username").fill(practice_user["locked_username"])
        page.get_by_label("Password").fill(practice_user["locked_password"])
        page.get_by_role("button", name="Sign in").click()

    step(
        f'Type username "{practice_user["locked_username"]}" and password "{practice_user["locked_password"]}", then click Sign in',
        sign_in_locked,
    )

    def check_locked():
        expect(page.locator("#sign-in-result")).to_have_text("This practice account is locked.")

    step("Check the page still says this practice account is locked", check_locked)
