import {test,expect} from '@playwright/test'
import { text } from 'stream/consumers';
test('dropdowns,checkboxes and radio buttons', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    const userName = page.locator('#username')
    const signIn = page.locator('#signInBtn')
    const dropdown  = page.locator('select.form-control')
    const documentLink = page.locator("[href*='documents-request']")
    await dropdown.selectOption("consult")
    await page.locator(".radiotextsty").last().click()
    await page.locator("#okayBtn").click()
    await expect(page.locator(".radiotextsty").last()).toBeChecked()
    await page.locator('#terms').click()
    await expect(page.locator('#terms')).toBeChecked()
    await page.locator('#terms').uncheck()
    expect(await page.locator('#terms').isChecked()).toBeFalsy()
    await expect(documentLink).toHaveAttribute("class","blinkingText")

})
test('switching to child and parent windows', async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    const documentLink = page.locator("[href*='documents-request']")
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ])
    const entireEmail = await newPage.locator(".red").textContent()
    const arraytext = entireEmail?.split('@')
    const domain = arraytext ? arraytext[1].split(" ")[0] : ''
    await page.locator("#username").fill(domain)

    console.log(text)


})

