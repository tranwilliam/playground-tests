from playwright.sync_api import Page, expect


class ForgotPage:
    def __init__(self, page: Page) -> None:
        self.page = page

    def open(self) -> None:
        self.page.goto("/qaflix/forgot/")

    def continue_with_email(self, email: str) -> None:
        self.page.get_by_label("Email").fill(email)
        self.page.get_by_role("button", name="Continue").click()

    def set_password(self, new: str) -> None:
        self.page.get_by_label("New password").fill(new)
        self.page.get_by_label("Confirm password").fill(new)
        self.page.get_by_role("button", name="Update password").click()

    def expect_heading_set_password(self) -> None:
        expect(self.page.get_by_role("heading", name="Set password")).to_be_visible()

    def expect_updated_status(self) -> None:
        expect(self.page.get_by_role("status")).to_have_text(
            "Password updated. Sign in with the new password."
        )
