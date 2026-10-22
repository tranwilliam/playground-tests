import re

from playwright.sync_api import expect

from conftest import step
from helpers import choose_screen, pay_with_practice_card, sign_in, sign_up

# Plan + fake card: /qaflix/plans/ then /qaflix/payment/
# Sign-up and sign-in are the same steps as login.spec, so they live in helpers.py.


def test_screen_plan_plus_the_practice_card_lands_on_whos_watching(page, qaflix_account):
    def create_and_sign_in():
        sign_up(page, qaflix_account)
        sign_in(page, qaflix_account)

    step("Create an account and sign in", create_and_sign_in)

    def pick_screen():
        choose_screen(page)

    step("Choose the Screen plan", pick_screen)

    def pay():
        pay_with_practice_card(page, qaflix_account["name"])

    step("Pay with 4242 in the card iframe", pay)

    def check_profiles():
        expect(page.get_by_role("heading", name=re.compile(r"Who.s watching"))).to_be_visible()

    step("Check Who's watching is on screen", check_profiles)
