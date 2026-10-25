from playwright.sync_api import Page, expect


class MfaPage:
    def __init__(self, page: Page) -> None:
        self.page = page

    def expect_enroll(self) -> None:
        expect(self.page.get_by_role("heading", name="Set up authenticator")).to_be_visible()
        expect(self.page.get_by_label("Secret")).to_be_visible()

    def expect_challenge(self) -> None:
        expect(self.page.get_by_role("heading", name="Enter authenticator code")).to_be_visible()
        expect(self.page.get_by_label("Secret")).to_have_count(0)

    def secret(self) -> str:
        return self.page.get_by_label("Secret").input_value()

    def confirm(self, code: str) -> None:
        self.page.get_by_label("Authentication code").fill(code)
        self.page.get_by_role("button", name="Confirm").click()

    def verify(self, code: str) -> None:
        self.page.get_by_label("Authentication code").fill(code)
        self.page.get_by_role("button", name="Verify").click()

    def cancel_setup(self) -> None:
        self.page.get_by_role("button", name="Cancel MFA setup").click()
