import time
from collections.abc import Callable, Iterator
from typing import TypedDict

import pytest
from playwright.sync_api import Page

# Shared by tests/playground, tests/labs, and tests/qaflix. All of those hit https://www.theqaiguy.com
practice_user = {
    "username": "tester",
    "password": "practice-only",
    "locked_username": "locked",
    "locked_password": "locked",
}

# Shared practice data. These are fake. Nothing is charged. Nothing is stored on a server.
practice_card = {
    "name": "Practice Tester",
    "accepted": "4242 4242 4242 4242",
    "declined": "4000 0000 0000 0002",
    "expiry": "12/30",
    "cvc": "123",
}


class QaflixAccount(TypedDict):
    name: str
    email: str
    password: str


@pytest.fixture
def qaflix_account() -> QaflixAccount:
    return {
        "name": "Ada Tester",
        "email": f"tester.{int(time.time() * 1000)}@example.com",
        "password": "secret1",
    }


@pytest.fixture
def page(page: Page) -> Iterator[Page]:
    page.emulate_media(reduced_motion="reduce")
    yield page


def step(title: str, run: Callable[[], None]) -> None:
    print(f"→ {title}")
    run()
