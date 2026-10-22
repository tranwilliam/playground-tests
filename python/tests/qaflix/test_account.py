from playwright.sync_api import expect

from conftest import step
from helpers import pick_profile, start_membership

# Account: https://www.theqaiguy.com/qaflix/account/
# Sign out and cancel need a paid profile first.


def test_account_shows_the_screen_plan_and_sign_out_returns_home(page, qaflix_account):
    def start():
        start_membership(page, qaflix_account)
        pick_profile(page, qaflix_account["name"])

    step("Start a membership and pick the default profile", start)

    def open_account():
        page.get_by_role("link", name="Account").click()

    step("Open Account", open_account)

    def check_plan():
        expect(page.locator("#membership-plan")).to_have_text("Screen")
        expect(page.locator("#membership-status")).to_have_text("Active")

    step("Check the membership is Screen and Active", check_plan)

    def sign_out():
        page.get_by_role("region", name="Membership").get_by_role("button", name="Sign out").click()

    step("Click Sign out", sign_out)

    def check_home():
        expect(page.get_by_role("heading", name="Unlimited films, series, and testing.")).to_be_visible()

    step("Check we are back on the marketing home", check_home)


def test_cancel_membership_marks_the_plan_canceled(page, qaflix_account):
    def start():
        start_membership(page, qaflix_account)
        pick_profile(page, qaflix_account["name"])
        page.get_by_role("link", name="Account").click()

    step("Start a membership, pick a profile, and open Account", start)

    def cancel():
        page.get_by_role("button", name="Cancel membership").click()
        page.get_by_role("dialog").get_by_role("button", name="Cancel membership").click()

    step("Open Cancel membership and confirm", cancel)

    def check_canceled():
        expect(page.locator("#membership-status")).to_have_text("Canceled")

    step("Check status is Canceled", check_canceled)
