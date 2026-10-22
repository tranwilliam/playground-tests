import re

from playwright.sync_api import expect

from conftest import step

# Playground hub on theQAIguy: https://www.theqaiguy.com/playground/
# This folder is only the home page. The seven labs live in tests/labs/. QAflix lives in tests/qaflix/.


def test_the_hub_lists_qaflix_and_the_practice_labs(page):
    def open_hub():
        page.goto("/playground/")

    step("Open https://www.theqaiguy.com/playground/", open_hub)

    def check_heading_and_qaflix():
        expect(page.get_by_role("heading", name="Playground")).to_be_visible()
        expect(page.get_by_role("link", name=re.compile("Open QAflix", re.I))).to_be_visible()

    step("Check the Playground heading and the Open QAflix link are on the page", check_heading_and_qaflix)

    def check_labs():
        expect(page.get_by_role("heading", name="Sign in")).to_be_visible()
        expect(page.get_by_role("heading", name="Card payment")).to_be_visible()
        expect(page.get_by_role("heading", name="Dialogs")).to_be_visible()
        expect(page.get_by_role("heading", name="Checkout")).to_be_visible()
        expect(page.get_by_role("heading", name="Locators")).to_be_visible()
        expect(page.get_by_role("heading", name="Injection")).to_be_visible()
        expect(page.get_by_role("heading", name="Access")).to_be_visible()

    step(
        "Check each lab card is listed: Sign in, Card payment, Dialogs, Checkout, Locators, Injection, Access",
        check_labs,
    )
