import { test, expect } from '@playwright/test';

test.describe('Padhai Full Flow', () => {
  test('Signup, complete onboarding, then quiz', async ({ page }) => {
    const timestamp = Date.now();
    const email = `newtest${timestamp}@test.com`;
    const password = 'TestPass123!';
    
    // Go to signup
    await page.goto('https://kraftai.in/padhai/login');
    await page.waitForLoadState('networkidle');
    
    // Click sign up link
    await page.click('text=Sign up');
    await page.waitForLoadState('networkidle');
    
    // Fill signup form
    await page.fill('input[name="name"], input[placeholder*="name" i]', 'New Test User');
    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);
    
    // Submit
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    
    console.log('URL after signup:', page.url());
    
    // If redirected to login, login with new credentials
    if (page.url().includes('login')) {
      await page.fill('input[type="email"]', email);
      await page.fill('input[type="password"]', password);
      await page.click('button[type="submit"]');
      await page.waitForTimeout(5000);
    }
    
    console.log('URL after login:', page.url());
    
    // Now we should be on onboarding or dashboard
    // Complete onboarding if needed
    if (page.url().includes('onboarding')) {
      await page.waitForTimeout(2000);
      
      // Select class 11
      const class11 = page.locator('button:has-text("11")').first();
      if (await class11.isVisible()) {
        await class11.click();
        await page.waitForTimeout(500);
        
        // Select JEE
        const jee = page.locator('button:has-text("JEE")').first();
        if (await jee.isVisible()) {
          await jee.click();
          await page.waitForTimeout(500);
          
          // Click continue/start
          const startBtn = page.locator('button:has-text("Start"), button:has-text("Continue")').first();
          if (await startBtn.isVisible()) {
            await startBtn.click();
            await page.waitForTimeout(3000);
          }
        }
      }
    }
    
    console.log('URL after onboarding:', page.url());
    
    // Go to quiz
    await page.goto('https://kraftai.in/padhai/quiz');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    const pageText = await page.locator('body').innerText();
    console.log('Quiz page:', pageText.substring(0, 300));
    
    const hasChapters = pageText.includes('Physics') || pageText.includes('Chemistry') || pageText.includes('Mathematics');
    const hasSelectChapter = pageText.includes('Select Chapter');
    
    console.log({ hasChapters, hasSelectChapter });
    
    await page.screenshot({ path: 'e2e/test-results/quiz-full-flow.png', fullPage: true });
  });
});
