from conftest import step
from tests.qaflix.journeys import start_membership

# Plan + fake card: /qaflix/plans/ then /qaflix/payment/


def test_screen_plan_plus_the_practice_card_lands_on_whos_watching(
    signup, login, plans, payment, profiles, qaflix_account
):
    step(
        "Create an account, choose Screen, and pay with 4242",
        lambda: start_membership(signup, login, plans, payment, qaflix_account),
    )
    step("Check Who's watching is on screen", profiles.expect_whos_watching)
