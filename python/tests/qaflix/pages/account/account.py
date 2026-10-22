from playwright.sync_api import Page, expect


class AccountPage:
    def __init__(self, page: Page) -> None:
        self.page = page

    def open(self) -> None:
        self.page.get_by_role("link", name="Account").click()

    def expect_plan(self, text: str) -> None:
        expect(self.page.locator("#membership-plan")).to_have_text(text)

    def expect_status(self, text: str) -> None:
        expect(self.page.locator("#membership-status")).to_have_text(text)

    def sign_out(self) -> None:
        self.page.get_by_role("region", name="Membership").get_by_role(
            "button", name="Sign out"
        ).click()

    def cancel_membership(self) -> None:
        self.page.get_by_role("button", name="Cancel membership").click()
        self.page.get_by_role("dialog").get_by_role("button", name="Cancel membership").click()
