import { browserContext, expect, test } from '@playwright/test'

test.skip(process.env.AUTH === '1')

// skip if mobile
test.skip(({ isMobile }) => isMobile)

// Test navbar on every page
test.afterEach(async ({ page }) => {
  // Runs after each test by checking navbar components

  // skip if mobile
  // test.skip(browserName != 'chromium', 'Mobile navbar different');

  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Register' })).toBeVisible()
})

test('check navbar on /login', async ({ page }) => {
  // ideally have this be authenticated
  await page.goto('/login')
})

test('check navbar on /register', async ({ page }) => {
  // ideally have this be authenticated
  await page.goto('/register')
})
