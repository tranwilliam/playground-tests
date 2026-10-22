from conftest import step
from tests.qaflix.journeys import pick_profile, start_membership

# Who's watching: https://www.theqaiguy.com/qaflix/profiles/


def test_picking_the_default_profile_opens_home(
    signup, login, plans, payment, profiles, qaflix_account
):
    step(
        "Start a membership (account, Screen plan, practice card)",
        lambda: start_membership(signup, login, plans, payment, qaflix_account),
    )
    step(
        f"Click the {qaflix_account['name']} profile",
        lambda: pick_profile(profiles, qaflix_account["name"]),
    )


def test_a_second_profile_can_be_added(
    signup, login, plans, payment, profiles, qaflix_account
):
    step(
        "Start a membership",
        lambda: start_membership(signup, login, plans, payment, qaflix_account),
    )

    def add_kids():
        profiles.add_profile("Kids")

    step("Open Add Profile, name it Kids, and continue", add_kids)

    def check_tiles():
        profiles.expect_whos_watching()
        profiles.expect_profile_button(qaflix_account["name"])
        profiles.expect_profile_button("Kids")

    step("Check both profile tiles are on Who's watching", check_tiles)
