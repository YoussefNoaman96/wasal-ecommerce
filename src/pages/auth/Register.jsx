import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login')

    // Keep every test independent
    await page.evaluate(() => {
      localStorage.clear()
    })

    await page.reload()
  })

  test('login page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/login$/)

    await expect(
      page.getByRole('heading', { name: 'Login' })
    ).toBeVisible()

    await expect(
      page.getByPlaceholder('Email')
    ).toBeVisible()

    await expect(
      page.getByPlaceholder('Password')
    ).toBeVisible()

    await expect(
      page.getByRole('button', { name: 'Login' })
    ).toBeVisible()
  })


  test('register page loads successfully', async ({ page }) => {
    await page.goto('/register')

    await expect(page).toHaveURL(/\/register$/)

    await expect(
      page.getByRole('heading', { name: 'Create Account' })
    ).toBeVisible()

    await expect(
      page.getByPlaceholder('Full Name')
    ).toBeVisible()

    await expect(
      page.getByPlaceholder('Email')
    ).toBeVisible()

    await expect(
      page.getByPlaceholder('Password')
    ).toBeVisible()

    await expect(
      page.getByRole('button', { name: 'Register' })
    ).toBeVisible()
  })


  test('can navigate from login to register', async ({ page }) => {
    await page.getByRole('button', { name: 'Register' }).click()

    await expect(page).toHaveURL(/\/register$/)

    await expect(
      page.getByRole('heading', { name: 'Create Account' })
    ).toBeVisible()
  })


  test('can navigate from register to login', async ({ page }) => {
    await page.goto('/register')

    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page).toHaveURL(/\/login$/)

    await expect(
      page.getByRole('heading', { name: 'Login' })
    ).toBeVisible()
  })


  test('register rejects invalid email', async ({ page }) => {
    await page.goto('/register')

    await page.getByPlaceholder('Full Name').fill('Test User')

    await page.getByPlaceholder('Email').fill('invalid-email')

    await page.getByPlaceholder('Password').fill('Password123')

    await page.getByRole('button', { name: 'Register' }).click()

    await expect(
      page.getByText('Please enter a valid email address.')
    ).toBeVisible()

    await expect(page).toHaveURL(/\/register$/)
  })


  test('register rejects weak password', async ({ page }) => {
    await page.goto('/register')

    await page.getByPlaceholder('Full Name').fill('Test User')

    await page.getByPlaceholder('Email').fill('test@example.com')

    await page.getByPlaceholder('Password').fill('password')

    await page.getByRole('button', { name: 'Register' }).click()

    await expect(
      page.getByText(
        'Password must be at least 8 characters and contain a number.'
      )
    ).toBeVisible()

    await expect(page).toHaveURL(/\/register$/)
  })


  test('register rejects password shorter than 8 characters', async ({ page }) => {
    await page.goto('/register')

    await page.getByPlaceholder('Full Name').fill('Test User')

    await page.getByPlaceholder('Email').fill('test@example.com')

    await page.getByPlaceholder('Password').fill('Pass1')

    await page.getByRole('button', { name: 'Register' }).click()

    await expect(
      page.getByText(
        'Password must be at least 8 characters and contain a number.'
      )
    ).toBeVisible()

    await expect(page).toHaveURL(/\/register$/)
  })


  test('user can register successfully', async ({ page }) => {
    await page.goto('/register')

    await page.getByPlaceholder('Full Name').fill('Test User')

    await page.getByPlaceholder('Email').fill('test@example.com')

    await page.getByPlaceholder('Password').fill('Password123')

    await page.getByRole('button', { name: 'Register' }).click()

    // Successful registration redirects to login
    await expect(page).toHaveURL(/\/login$/)

    // Verify registered user was saved
    const registeredUser = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('registeredUser'))
    })

    expect(registeredUser).toEqual({
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123',
    })
  })


  test('cannot register a second account', async ({ page }) => {

    // Create an existing account first
    await page.evaluate(() => {
      localStorage.setItem(
        'registeredUser',
        JSON.stringify({
          name: 'Existing User',
          email: 'existing@example.com',
          password: 'Password123',
        })
      )
    })

    await page.goto('/register')

    await page.getByPlaceholder('Full Name').fill('Second User')

    await page.getByPlaceholder('Email').fill('second@example.com')

    await page.getByPlaceholder('Password').fill('Password456')

    await page.getByRole('button', { name: 'Register' }).click()

    await expect(
      page.getByText('An account already exists.')
    ).toBeVisible()

    await expect(page).toHaveURL(/\/register$/)
  })


  test('login fails when no account exists', async ({ page }) => {
    await page.goto('/login')

    await page.getByPlaceholder('Email').fill('test@example.com')

    await page.getByPlaceholder('Password').fill('Password123')

    await page.getByRole('button', { name: 'Login' }).click()

    await expect(
      page.getByText(
        'No account found. Please register first.'
      )
    ).toBeVisible()

    await expect(page).toHaveURL(/\/login$/)
  })


  test('login rejects invalid email', async ({ page }) => {

    await page.evaluate(() => {
      localStorage.setItem(
        'registeredUser',
        JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          password: 'Password123',
        })
      )
    })

    await page.goto('/login')

    await page.getByPlaceholder('Email').fill('invalid-email')

    await page.getByPlaceholder('Password').fill('Password123')

    await page.getByRole('button', { name: 'Login' }).click()

    await expect(
      page.getByText('Please enter a valid email address.')
    ).toBeVisible()

    await expect(page).toHaveURL(/\/login$/)
  })


  test('login fails with wrong password', async ({ page }) => {

    await page.evaluate(() => {
      localStorage.setItem(
        'registeredUser',
        JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          password: 'Password123',
        })
      )
    })

    await page.goto('/login')

    await page.getByPlaceholder('Email').fill('test@example.com')

    await page.getByPlaceholder('Password').fill('WrongPassword123')

    await page.getByRole('button', { name: 'Login' }).click()

    await expect(
      page.getByText('Invalid email or password.')
    ).toBeVisible()

    await expect(page).toHaveURL(/\/login$/)
  })


  test('user can login successfully', async ({ page }) => {

    await page.evaluate(() => {
      localStorage.setItem(
        'registeredUser',
        JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          password: 'Password123',
        })
      )
    })

    await page.goto('/login')

    await page.getByPlaceholder('Email').fill('test@example.com')

    await page.getByPlaceholder('Password').fill('Password123')

    await page.getByRole('button', { name: 'Login' }).click()

    // Successful login redirects to home
    await expect(page).toHaveURL(/\/$/)

    // Verify logged-in user was saved
    const loggedInUser = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('user'))
    })

    expect(loggedInUser).toEqual({
      name: 'Test User',
      email: 'test@example.com',
    })
  })

})