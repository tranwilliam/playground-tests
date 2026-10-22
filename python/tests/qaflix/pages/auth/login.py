from playwright.sync_api import Page, expect


class LoginPage:
    def __init__(self, page: Page) -> None:
        self.page = page

    def open(self) -> None:
        if "/login" not in self.page.url:
            self.page.goto("/qaflix/login/")

    def submit(self, email: str, password: str) -> None:
        self.open()
        self.page.get_by_label("Email").fill(email)
        self.page.get_by_label("Password").fill(password)
        self.page.get_by_role("button", name="Sign in").click()

    def expect_error(self, text: str) -> None:
        expect(self.page.locator(".form-error")).to_have_text(text)

    def expect_heading_sign_in(self) -> None:
        expect(self.page.get_by_role("heading", name="Sign in")).to_be_visible()

    def expect_created_status(self) -> None:
        expect(self.page.get_by_role("status")).to_have_text(
            "Account created. Sign in with the password you just chose."
        )
