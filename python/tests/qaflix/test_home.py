from playwright.sync_api import expect

from conftest import step

# QAflix marketing home: https://www.theqaiguy.com/qaflix/
# Get Started should send a valid email to sign-up.


def test_the_home_page_offers_get_started(page):
    def open_home():
        page.goto("/qaflix/")

    step("Open QAflix", open_home)

    def check_hero():
        expect(page.get_by_role("heading", name="Unlimited films, series, and testing.")).to_be_visible()

    step("Check the hero heading is on the page", check_hero)


def test_get_started_with_a_bad_email_asks_for_a_real_looking_address(page):
    def type_bad_email():
        page.goto("/qaflix/")
        page.get_by_placeholder("Email address").fill("not-an-email")
        page.get_by_role("button", name="Get Started").click()

    step("Open QAflix and type not-an-email", type_bad_email)

    def check_error():
        expect(page.locator(".form-error")).to_have_text("Enter an email like ada@example.com.")

    step("Check the page asks for an email like ada@example.com", check_error)


def test_get_started_with_a_valid_email_opens_sign_up(page):
    def type_valid_email():
        page.goto("/qaflix/")
        page.get_by_placeholder("Email address").fill("ada@example.com")
        page.get_by_role("button", name="Get Started").click()

    step("Open QAflix, type ada@example.com, and click Get Started", type_valid_email)

    def check_signup():
        expect(page.get_by_role("heading", name="Create your account")).to_be_visible()
        expect(page.get_by_label("Email")).to_have_value("ada@example.com")

    step("Check we are on Create your account and the email field is filled", check_signup)
