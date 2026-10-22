from collections.abc import Mapping

from playwright.sync_api import Page, expect


class SignupPage:
    def __init__(self, page: Page) -> None:
        self.page = page

    def open(self) -> None:
        self.page.goto("/qaflix/signup/")

    def create(self, account: Mapping[str, str]) -> None:
        self.open()
        self.page.get_by_label("Name").fill(account["name"])
        self.page.get_by_label("Email").fill(account["email"])
        self.page.get_by_label("Password").fill(account["password"])
        self.page.get_by_role("button", name="Create account").click()
        expect(self.page.get_by_role("status")).to_have_text(
            "Account created. Sign in with the password you just chose."
        )

    def fill_name(self, name: str) -> None:
        self.page.get_by_label("Name").fill(name)

    def fill_email(self, email: str) -> None:
        self.page.get_by_label("Email").fill(email)

    def fill_password(self, password: str) -> None:
        self.page.get_by_label("Password").fill(password)

    def submit_create(self) -> None:
        self.page.get_by_role("button", name="Create account").click()

    def expect_error(self, text: str) -> None:
        expect(self.page.locator(".form-error")).to_have_text(text)

    def expect_heading_create(self) -> None:
        expect(self.page.get_by_role("heading", name="Create your account")).to_be_visible()

    def expect_email_value(self, email: str) -> None:
        expect(self.page.get_by_label("Email")).to_have_value(email)
