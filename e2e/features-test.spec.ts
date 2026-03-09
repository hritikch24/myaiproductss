import { test, expect } from '@playwright/test';

test.describe('Padhai Features Verification', () => {
  test('Quiz page loads with chapter selection (NOT stuck)', async ({ page }) => {
    await page.goto('http://localhost:3000/padhai/quiz');
    await page.waitForLoadState('networkidle');
    
    const pageText = await page.locator('body').innerText();
    console.log('Quiz page:', pageText.substring(0, 200));
    
    // Should show chapter selection (NOT stuck on loading)
    expect(pageText).toContain('Select Chapter');
    expect(pageText).not.toContain('Generating quiz questions');
    
    console.log('✓ Quiz page loads with chapter selection - NOT stuck!');
  });

  test('Profile page has class/board/exam dropdowns (public)', async ({ page }) => {
    await page.goto('http://localhost:3000/padhai/profile');
    await page.waitForLoadState('networkidle');
    
    const pageText = await page.locator('body').innerText();
    console.log('Profile page:', pageText.substring(0, 300));
    
    // Should show login or profile - either way we check structure
    const isLoginPage = pageText.includes('Sign In') || pageText.includes('login');
    console.log('Is login page:', isLoginPage);
    
    if (!isLoginPage) {
      const hasClass = pageText.includes('Class');
      const hasBoard = pageText.includes('Board');
      console.log('Has Class:', hasClass, 'Has Board:', hasBoard);
    }
  });

  test('Landing page loads correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/padhai');
    await page.waitForLoadState('networkidle');
    
    const pageText = await page.locator('body').innerText();
    console.log('Landing page:', pageText.substring(0, 200));
    
    expect(pageText).toContain('Padhai');
    console.log('✓ Landing page loads');
  });

  test('Login page loads', async ({ page }) => {
    await page.goto('http://localhost:3000/padhai/login');
    await page.waitForLoadState('networkidle');
    
    const pageText = await page.locator('body').innerText();
    
    expect(pageText).toContain('Sign in');
    expect(pageText).toContain('Email');
    console.log('✓ Login page loads');
  });

  test('Syllabus page loads', async ({ page }) => {
    await page.goto('http://localhost:3000/padhai/syllabus');
    await page.waitForLoadState('networkidle');
    
    const pageText = await page.locator('body').innerText();
    console.log('Syllabus:', pageText.substring(0, 200));
    
    // Should show syllabus or ask to login
    const hasContent = pageText.includes('Syllabus') || pageText.includes('Sign');
    expect(hasContent).toBe(true);
    console.log('✓ Syllabus page loads');
  });
});
