import asyncio
from playwright.async_api import async_playwright

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Test 1: Desktop Skip Link Visibility on Focus
        await page.goto('file:///app/index.html')
        await page.keyboard.press('Tab')
        skip_link = page.locator('.skip-link')
        is_visible = await skip_link.is_visible()
        print(f"Skip link visible on focus: {is_visible}")
        await page.screenshot(path='verify_skip_link.png')

        # Test 2: Mobile Menu Toggle
        await page.set_viewport_size({"width": 375, "height": 667})
        await page.goto('file:///app/index.html')
        toggle = page.locator('.menu-toggle')

        # Check if toggle is visible
        is_toggle_visible = await toggle.is_visible()
        print(f"Mobile toggle visible: {is_toggle_visible}")

        if is_toggle_visible:
            await toggle.click()
            # Check if nav-links are active
            nav_links = page.locator('.nav-links.active')
            is_nav_active = await nav_links.count() > 0
            print(f"Nav links active after click: {is_nav_active}")
            await page.screenshot(path='verify_mobile_menu.png')

        # Test 3: Schedule Icons (Accessibility)
        await page.set_viewport_size({"width": 1280, "height": 800})
        await page.goto('file:///app/index.html#termine')
        schedule_icons = page.locator('.schedule-status i')
        count = await schedule_icons.count()
        print(f"Schedule icons found: {count}")
        await page.screenshot(path='verify_schedule_final.png')

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
