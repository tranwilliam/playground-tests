import re

from playwright.sync_api import expect

from conftest import step
from helpers import pick_profile, start_membership

# Who's watching: https://www.theqaiguy.com/qaflix/profiles/
# start_membership() is the shared setup (account + Screen + card). This file only checks profiles.


def test_picking_the_default_profile_opens_home(page, qaflix_account):
    def start():
        start_membership(page, qaflix_account)

    step("Start a membership (account, Screen plan, practice card)", start)

    def pick():
        pick_profile(page, qaflix_account["name"])

    step(f"Click the {qaflix_account['name']} profile", pick)


def test_a_second_profile_can_be_added(page, qaflix_account):
    def start():
        start_membership(page, qaflix_account)

    step("Start a membership", start)

    def add_kids():
        page.get_by_role("link", name="Add Profile").click()
        page.get_by_label("Name").fill("Kids")
        page.get_by_role("button", name="Continue").click()

    step("Open Add Profile, name it Kids, and continue", add_kids)

    def check_tiles():
        expect(page.get_by_role("heading", name=re.compile(r"Who.s watching"))).to_be_visible()
        expect(page.get_by_role("button", name=qaflix_account["name"])).to_be_visible()
        expect(page.get_by_role("button", name="Kids")).to_be_visible()

    step("Check both profile tiles are on Who's watching", check_tiles)
