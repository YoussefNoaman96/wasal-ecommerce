import { test, expect } from '@playwright/test'

test.describe('Authentication Layout', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login')

    // Make sure every test starts clean
    await page.evaluate(() => {
      localStorage.clear()
    })

    await page.reload()
  })

  test('login page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/login$/)

    await expect(
      page.getByRole('heading', { name: 'Welcome Back!' })
    ).toBeVisible()
  })

  test('register page loads successfully', async ({ page }) => {
    await page.goto('/register')

    await expect(page).toHaveURL(/\/register$/)

    await expect(
      page.getByRole('heading', { name: 'Hello Again!' })
    ).toBeVisible()
  })

  test('login page can navigate to register', async ({ page }) => {
    await page.getByRole('button', { name: 'Register' }).click()

    await expect(page).toHaveURL(/\/register$/)
  })

  test('register page can navigate to login', async ({ page }) => {
    await page.goto('/register')

    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page).toHaveURL(/\/login$/)
  })

})