from collections.abc import Mapping

from tests.qaflix.pages.auth.login import LoginPage
from tests.qaflix.pages.auth.signup import SignupPage
from tests.qaflix.pages.browse.profiles import ProfilesPage
from tests.qaflix.pages.membership.payment import PaymentPage
from tests.qaflix.pages.membership.plans import PlansPage


def start_membership(
    signup: SignupPage,
    login: LoginPage,
    plans: PlansPage,
    payment: PaymentPage,
    account: Mapping[str, str],
) -> None:
    signup.create(account)
    login.submit(account["email"], account["password"])
    plans.choose_screen()
    payment.pay_with_practice_card(account["name"])


def pick_profile(profiles: ProfilesPage, name: str) -> None:
    profiles.pick(name)
