const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('=== LOCAL TESTING ===\n');
  
  // Test login page
  console.log('1. Testing login page...');
  await page.goto(`${BASE_URL}/padhai/login`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'local-1-login.png' });
  
  // Login
  await page.fill('input[type="email"]', 'testuser100@local.com');
  await page.fill('input[type="password"]', 'testpass123');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'local-2-after-login.png' });
  console.log('   URL:', page.url());
  
  // Test dashboard
  await page.goto(`${BASE_URL}/padhai/dashboard`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'local-3-dashboard.png' });
  console.log('   Dashboard loaded');
  
  // Test Quiz - should show chapter selection now
  await page.goto(`${BASE_URL}/padhai/quiz`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'local-4-quiz.png' });
  
  // Check for chapter selection UI
  const hasChapterSelect = await page.$('text=Select Chapter');
  console.log('   Quiz chapter selection:', hasChapterSelect ? '✅' : '❌');
  
  // Test Goals
  await page.goto(`${BASE_URL}/padhai/goals`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'local-5-goals.png' });
  const goalsDone = await page.$('a:has-text("Done")');
  console.log('   Goals Done button:', goalsDone ? '✅' : '❌');
  
  // Test Syllabus
  await page.goto(`${BASE_URL}/padhai/syllabus`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'local-6-syllabus.png' });
  const syllabusDone = await page.$('a:has-text("Done")');
  console.log('   Syllabus Done button:', syllabusDone ? '✅' : '❌');
  
  // Test Profile
  await page.goto(`${BASE_URL}/padhai/profile`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'local-7-profile.png' });
  const signOut = await page.$('text=Sign Out');
  console.log('   Profile Sign Out:', signOut ? '✅' : '❌');
  
  console.log('\n=== CHECK SCREENSHOTS ===');
  await browser.close();
})();
