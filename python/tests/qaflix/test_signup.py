from conftest import step

# Create account: https://www.theqaiguy.com/qaflix/signup/


def test_an_empty_name_is_refused(signup):
    def submit_empty_name():
        signup.open()
        signup.fill_email("ada@example.com")
        signup.fill_password("secret1")
        signup.submit_create()

    step("Open sign-up, leave name blank, and click Create account", submit_empty_name)
    step("Check the form says Enter your name.", lambda: signup.expect_error("Enter your name."))


def test_a_short_password_is_refused(signup):
    def submit_short_password():
        signup.open()
        signup.fill_name("Ada Tester")
        signup.fill_email("ada@example.com")
        signup.fill_password("abc")
        signup.submit_create()

    step("Open sign-up and use a 3-character password", submit_short_password)
    step(
        "Check the form asks for at least 6 characters",
        lambda: signup.expect_error("Use at least 6 characters."),
    )


def test_a_new_account_can_be_created(signup, login, qaflix_account):
    step(f"Create {qaflix_account['email']}", lambda: signup.create(qaflix_account))

    def check_created():
        login.expect_heading_sign_in()
        login.expect_created_status()

    step("Check we land on sign-in with Account created", check_created)
