import re

from playwright.sync_api import Page, expect


class ProfilesPage:
    def __init__(self, page: Page) -> None:
        self.page = page

    def expect_whos_watching(self) -> None:
        expect(self.page.get_by_role("heading", name=re.compile(r"Who.s watching"))).to_be_visible()

    def pick(self, name: str) -> None:
        self.page.get_by_role("button", name=name).click()
        expect(self.page.get_by_role("heading", name="QA: Guardians of the Algorithm")).to_be_visible()

    def add_profile(self, name: str) -> None:
        self.page.get_by_role("link", name="Add Profile").click()
        self.page.get_by_label("Name").fill(name)
        self.page.get_by_role("button", name="Continue").click()

    def expect_profile_button(self, name: str) -> None:
        expect(self.page.get_by_role("button", name=name)).to_be_visible()
