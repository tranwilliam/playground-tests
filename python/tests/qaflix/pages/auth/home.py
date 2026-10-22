from playwright.sync_api import Page, expect


class HomePage:
    def __init__(self, page: Page) -> None:
        self.page = page

    def open(self) -> None:
        self.page.goto("/qaflix/")

    def get_started(self, email: str) -> None:
        self.page.get_by_placeholder("Email address").fill(email)
        self.page.get_by_role("button", name="Get Started").click()

    def expect_hero(self) -> None:
        expect(
            self.page.get_by_role("heading", name="Unlimited films, series, and testing.")
        ).to_be_visible()

    def expect_error(self, text: str) -> None:
        expect(self.page.locator(".form-error")).to_have_text(text)
