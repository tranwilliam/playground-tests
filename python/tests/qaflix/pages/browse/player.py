from playwright.sync_api import Page, expect


class PlayerPage:
    def __init__(self, page: Page) -> None:
        self.page = page

    def expect_title(self, name: str) -> None:
        expect(self.page.get_by_role("heading", name=name)).to_be_visible()

    def play(self) -> None:
        self.page.get_by_role("button", name="Play").click()

    def expect_pause(self) -> None:
        expect(self.page.get_by_role("button", name="Pause")).to_be_visible()
