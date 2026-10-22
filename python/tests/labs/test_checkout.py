from playwright.sync_api import expect

from conftest import step

# Lab on theQAIguy: https://www.theqaiguy.com/playground/checkout/
# Checkout lab: pick a plan, enter a name and email, review, place a fake order.
# A bad email should error. A good order should print a receipt and not charge anyone.
# The review summary should still show the plan you picked.


def test_rejects_a_bad_email_then_places_a_practice_order(page):
    def open_and_choose():
        page.goto("/playground/checkout/")
        page.get_by_role("radio", name="Team, $20").check()
        page.get_by_role("button", name="Continue").click()

    step("Open the checkout lab and choose Team, $20", open_and_choose)

    def bad_email():
        page.get_by_label("Your name").fill("Ada")
        page.get_by_label("Email").fill("not-an-email")
        page.get_by_role("button", name="Review order").click()

    step("Enter name Ada and email not-an-email, then click Review order", bad_email)

    def check_error():
        expect(page.locator("#checkout-error")).to_have_text("Enter an email like tester@example.com.")

    step("Check the page asks for an email like tester@example.com", check_error)

    def place_order():
        page.get_by_label("Your name").fill("Ada")
        page.get_by_label("Email").fill("ada@example.com")
        page.get_by_role("button", name="Review order").click()
        page.get_by_role("button", name="Place practice order").click()

    step("Enter a real-looking email, review, and place the practice order", place_order)

    def check_receipt():
        expect(page.locator("#receipt")).to_have_text(
            "Receipt PG-1042. Team, $20 for Ada. Nothing was charged."
        )

    step("Check the receipt is for Team, $20 for Ada and nothing was charged", check_receipt)


def test_the_review_step_keeps_the_plan_you_chose(page):
    def review_as_ada():
        page.goto("/playground/checkout/")
        page.get_by_role("radio", name="Team, $20").check()
        page.get_by_role("button", name="Continue").click()
        page.get_by_label("Your name").fill("Ada")
        page.get_by_label("Email").fill("ada@example.com")
        page.get_by_role("button", name="Review order").click()

    step("Open checkout, choose Team, $20, and review as Ada / ada@example.com", review_as_ada)

    def check_summary():
        expect(page.locator("#checkout-summary")).to_have_text("Team, $20. Ada. ada@example.com.")

    step("Check the summary still says Team, $20, not a different plan", check_summary)
