import { test, expect } from '@playwright/test'

test.describe('Wasal Home Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('homepage loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Wasal/i)
  })

  test('header and logo are visible', async ({ page }) => {
    const header = page.locator('.top_header')
    const logo = page.locator('.logo img')

    await expect(header).toBeVisible()
    await expect(logo).toBeVisible()
    await expect(logo).toHaveAttribute('alt', 'Wasal')
  })

  test('products are loaded successfully', async ({ page }) => {
    const products = page.locator('.product')

    // Wait until products are loaded from DummyJSON
    await expect(products.first()).toBeVisible({
      timeout: 15000,
    })

    // Home contains products
    await expect(products).not.toHaveCount(0)
  })

  test('product card contains required information', async ({ page }) => {
    const product = page.locator('.product').first()

    await expect(product).toBeVisible({
      timeout: 15000,
    })

    // Product image
    await expect(product.locator('.img_product img')).toBeVisible()

    // Product title
    await expect(product.locator('.name_product')).toBeVisible()

    // Product rating
    await expect(product.locator('.stars')).toBeVisible()

    // Product price
    await expect(product.locator('.price')).toBeVisible()
  })

  test('clicking a product opens product details', async ({ page }) => {
    const product = page.locator('.product').first()

    await expect(product).toBeVisible({
      timeout: 15000,
    })

    const productLink = product.locator('a').first()

    const href = await productLink.getAttribute('href')

    expect(href).toMatch(/^\/products\/\d+$/)

    await productLink.click()

    await expect(page).toHaveURL(/\/products\/\d+$/)
  })

  test('cart and favorites counters are visible', async ({ page }) => {
    const cartCount = page.locator('.header_icons .icon').nth(1).locator('.count')
    const favoritesCount = page.locator('.header_icons .icon').nth(0).locator('.count')

    await expect(cartCount).toBeVisible()
    await expect(favoritesCount).toBeVisible()
  })

  test('unauthenticated user cannot add product to cart', async ({ page }) => {
    const product = page.locator('.product').first()

    await expect(product).toBeVisible({
      timeout: 15000,
    })

    // Product buttons are shown on hover on desktop
    await product.hover()

    const addToCartButton = product.locator('.btn_addtocart')

    await expect(addToCartButton).toBeVisible()

    await addToCartButton.click()

    await expect(
      page.getByText('Please login to add products to your cart.')
    ).toBeVisible()
  })

  test('unauthenticated user cannot add product to favorites', async ({ page }) => {
    const product = page.locator('.product').first()

    await expect(product).toBeVisible({
      timeout: 15000,
    })

    await product.hover()

    const favoriteButton = product.locator('.favorite-btn')

    await expect(favoriteButton).toBeVisible()

    await favoriteButton.click()

    await expect(
      page.getByText('Please login to add products to your favorites.')
    ).toBeVisible()
  })

})