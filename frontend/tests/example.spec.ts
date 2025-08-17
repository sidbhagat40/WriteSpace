// tests/auth.spec.ts
import { test, expect } from '@playwright/test';

test('User can sign up successfully', async ({ page, browserName }) => {
    // 1. Navigate to the signup page
    await page.goto('http://localhost:5173/signup');

    // 2. Find form elements and fill them out
    await page.getByPlaceholder('user@example.com').fill(`testuser_${browserName}_${Date.now()}@example.com`);
    await page.getByPlaceholder('Enter Full Name').fill('Test User');
    await page.getByPlaceholder('Enter Password').fill('password123');
    
    // 3. Click the signup button
    await page.getByRole('button', { name: 'Sign Up' }).click();

    // 4. Assert that the page redirected to the blogs page
    // This confirms the signup was successful.
    await expect(page).toHaveURL('http://localhost:5173/posts');
});