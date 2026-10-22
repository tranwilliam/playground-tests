import re

from playwright.sync_api import Page, expect

from conftest import QaflixAccount, practice_card

# Shared QAflix steps. Several specs need "make an account" or "pay" before their own check.
# These are plain functions, not page objects. Specs still use page.goto / get_by_label themselves
# when the step is unique to that test.


def sign_up(page: Page, account: QaflixAccount) -> None:
    page.goto("/qaflix/signup/")
    page.get_by_label("Name").fill(account["name"])
    page.get_by_label("Email").fill(account["email"])
    page.get_by_label("Password").fill(account["password"])
    page.get_by_role("button", name="Create account").click()
    expect(page.get_by_role("status")).to_have_text(
        "Account created. Sign in with the password you just chose."
    )


def sign_in(page: Page, account: QaflixAccount) -> None:
    if "/login" not in page.url:
        page.goto("/qaflix/login/")
    page.get_by_label("Email").fill(account["email"])
    page.get_by_label("Password").fill(account["password"])
    page.get_by_role("button", name="Sign in").click()


def choose_screen(page: Page) -> None:
    expect(page.get_by_role("heading", name="Choose how you watch")).to_be_visible()
    page.get_by_role("radio", name=re.compile("Screen")).check()
    page.get_by_role("button", name="Continue").click()


def pay_with_practice_card(page: Page, name_on_card: str) -> None:
    expect(page.get_by_role("heading", name="Set up your membership")).to_be_visible()
    card = page.locator('iframe[title="Card details"]').content_frame
    card.locator('form[data-ready="1"]').wait_for()
    card.get_by_label("Name on card").fill(name_on_card)
    card.get_by_label("Card number").fill(practice_card["accepted"].replace(" ", ""))
    card.get_by_label("Expiry").fill(practice_card["expiry"])
    card.get_by_label("Security code").fill(practice_card["cvc"])
    card.get_by_role("button", name="Start membership").click()
    expect(page.get_by_role("heading", name=re.compile(r"Who.s watching"))).to_be_visible(
        timeout=15000
    )


def start_membership(page: Page, account: QaflixAccount) -> None:
    sign_up(page, account)
    sign_in(page, account)
    choose_screen(page)
    pay_with_practice_card(page, account["name"])


def pick_profile(page: Page, name: str) -> None:
    page.get_by_role("button", name=name).click()
    expect(page.get_by_role("heading", name="QA: Guardians of the Algorithm")).to_be_visible()
