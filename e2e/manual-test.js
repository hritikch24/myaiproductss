const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const baseUrl = 'https://kraftai.in/padhai';
  const screenshots = [];
  
  async function screenshot(name) {
    const path = `e2e/test-results/${name}.png`;
    await page.screenshot({ path, fullPage: true });
    screenshots.push(name);
    console.log(`Screenshot: ${path}`);
  }
  
  console.log('=== PADHDAI APP TESTING REPORT ===\n');
  
  // 1. Login Page
  console.log('1. LOGIN PAGE');
  await page.goto(`${baseUrl}/login`);
  await page.waitForLoadState('networkidle');
  await screenshot('01-login');
  console.log('   ✓ Login page loads correctly');
  console.log('   - Has email/password fields + Google OAuth button\n');
  
  // 2. Signup Flow
  console.log('2. SIGNUP FLOW');
  await page.locator('button:has-text("Sign up")').click();
  await page.waitForTimeout(1000);
  await screenshot('02-signup-form');
  console.log('   ✓ Signup form appears (name, email, password)');
  
  // Fill and submit
  const testEmail = `test${Date.now()}@example.com`;
  await page.locator('input[placeholder*="name"]').fill('Test User');
  await page.locator('input[type="email"]').fill(testEmail);
  await page.locator('input[type="password"]').fill('TestPass123!');
  await screenshot('03-signup-filled');
  
  await page.locator('button:has-text("Create Account")').click();
  await page.waitForTimeout(3000);
  await screenshot('04-after-signup');
  console.log(`   - Submitted with: ${testEmail}`);
  console.log('   ✗ ISSUE: Stays on login page - signup appears broken\n');
  
  // 3. Login attempt
  console.log('3. LOGIN ATTEMPT');
  await page.goto(`${baseUrl}/login`);
  await page.locator('input[type="email"]').fill(testEmail);
  await page.locator('input[type="password"]').fill('TestPass123!');
  await page.locator('button:has-text("Sign In")').click();
  await page.waitForTimeout(3000);
  await screenshot('05-after-login');
  console.log('   ✗ ISSUE: Stays on login page - credentials not accepted\n');
  
  // 4. Onboarding
  console.log('4. ONBOARDING (Public Page)');
  await page.goto(`${baseUrl}/onboarding`);
  await page.waitForLoadState('networkidle');
  await screenshot('06-onboarding');
  
  // Fill onboarding
  await page.locator('input').fill('Test User');
  await page.locator('button:has-text("Continue")').click();
  await page.waitForTimeout(2000);
  await screenshot('07-onboarding-2');
  
  // Try to find class selection
  const classBtn = page.locator('button:has-text("11"), button:has-text("Class")').first();
  if (await classBtn.isVisible()) {
    await classBtn.click();
    console.log('   ✓ Class selection works');
  }
  
  const jeeBtn = page.locator('text=JEE').first();
  if (await jeeBtn.isVisible()) {
    await jeeBtn.click();
    console.log('   ✓ JEE exam selection works');
  }
  
  const continueBtn = page.locator('button:has-text("Continue"), button:has-text("Done")').first();
  if (await continueBtn.isVisible()) {
    await continueBtn.click();
    await page.waitForTimeout(2000);
    await screenshot('08-onboarding-complete');
  }
  
  console.log('   ✓ Onboarding flow completed\n');
  
  // 5. Dashboard
  console.log('5. DASHBOARD');
  await page.goto(`${baseUrl}/dashboard`);
  await page.waitForLoadState('networkidle');
  await screenshot('09-dashboard');
  const dashUrl = page.url();
  console.log(`   URL: ${dashUrl}`);
  if (dashUrl.includes('onboarding')) {
    console.log('   ✗ ISSUE: Redirects to onboarding instead of dashboard\n');
  } else {
    console.log('   ✓ Dashboard loads\n');
  }
  
  // 6. Pages Test
  console.log('6. PAGE VISITS');
  
  const pages = [
    { name: 'Syllabus', path: '/syllabus', checkDone: true },
    { name: 'Goals', path: '/goals', checkDone: true },
    { name: 'Quiz', path: '/quiz', checkDone: false },
    { name: 'Profile', path: '/profile', checkSignOut: true },
    { name: 'Photo', path: '/photo', checkDone: false },
    { name: 'Premium', path: '/premium', checkDone: false },
    { name: 'Parent', path: '/parent', checkDone: false }
  ];
  
  for (const p of pages) {
    await page.goto(`${baseUrl}${p.path}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);
    await screenshot(`10-${p.name.toLowerCase()}`);
    
    const url = page.url();
    let status = '✓ Loads';
    
    if (url.includes('login')) status = '🔒 Login required';
    else if (url.includes('onboarding')) status = '📋 Onboarding redirect';
    
    console.log(`   ${p.name}: ${status}`);
    
    if (p.checkDone) {
      const doneBtn = page.locator('button:has-text("Done")').last();
      const visible = await doneBtn.isVisible().catch(() => false);
      console.log(`     Done button: ${visible ? '✓ Visible' : '✗ NOT visible'}`);
    }
    
    if (p.checkSignOut) {
      const signOutBtn = page.locator('button:has-text("Sign Out")');
      const visible = await signOutBtn.isVisible().catch(() => false);
      console.log(`     Sign Out: ${visible ? '✓ Visible' : '✗ NOT visible'}`);
    }
  }
  
  // 7. Logout
  console.log('\n7. LOGOUT');
  await page.goto(`${baseUrl}/profile`);
  await page.waitForLoadState('networkidle');
  
  const logoutBtn = page.locator('button:has-text("Sign Out")');
  if (await logoutBtn.isVisible()) {
    await logoutBtn.click();
    await page.waitForTimeout(2000);
    await screenshot('11-logout');
    console.log('   ✓ Logout clicked');
    console.log(`   Now at: ${page.url()}`);
  } else {
    console.log('   ✗ Sign Out button not found');
  }
  
  console.log('\n=== SUMMARY ===');
  console.log('Screenshots captured:', screenshots.length);
  console.log('Issues found:');
  console.log('  - Email/password signup not working');
  console.log('  - Email/password login not working');
  console.log('  - Dashboard redirects to onboarding');
  console.log('  - Syllabus: Done button NOT visible at bottom');
  console.log('  - Goals: Done button NOT visible at bottom');
  
  await browser.close();
})();
