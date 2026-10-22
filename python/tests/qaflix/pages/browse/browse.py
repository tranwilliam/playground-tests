from playwright.sync_api import Page


class BrowsePage:
    def __init__(self, page: Page) -> None:
        self.page = page

    def play_featured(self) -> None:
        self.page.get_by_role("link", name="Play").click()
