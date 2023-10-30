const { test, expect } = require('@playwright/test')

test.describe('Page tests', () => {
  // berofe each test go to   http://localhost:3000/es
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/es')
  })

  // Test for title
  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle('Johan Guse | Frontend Developer')
  })

  // Test for redirect link
  test('get started link(first) redirects to signin or paths', async ({
    page,
  }) => {
    await page.locator('.btn-login').click()

    if (process.env.AUTH === '1') {
      await expect(page).toHaveURL(/signin/)
    } else {
      await expect(page).toHaveURL(/paths/)
    }
  })
})
