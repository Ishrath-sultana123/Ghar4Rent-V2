import os
from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Get the absolute path to the index.html file
    file_path = os.path.abspath("index.html")

    # Navigate to the local index.html file
    page.goto(f"file://{file_path}")

    # 1. Check that the main hero section is visible
    hero_title = page.locator(".hero-title")
    expect(hero_title).to_be_visible()
    expect(hero_title).to_have_text("Find Your Dream Home or Post Your Property Free")

    # Take a screenshot of the initial page load
    page.screenshot(path="jules-scratch/verification/01_initial_load.png")

    # 2. Test responsive navigation
    page.set_viewport_size({"width": 375, "height": 667})
    menu_toggle = page.locator(".menu-toggle")
    nav = page.locator("nav")

    # Ensure the nav is not visible initially on mobile
    expect(nav).not_to_be_visible()

    # Take a screenshot right before the click to debug
    page.screenshot(path="jules-scratch/verification/debug_before_click.png")

    # Click the menu toggle to open the navigation
    menu_toggle.click(timeout=5000) # Increased timeout for debugging

    # Ensure the nav is now visible
    expect(nav).to_be_visible()

    # Take a screenshot of the open mobile menu
    page.screenshot(path="jules-scratch/verification/02_mobile_menu.png")

    # 3. Test the "Go to Top" button
    # Scroll to the bottom of the page to make the button appear
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

    go_to_top_btn = page.locator("#goToTopBtn")
    expect(go_to_top_btn).to_be_visible()

    # Take a screenshot of the "Go to Top" button
    page.screenshot(path="jules-scratch/verification/03_go_to_top_visible.png")

    # Click the button and verify that the page has scrolled to the top
    go_to_top_btn.click()

    # Wait for the scroll to complete
    page.wait_for_function("() => window.scrollY === 0")

    # Verify that the scroll position is at the top
    scroll_y = page.evaluate("window.scrollY")
    assert scroll_y == 0, f"Page did not scroll to the top. Current scrollY: {scroll_y}"

    # 4. Verify the "Post Property" links
    # Check the hero section button
    post_property_hero_btn = page.locator(".hero-cta-btn")
    expect(post_property_hero_btn).to_have_attribute("href", "post-property.html")

    # Check the dedicated section button
    post_property_section_btn = page.locator(".post-property-button")
    expect(post_property_section_btn).to_have_attribute("href", "post-property.html")

    print("All verification checks passed successfully!")

    browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)