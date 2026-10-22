from playwright.sync_api import expect

from conftest import step

# Lab on theQAIguy: https://www.theqaiguy.com/playground/injection/
# Injection lab: you type a probe string and the page echoes it.
# A safe echo shows the text. It should not pop a browser alert.


def test_echoes_a_probe_without_opening_a_dialog(page):
    dialogs: list[str] = []

    def on_dialog(dialog):
        dialogs.append(dialog.message)
        dialog.dismiss()

    page.on("dialog", on_dialog)

    def open_lab():
        page.goto("/playground/injection/")

    step("Open the injection lab", open_lab)

    def run_probe():
        page.get_by_role("textbox", name="Probe").fill("qa-probe")
        page.get_by_role("button", name="Run probe").click()

    step("Type qa-probe and click Run probe", run_probe)

    def check_echo():
        expect(page.locator("#probe-echo")).to_have_text("qa-probe")
        assert dialogs == []

    step("Check the echo shows qa-probe and no browser alert opened", check_echo)
