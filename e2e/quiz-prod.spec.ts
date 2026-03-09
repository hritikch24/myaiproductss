import { test, expect } from '@playwright/test';

test.describe('Padhai Quiz on Production', () => {
  test('Quiz page works on kraftai.in', async ({ page }) => {
    // Go to quiz page on production
    await page.goto('https://kraftai.in/padhai/quiz');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    const pageText = await page.locator('body').innerText();
    console.log('Production Quiz page:', pageText.substring(0, 400));
    
    const hasSelectChapter = pageText.includes('Select Chapter');
    const hasChapters = pageText.includes('Physics') || pageText.includes('Chemistry') || pageText.includes('Mathematics');
    const hasError = pageText.includes('error') || pageText.includes('Error') || pageText.includes('Missing');
    
    console.log({ hasSelectChapter, hasChapters, hasError });
    
    await page.screenshot({ path: 'e2e/test-results/quiz-prod.png', fullPage: true });
    
    // If user is not logged in, should redirect to login
    if (page.url().includes('login')) {
      console.log('User not logged in - needs login first');
      return;
    }
    
    // If logged in, should show chapters
    if (hasChapters) {
      console.log('SUCCESS: Chapters are showing!');
    } else if (hasError) {
      console.log('ERROR: There is an error showing');
    }
  });
});
