from conftest import step

# Forgot password: https://www.theqaiguy.com/qaflix/forgot/
# Reset only works for an email that already exists in this browser.


def test_a_member_can_set_a_new_password_and_sign_in_with_it(
    signup, forgot, login, plans, qaflix_account
):
    step("Create an account", lambda: signup.create(qaflix_account))

    def open_forgot():
        forgot.open()
        forgot.continue_with_email(qaflix_account["email"])

    step("Open Forgot password and continue with that email", open_forgot)

    def set_password():
        forgot.expect_heading_set_password()
        forgot.set_password("secret2")

    step("Set a new password twice", set_password)

    def sign_in_new():
        forgot.expect_updated_status()
        login.submit(qaflix_account["email"], "secret2")

    step("Sign in with the new password", sign_in_new)
    step("Check we are on Choose how you watch", plans.expect_visible)
