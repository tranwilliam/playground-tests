from playwright.sync_api import expect

from conftest import step

# Lab on theQAIguy: https://www.theqaiguy.com/playground/dialogs/
# Dialogs lab: a notice (dialog) and a delete confirm (alertdialog).
# Closing the notice should put keyboard focus back on Open notice.
# A click on the dimmed page behind delete should keep the report, not delete it.


def test_opens_a_notice_and_returns_focus_when_it_closes(page):
    def open_lab():
        page.goto("/playground/dialogs/")

    step("Open the dialogs lab", open_lab)

    open_notice = page.get_by_role("button", name="Open notice")

    def click_open():
        open_notice.click()

    step("Click Open notice", click_open)

    def check_dialog():
        expect(page.get_by_role("dialog", name="Practice notice")).to_be_visible()

    step("Check the Practice notice dialog is on screen", check_dialog)

    def click_close():
        page.get_by_role("button", name="Close notice").click()

    step("Click Close notice", click_close)

    def check_closed():
        expect(page.get_by_role("dialog", name="Practice notice")).to_be_hidden()
        expect(open_notice).to_be_focused()
        expect(page.locator("#dialog-result")).to_have_text("Notice closed.")

    step(
        "Check the dialog is gone, Open notice has focus, and the status says Notice closed.",
        check_closed,
    )


def test_a_click_outside_the_delete_dialog_keeps_the_report(page):
    def open_lab():
        page.goto("/playground/dialogs/")

    step("Open the dialogs lab", open_lab)

    def open_delete():
        page.get_by_role("button", name="Delete report").click()
        expect(page.get_by_role("alertdialog")).to_be_visible()

    step("Click Delete report so the confirm dialog opens", open_delete)

    def click_backdrop():
        page.mouse.click(8, 8)

    step("Click the top-left corner of the page (the dimmed backdrop), not Keep report", click_backdrop)

    def check_kept():
        expect(page.locator("#dialog-result")).to_have_text("Report kept.")
        expect(page.get_by_role("alertdialog")).to_be_hidden()

    step("Check the status says Report kept. and the confirm dialog is gone", check_kept)
