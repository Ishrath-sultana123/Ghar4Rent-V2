import os
from playwright.sync_api import sync_playwright, expect

def run_debug_script(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    file_path = os.path.abspath("index.html")
    page.goto(f"file://{file_path}")

    page.set_viewport_size({"width": 375, "height": 667})

    # Screenshot before the click
    page.screenshot(path="jules-scratch/verification/debug_before_click_simple.png")

    menu_toggle = page.locator(".menu-toggle")

    try:
        # Using force=True to bypass some actionability checks
        menu_toggle.click(force=True, timeout=5000)
        print("Click was successful with force=True.")
    except Exception as e:
        print(f"Click failed even with force=True: {e}")

    # Screenshot after the click
    page.screenshot(path="jules-scratch/verification/debug_after_click_simple.png")

    browser.close()

with sync_playwright() as playwright:
    run_debug_script(playwright)