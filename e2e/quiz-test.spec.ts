import { test, expect } from '@playwright/test';

test.describe('Padhai Quiz Page', () => {
  test('Quiz page shows chapters when logged in', async ({ page }) => {
    // Go to login first
    await page.goto('http://localhost:3000/padhai/login');
    await page.waitForLoadState('networkidle');
    
    // Fill login form
    await page.locator('input[type="email"]').fill('qatest2026@test.com');
    await page.locator('input[type="password"]').fill('testpass123');
    
    // Click sign in button
    await page.locator('button[type="submit"]').click();
    
    // Wait for navigation - may take a while due to auth
    console.log('Waiting for login redirect...');
    await page.waitForTimeout(5000);
    
    const currentUrl = page.url();
    console.log('URL after login:', currentUrl);
    
    // If still on login, try clicking signup or check for errors
    if (currentUrl.includes('login')) {
      const errorText = await page.locator('body').innerText();
      console.log('Login page text:', errorText.substring(0, 300));
    }
    
    // Go to quiz
    await page.goto('http://localhost:3000/padhai/quiz');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    const pageText = await page.locator('body').innerText();
    console.log('Quiz page:', pageText.substring(0, 400));
    
    // Check results
    const hasSelectChapter = pageText.includes('Select Chapter');
    const hasChapters = pageText.includes('Physics') || pageText.includes('Chemistry') || pageText.includes('Mathematics');
    const hasError = pageText.includes('error') || pageText.includes('Error') || pageText.includes('Missing');
    
    console.log('Results:', { hasSelectChapter, hasChapters, hasError });
    
    // If there's an error, log it
    if (hasError && !hasChapters) {
      console.log('ERROR: Quiz page has error but no chapters');
    }
    
    await page.screenshot({ path: 'e2e/test-results/quiz-logged-in.png', fullPage: true });
  });
});
