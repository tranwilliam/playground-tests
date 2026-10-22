from conftest import step
from tests.qaflix.journeys import pick_profile, start_membership

# Playback: Home Play, then the player Play button.


def test_play_opens_the_featured_title_and_the_player_can_start(
    signup, login, plans, payment, profiles, browse, player, qaflix_account
):
    def start():
        start_membership(signup, login, plans, payment, qaflix_account)
        pick_profile(profiles, qaflix_account["name"])

    step("Start a membership and pick the default profile", start)
    step("Click Play on the billboard", browse.play_featured)

    def play_title():
        player.expect_title("QA: Guardians of the Algorithm")
        player.play()
        player.expect_pause()

    step("Check the player page is the featured title, then press Play", play_title)
