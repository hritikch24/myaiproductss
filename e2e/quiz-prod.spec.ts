import { test, expect } from '@playwright/test';

test.describe('Padhai Quiz on Production', () => {
  test('Login and then access quiz', async ({ page }) => {
    // First login
    await page.goto('https://kraftai.in/padhai/login');
    await page.waitForLoadState('networkidle');
    
    await page.locator('input[type="email"]').fill('qatest2026@test.com');
    await page.locator('input[type="password"]').fill('testpass123');
    await page.locator('button[type="submit"]').click();
    
    // Wait for login
    await page.waitForTimeout(5000);
    
    console.log('URL after login:', page.url());
    
    // Now go to quiz
    await page.goto('https://kraftai.in/padhai/quiz');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    const pageText = await page.locator('body').innerText();
    console.log('=== QUIZ PAGE ===');
    console.log(pageText);
    console.log('=================');
    
    const hasChapters = pageText.includes('Physics') || pageText.includes('Chemistry') || pageText.includes('Mathematics');
    const hasSelectChapter = pageText.includes('Select Chapter');
    const hasError = pageText.includes('Unauthorized') || pageText.includes('error');
    
    console.log({ hasChapters, hasSelectChapter, hasError });
    
    await page.screenshot({ path: 'e2e/test-results/quiz-after-login.png', fullPage: true });
  });
});
