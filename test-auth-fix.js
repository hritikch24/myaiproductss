const { chromium } = require('playwright');

const BASE_URL = 'https://kraftai.in';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('=== Testing Auth Fix ===\n');
  
  // Step 1: Go to login page
  console.log('1. Going to login page...');
  await page.goto(`${BASE_URL}/padhai/login`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'auth-test-1.png' });
  
  // Step 2: Click signup
  console.log('2. Clicking Sign up...');
  await page.click('button:has-text("Sign up")');
  await page.waitForTimeout(1000);
  
  // Step 3: Fill signup form
  console.log('3. Filling signup form...');
  await page.fill('input[autocomplete="name"]', 'Test User');
  await page.fill('input[type="email"]', 'testuser555@kraftai.in');
  await page.fill('input[type="password"]', 'testpass123');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'auth-test-2.png' });
  
  // Step 4: Submit
  console.log('4. Submitting signup...');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'auth-test-3.png' });
  
  console.log('URL after signup:', page.url());
  
  // Step 5: Check if signed in
  if (page.url().includes('/padhai/onboarding') || page.url().includes('/padhai/dashboard')) {
    console.log('✅ Signup + auto login worked!');
  } else if (page.url().includes('/padhai/login')) {
    console.log('5. Need to sign in manually...');
    await page.fill('input[type="email"]', 'testuser555@kraftai.in');
    await page.fill('input[type="password"]', 'testpass123');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'auth-test-4.png' });
    console.log('URL after login:', page.url());
  }
  
  // Step 6: Onboarding
  if (page.url().includes('/padhai/onboarding')) {
    console.log('6. Onboarding page - selecting options...');
    await page.click('button:has-text("11")');
    await page.waitForTimeout(500);
    await page.click('button:has-text("JEE")');
    await page.waitForTimeout(500);
    await page.fill('input[type="text"]', 'Test User');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'auth-test-5.png' });
    await page.click('button:has-text("Continue")');
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'auth-test-6.png' });
    console.log('URL after onboarding:', page.url());
  }
  
  // Step 7: Dashboard
  if (page.url().includes('/padhai/dashboard') || page.url().includes('/padhai/onboarding')) {
    console.log('7. Going to dashboard...');
    await page.goto(`${BASE_URL}/padhai/dashboard`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'auth-test-7.png' });
    console.log('Dashboard URL:', page.url());
  }
  
  // Step 8: Syllabus - check Done button
  console.log('8. Checking Syllabus page...');
  await page.goto(`${BASE_URL}/padhai/syllabus`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'auth-test-8.png' });
  const syllabusDoneBtn = await page.$('a:has-text("Done")');
  console.log('Syllabus Done button:', syllabusDoneBtn ? '✅ Found' : '❌ Not found');
  
  // Step 9: Goals - check Done button
  console.log('9. Checking Goals page...');
  await page.goto(`${BASE_URL}/padhai/goals`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'auth-test-9.png' });
  const goalsDoneBtn = await page.$('a:has-text("Done")');
  console.log('Goals Done button:', goalsDoneBtn ? '✅ Found' : '❌ Not found');
  
  console.log('\n=== Test Complete ===');
  console.log('Check screenshots: auth-test-*.png');
  
  await browser.close();
})();
