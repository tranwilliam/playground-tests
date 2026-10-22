from playwright.sync_api import expect

from conftest import step

# Create account: https://www.theqaiguy.com/qaflix/signup/


def test_an_empty_name_is_refused(page):
    def submit_empty_name():
        page.goto("/qaflix/signup/")
        page.get_by_label("Email").fill("ada@example.com")
        page.get_by_label("Password").fill("secret1")
        page.get_by_role("button", name="Create account").click()

    step("Open sign-up, leave name blank, and click Create account", submit_empty_name)

    def check_error():
        expect(page.locator(".form-error")).to_have_text("Enter your name.")

    step("Check the form says Enter your name.", check_error)


def test_a_short_password_is_refused(page):
    def submit_short_password():
        page.goto("/qaflix/signup/")
        page.get_by_label("Name").fill("Ada Tester")
        page.get_by_label("Email").fill("ada@example.com")
        page.get_by_label("Password").fill("abc")
        page.get_by_role("button", name="Create account").click()

    step("Open sign-up and use a 3-character password", submit_short_password)

    def check_error():
        expect(page.locator(".form-error")).to_have_text("Use at least 6 characters.")

    step("Check the form asks for at least 6 characters", check_error)


def test_a_new_account_can_be_created(page, qaflix_account):
    def create_account():
        page.goto("/qaflix/signup/")
        page.get_by_label("Name").fill(qaflix_account["name"])
        page.get_by_label("Email").fill(qaflix_account["email"])
        page.get_by_label("Password").fill(qaflix_account["password"])
        page.get_by_role("button", name="Create account").click()

    step(f"Create {qaflix_account['email']}", create_account)

    def check_created():
        expect(page.get_by_role("heading", name="Sign in")).to_be_visible()
        expect(page.get_by_role("status")).to_have_text(
            "Account created. Sign in with the password you just chose."
        )

    step("Check we land on sign-in with Account created", check_created)
