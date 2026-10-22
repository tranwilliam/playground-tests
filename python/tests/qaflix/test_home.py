from conftest import step

# QAflix marketing home: https://www.theqaiguy.com/qaflix/
# Get Started should send a valid email to sign-up.


def test_the_home_page_offers_get_started(home):
    step("Open QAflix", home.open)
    step("Check the hero heading is on the page", home.expect_hero)


def test_get_started_with_a_bad_email_asks_for_a_real_looking_address(home):
    def type_bad_email():
        home.open()
        home.get_started("not-an-email")

    step("Open QAflix and type not-an-email", type_bad_email)
    step(
        "Check the page asks for an email like ada@example.com",
        lambda: home.expect_error("Enter an email like ada@example.com."),
    )


def test_get_started_with_a_valid_email_opens_sign_up(home, signup):
    def type_valid_email():
        home.open()
        home.get_started("ada@example.com")

    step("Open QAflix, type ada@example.com, and click Get Started", type_valid_email)

    def check_signup():
        signup.expect_heading_create()
        signup.expect_email_value("ada@example.com")

    step("Check we are on Create your account and the email field is filled", check_signup)
