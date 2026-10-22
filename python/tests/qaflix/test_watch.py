from playwright.sync_api import expect

from conftest import step
from helpers import pick_profile, start_membership

# Playback: Home Play, then the player Play button.
# Needs a membership and a chosen profile first.


def test_play_opens_the_featured_title_and_the_player_can_start(page, qaflix_account):
    def start():
        start_membership(page, qaflix_account)
        pick_profile(page, qaflix_account["name"])

    step("Start a membership and pick the default profile", start)

    def click_billboard():
        page.get_by_role("link", name="Play").click()

    step("Click Play on the billboard", click_billboard)

    def play_title():
        expect(page.get_by_role("heading", name="QA: Guardians of the Algorithm")).to_be_visible()
        page.get_by_role("button", name="Play").click()
        expect(page.get_by_role("button", name="Pause")).to_be_visible()

    step("Check the player page is the featured title, then press Play", play_title)
