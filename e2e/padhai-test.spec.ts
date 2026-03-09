import { test, expect } from '@playwright/test';

test.describe('Padhai App Real-time Testing', () => {
  test('Interactive flow with better navigation', async ({ page }) => {
    const screenshots: string[] = [];
    const timestamp = Date.now();
    const testEmail = `test${timestamp}@example.com`;
    const testPassword = 'TestPassword123!';
    const testName = 'Test User';
    
    const takeScreenshot = async (name: string) => {
      const path = `e2e/test-results/${name}.png`;
      await page.screenshot({ path, fullPage: true });
      screenshots.push(path);
      console.log(`Screenshot: ${path}`);
    };

    // Step 1: Navigate directly to login page
    console.log('=== Step 1: Login Page ===');
    await page.goto('http://localhost:3000/padhai/login');
    await page.waitForLoadState('networkidle');
    await takeScreenshot('01-login-page');
    
    // Check page title and main elements
    const pageTitle = await page.title();
    console.log(`Page title: ${pageTitle}`);
    console.log(`URL: ${page.url()}`);
    
    // Look for any error messages
    const bodyText = await page.locator('body').innerText();
    console.log(`Page contains: ${bodyText.substring(0, 200)}...`);

    // Step 2: Click sign up
    console.log('\n=== Step 2: Sign Up ===');
    const signUpLink = page.locator('a:has-text("Sign up"), button:has-text("Sign up")').first();
    await signUpLink.click();
    await page.waitForLoadState('networkidle');
    await takeScreenshot('02-signup-page');
    
    console.log(`URL after signup click: ${page.url()}`);

    // Step 3: Fill signup form
    console.log('\n=== Step 3: Fill Signup Form ===');
    const nameInput = page.locator('input[name="name"], input[placeholder*="name" i]').first();
    const emailInput = page.locator('input[type="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    
    if (await nameInput.isVisible()) {
      await nameInput.fill(testName);
      console.log('✓ Filled name');
    }
    if (await emailInput.isVisible()) {
      await emailInput.fill(testEmail);
      console.log('✓ Filled email');
    }
    if (await passwordInput.isVisible()) {
      await passwordInput.fill(testPassword);
      console.log('✓ Filled password');
    }
    await takeScreenshot('03-signup-filled');
    
    // Submit
    const submitBtn = page.locator('button[type="submit"]').first();
    await submitBtn.click();
    await page.waitForTimeout(3000);
    await takeScreenshot('04-after-signup');
    
    console.log(`URL after signup: ${page.url()}`);
    
    // Step 4: Try login with created credentials
    console.log('\n=== Step 4: Login ===');
    await page.goto('http://localhost:3000/padhai/login');
    await page.waitForLoadState('networkidle');
    
    const loginEmail = page.locator('input[type="email"]').first();
    const loginPassword = page.locator('input[type="password"]').first();
    
    await loginEmail.fill(testEmail);
    await loginPassword.fill(testPassword);
    await takeScreenshot('05-login-filled');
    
    const loginBtn = page.locator('button[type="submit"]').first();
    await loginBtn.click();
    await page.waitForTimeout(5000);
    await takeScreenshot('06-after-login');
    
    console.log(`URL after login: ${page.url()}`);

    // Step 5: Onboarding - try to find and click class selection
    console.log('\n=== Step 5: Onboarding ===');
    await page.waitForTimeout(2000);
    await takeScreenshot('07-onboarding');
    
    // Check for class buttons (Class 11, 12)
    const classButtons = page.locator('button');
    const buttonCount = await classButtons.count();
    console.log(`Found ${buttonCount} buttons on page`);
    
    for (let i = 0; i < Math.min(buttonCount, 10); i++) {
      const text = await classButtons.nth(i).innerText();
      if (text.toLowerCase().includes('11') || text.toLowerCase().includes('class')) {
        console.log(`Button ${i}: ${text}`);
      }
    }
    
    // Click something that might be class 11
    const class11 = page.locator('text=11').first();
    if (await class11.isVisible()) {
      await class11.click();
      await page.waitForTimeout(1000);
      await takeScreenshot('08-class-selected');
    }
    
    // JEE exam
    const jee = page.locator('text=JEE').first();
    if (await jee.isVisible()) {
      await jee.click();
      await page.waitForTimeout(1000);
      await takeScreenshot('09-jee-selected');
    }
    
    // Done/Submit button
    const doneBtn = page.locator('button:has-text("Done"), button:has-text("Submit"), button:has-text("Continue")').first();
    if (await doneBtn.isVisible()) {
      await doneBtn.click();
      await page.waitForTimeout(3000);
      await takeScreenshot('10-onboarding-done');
    }
    
    console.log(`URL after onboarding: ${page.url()}`);

    // Step 6: Dashboard
    console.log('\n=== Step 6: Dashboard ===');
    await page.goto('http://localhost:3000/padhai/dashboard');
    await page.waitForLoadState('networkidle');
    await takeScreenshot('11-dashboard');
    console.log(`Dashboard URL: ${page.url()}`);
    
    // Get all navigation links
    const navLinks = page.locator('nav a, [class*="nav"] a, [class*="menu"] a, header a');
    const navCount = await navLinks.count();
    console.log(`Found ${navCount} navigation links`);
    
    // Step 7: Navigate to each page
    console.log('\n=== Step 7: Test Pages ===');
    
    // Syllabus
    console.log('\n--- Syllabus ---');
    const syllabusLink = page.locator('a:has-text("Syllabus"), [href*="syllabus"]').first();
    if (await syllabusLink.isVisible()) {
      await syllabusLink.click();
      await page.waitForLoadState('networkidle');
      await takeScreenshot('12-syllabus');
      
      const doneButton = page.locator('button:has-text("Done")').last();
      if (await doneButton.isVisible()) {
        console.log('✓ Done button visible at bottom');
      } else {
        console.log('✗ Done button NOT visible at bottom');
      }
    }
    
    // Goals
    console.log('\n--- Goals ---');
    const goalsLink = page.locator('a:has-text("Goals"), [href*="goals"]').first();
    if (await goalsLink.isVisible()) {
      await goalsLink.click();
      await page.waitForLoadState('networkidle');
      await takeScreenshot('13-goals');
      
      const doneButton = page.locator('button:has-text("Done")').last();
      if (await doneButton.isVisible()) {
        console.log('✓ Done button visible at bottom');
      } else {
        console.log('✗ Done button NOT visible at bottom');
      }
    }
    
    // Quiz
    console.log('\n--- Quiz ---');
    const quizLink = page.locator('a:has-text("Quiz"), [href*="quiz"]').first();
    if (await quizLink.isVisible()) {
      await quizLink.click();
      await page.waitForLoadState('networkidle');
      await takeScreenshot('14-quiz');
      console.log('✓ Quiz page loaded');
    }
    
    // Profile
    console.log('\n--- Profile ---');
    const profileLink = page.locator('a:has-text("Profile"), [href*="profile"]').first();
    if (await profileLink.isVisible()) {
      await profileLink.click();
      await page.waitForLoadState('networkidle');
      await takeScreenshot('15-profile');
      
      const signOutBtn = page.locator('button:has-text("Sign Out"), button:has-text("Logout"), a:has-text("Sign Out")').first();
      if (await signOutBtn.isVisible()) {
        console.log('✓ Sign Out button visible');
      } else {
        console.log('✗ Sign Out button NOT visible');
      }
    }
    
    // Photo upload
    console.log('\n--- Photo Upload ---');
    const photoLink = page.locator('a:has-text("Photo"), [href*="photo"]').first();
    if (await photoLink.isVisible()) {
      await photoLink.click();
      await page.waitForLoadState('networkidle');
      await takeScreenshot('16-photo');
    }
    
    // Premium
    console.log('\n--- Premium ---');
    const premiumLink = page.locator('a:has-text("Premium"), [href*="premium"]').first();
    if (await premiumLink.isVisible()) {
      await premiumLink.click();
      await page.waitForLoadState('networkidle');
      await takeScreenshot('17-premium');
    }
    
    // Parent Reports
    console.log('\n--- Parent Reports ---');
    const parentLink = page.locator('a:has-text("Parent"), [href*="parent"]').first();
    if (await parentLink.isVisible()) {
      await parentLink.click();
      await page.waitForLoadState('networkidle');
      await takeScreenshot('18-parent');
    }
    
    // Step 8: Logout
    console.log('\n=== Step 8: Logout ===');
    const logoutBtn = page.locator('button:has-text("Sign Out"), button:has-text("Logout")').first();
    if (await logoutBtn.isVisible()) {
      await logoutBtn.click();
      await page.waitForTimeout(2000);
      await takeScreenshot('19-after-logout');
      
      if (page.url().includes('login')) {
        console.log('✓ Logged out successfully');
      }
    }
    
    console.log('\n=== TEST COMPLETE ===');
    console.log(`Total screenshots: ${screenshots.length}`);
  });
});
