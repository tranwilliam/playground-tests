from conftest import step
from tests.qaflix.journeys import pick_profile, start_membership

# Account: https://www.theqaiguy.com/qaflix/account/


def test_account_shows_the_screen_plan_and_sign_out_returns_home(
    signup, login, plans, payment, profiles, account, home, qaflix_account
):
    def start():
        start_membership(signup, login, plans, payment, qaflix_account)
        pick_profile(profiles, qaflix_account["name"])

    step("Start a membership and pick the default profile", start)
    step("Open Account", account.open)

    def check_plan():
        account.expect_plan("Screen")
        account.expect_status("Active")

    step("Check the membership is Screen and Active", check_plan)
    step("Click Sign out", account.sign_out)
    step("Check we are back on the marketing home", home.expect_hero)


def test_cancel_membership_marks_the_plan_canceled(
    signup, login, plans, payment, profiles, account, qaflix_account
):
    def start():
        start_membership(signup, login, plans, payment, qaflix_account)
        pick_profile(profiles, qaflix_account["name"])
        account.open()

    step("Start a membership, pick a profile, and open Account", start)
    step("Open Cancel membership and confirm", account.cancel_membership)
    step("Check status is Canceled", lambda: account.expect_status("Canceled"))
