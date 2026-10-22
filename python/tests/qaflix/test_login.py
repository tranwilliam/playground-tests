from conftest import step

# Sign in: https://www.theqaiguy.com/qaflix/login/
# Needs an account first, so we reuse signup.create.


def test_the_right_password_opens_the_plans_page(signup, login, plans, qaflix_account):
    step("Create an account", lambda: signup.create(qaflix_account))
    step(
        "Sign in with that email and password",
        lambda: login.submit(qaflix_account["email"], qaflix_account["password"]),
    )
    step("Check we are on Choose how you watch", plans.expect_visible)


def test_the_wrong_password_is_refused(signup, login, qaflix_account):
    step("Create an account", lambda: signup.create(qaflix_account))
    step(
        "Sign in with the wrong password",
        lambda: login.submit(qaflix_account["email"], "nope-nope"),
    )
    step(
        "Check the form says no account matches",
        lambda: login.expect_error("No account matches that email and password."),
    )
