from playwright.sync_api import expect

from conftest import step

# Lab on theQAIguy: https://www.theqaiguy.com/playground/locators/
# Locators lab: find buttons the way a person would (the words on the control).
# "Ship the redesign" changes the Save report button id. The test still clicks by name.
# Add 1 should add 1. Turning alerts on should set aria-pressed to true (screen readers use that).


def test_saves_the_report_by_name_after_the_redesign(page):
    def save_by_name():
        page.goto("/playground/locators/")
        page.get_by_role("button", name="Save report", exact=True).click()

    step("Open the locators lab and click Save report by its visible name", save_by_name)

    def check_saved():
        expect(page.locator("#report-status")).to_have_text("Report saved.")

    step("Check the status says Report saved.", check_saved)

    def redesign_and_save():
        page.get_by_label("Ship the redesign").check()
        expect(page.locator("#save-report")).to_have_count(0)
        page.get_by_role("button", name="Save report", exact=True).click()

    step("Tick Ship the redesign (the button id changes) and save again by name", redesign_and_save)

    def check_saved_again():
        expect(page.locator("#report-status")).to_have_text("Report saved.")

    step("Check it still says Report saved. after the id changed", check_saved_again)


def test_add_1_adds_1(page):
    def open_lab():
        page.goto("/playground/locators/")

    step("Open the locators lab", open_lab)

    def click_add():
        page.get_by_role("button", name="Add 1").click()

    step("Click Add 1", click_add)

    def check_counter():
        expect(page.locator("#counter-value")).to_have_text("1")

    step("Check the counter shows 1", check_counter)


def test_turning_alerts_on_sets_aria_pressed_to_true(page):
    alerts = page.locator("#toggle-alerts")

    def open_lab():
        page.goto("/playground/locators/")
        expect(alerts).to_have_text("Alerts off")

    step("Open the locators lab. Alerts should start off", open_lab)

    def click_toggle():
        alerts.click()

    step("Click the alerts toggle", click_toggle)

    def check_pressed():
        expect(alerts).to_have_text("Alerts on")
        expect(alerts).to_have_attribute("aria-pressed", "true")

    step("Check the label says Alerts on and aria-pressed is true", check_pressed)
