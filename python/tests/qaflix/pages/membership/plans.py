import re

from playwright.sync_api import Page, expect


class PlansPage:
    def __init__(self, page: Page) -> None:
        self.page = page

    def expect_visible(self) -> None:
        expect(self.page.get_by_role("heading", name="Choose how you watch")).to_be_visible()

    def choose_screen(self) -> None:
        self.expect_visible()
        self.page.get_by_role("radio", name=re.compile("Screen")).check()
        self.page.get_by_role("button", name="Continue").click()
