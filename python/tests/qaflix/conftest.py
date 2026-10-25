import pytest
from playwright.sync_api import Page

from tests.qaflix.pages.account.account import AccountPage
from tests.qaflix.pages.auth.forgot import ForgotPage
from tests.qaflix.pages.auth.home import HomePage
from tests.qaflix.pages.auth.login import LoginPage
from tests.qaflix.pages.auth.mfa import MfaPage
from tests.qaflix.pages.auth.signup import SignupPage
from tests.qaflix.pages.browse.browse import BrowsePage
from tests.qaflix.pages.browse.player import PlayerPage
from tests.qaflix.pages.browse.profiles import ProfilesPage
from tests.qaflix.pages.membership.payment import PaymentPage
from tests.qaflix.pages.membership.plans import PlansPage


@pytest.fixture
def home(page: Page) -> HomePage:
    return HomePage(page)


@pytest.fixture
def signup(page: Page) -> SignupPage:
    return SignupPage(page)


@pytest.fixture
def login(page: Page) -> LoginPage:
    return LoginPage(page)


@pytest.fixture
def mfa(page: Page) -> MfaPage:
    return MfaPage(page)


@pytest.fixture
def forgot(page: Page) -> ForgotPage:
    return ForgotPage(page)


@pytest.fixture
def plans(page: Page) -> PlansPage:
    return PlansPage(page)


@pytest.fixture
def payment(page: Page) -> PaymentPage:
    return PaymentPage(page)


@pytest.fixture
def profiles(page: Page) -> ProfilesPage:
    return ProfilesPage(page)


@pytest.fixture
def browse(page: Page) -> BrowsePage:
    return BrowsePage(page)


@pytest.fixture
def player(page: Page) -> PlayerPage:
    return PlayerPage(page)


@pytest.fixture
def account(page: Page) -> AccountPage:
    return AccountPage(page)
