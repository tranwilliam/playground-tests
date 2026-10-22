from playwright.sync_api import expect

from conftest import practice_card, step

# Lab on theQAIguy: https://www.theqaiguy.com/playground/payment/
# Card payment lab: a fake card form. 4242 is the accepted practice card.
# 0002 is the declined practice card. The page should never call Stripe.


def test_accepts_the_practice_card_and_does_not_call_stripe(page):
    leaked: list[str] = []

    def on_request(request):
        if "stripe" in request.url:
            leaked.append(request.url)

    page.on("request", on_request)

    def open_lab():
        page.goto("/playground/payment/")

    step("Open the card payment lab", open_lab)

    def pay_accepted():
        page.get_by_label("Name on card").fill(practice_card["name"])
        page.get_by_label("Card number").fill(practice_card["accepted"])
        page.get_by_label("Expiry").fill(practice_card["expiry"])
        page.get_by_label("Security code").fill(practice_card["cvc"])
        page.get_by_role("button", name="Pay with practice card").click()

    step(f"Pay with the accepted practice card {practice_card['accepted']}", pay_accepted)

    def check_accepted():
        expect(page.locator("#payment-result")).to_have_text(
            "Practice payment accepted. Nothing was charged."
        )

    step("Check the page says the practice payment was accepted and nothing was charged", check_accepted)

    def check_no_stripe():
        assert leaked == []

    step("Check the browser did not call Stripe", check_no_stripe)


def test_the_slip_matches_a_declined_card(page):
    def open_lab():
        page.goto("/playground/payment/")

    step("Open the card payment lab", open_lab)

    def pay_declined():
        page.get_by_label("Name on card").fill(practice_card["name"])
        page.get_by_label("Card number").fill(practice_card["declined"])
        page.get_by_label("Expiry").fill(practice_card["expiry"])
        page.get_by_label("Security code").fill(practice_card["cvc"])
        page.get_by_role("button", name="Pay with practice card").click()

    step(f"Pay with the declined practice card {practice_card['declined']}", pay_declined)

    def check_result():
        expect(page.locator("#payment-result")).to_have_text("Practice card declined.")

    step("Check the result text says the practice card was declined", check_result)

    def check_slip():
        expect(page.locator("#slip-result")).to_have_text("Practice card declined.")

    step("Check the slip says the same declined message", check_slip)
