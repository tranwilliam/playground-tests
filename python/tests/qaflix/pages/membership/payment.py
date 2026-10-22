import re

from playwright.sync_api import Page, expect


class PaymentPage:
    def __init__(self, page: Page) -> None:
        self.page = page

    def pay_with_practice_card(self, name: str) -> None:
        expect(self.page.get_by_role("heading", name="Set up your membership")).to_be_visible()
        card = self.page.locator('iframe[title="Card details"]').content_frame
        card.locator('form[data-ready="1"]').wait_for()
        card.get_by_label("Name on card").fill(name)
        card.get_by_label("Card number").fill("4242424242424242")
        card.get_by_label("Expiry").fill("12/30")
        card.get_by_label("Security code").fill("123")
        card.get_by_role("button", name="Start membership").click()
        expect(self.page.get_by_role("heading", name=re.compile(r"Who.s watching"))).to_be_visible(
            timeout=15000
        )
