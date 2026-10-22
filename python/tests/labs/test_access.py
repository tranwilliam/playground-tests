from playwright.sync_api import expect

from conftest import practice_user, step

# Lab on theQAIguy: https://www.theqaiguy.com/playground/access/
# Access lab: sign in as member, editor, or admin (password is always practice-only).
# A member should not see the staff report button.
# A member should not read someone else's note (try note id u-editor) or the staff report.


def test_signs_in_a_member_and_keeps_the_staff_report_hidden(page):
    def open_lab():
        page.goto("/playground/access/")

    step("Open the access lab", open_lab)

    def sign_in_member():
        page.get_by_label("Username").fill("member")
        page.get_by_label("Password").fill(practice_user["password"])
        page.get_by_role("button", name="Sign in").click()

    step(f"Sign in as member / {practice_user['password']}", sign_in_member)

    def check_role():
        expect(page.locator("#access-role")).to_have_text("Signed in as member (u-member).")
        expect(page.locator("#open-staff")).to_be_hidden()

    step("Check the role line says member and the staff report control is hidden", check_role)


def test_a_member_cannot_read_another_persons_note_or_the_staff_report(page):
    def open_and_sign_in():
        page.goto("/playground/access/")
        page.get_by_label("Username").fill("member")
        page.get_by_label("Password").fill(practice_user["password"])
        page.get_by_role("button", name="Sign in").click()

    step("Open the access lab and sign in as member", open_and_sign_in)

    def open_editor_note():
        page.get_by_label("Note id").fill("u-editor")
        page.get_by_role("button", name="Open note").click()

    step("Open note id u-editor (that note belongs to the editor)", open_editor_note)

    def check_note():
        expect(page.locator("#note-result")).to_have_text("This note belongs to someone else.")

    step('Check the page refuses with "This note belongs to someone else."', check_note)

    def request_staff():
        page.get_by_role("button", name="Request staff report").click()

    step("Click Request staff report", request_staff)

    def check_staff():
        expect(page.locator("#staff-result")).to_have_text("The staff report is for an admin.")

    step("Check the page says the staff report is for an admin", check_staff)
