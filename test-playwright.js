const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext({
    recordVideo: {
        dir: 'videos'
    }
});    
  const page = await context.newPage();
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await page.fill ('#username', 'student');
  await page.fill ('#password', 'Password123');
  await page.click ('#submit');

  try {
    await page.waitForSelector('h1', { timeout: 5000 });
    const element = await page.$('h1');
    if (Text.includes('Logged In Successfully')){
      console.log('Login test passed: User is successfully logged in.');
    } else {
      console.log('Login test failed: Success message not found.');
    }
  } catch (error) {
    console.log('Login test failed: Element not found or timeout occurred.');
  }

// Negative Test Case: Invalid Username
await page.goto('https://practicetestautomation.com/practice-test-login/');
await page.fill ('#username', 'invalid_user');
await page.fill ('#password', 'Password123');
await page.click ('#submit');

try {
  await page.waitForSelector('#error', { timeout: 5000 });
  const element = await page.$('#error');
  const text = await element.textContext();
  if (text.includes('Your username is invalid!')) {
    console.log('Negative test for invalid username passed: Correct error message displayed');
  }
} catch (error) {
  console.log('Negative test for invalid username failed: Error message not found or timeout occurred. ');
  }

  // Negative Test Case: Invalid Password
  await page.goto('https://practicetestautomation.com/practice-test-login/');
await page.fill ('#username', 'student');
await page.fill ('#password', 'invalid_password');
await page.click ('#submit');

try {
  await page.waitForSelector('#error', { timeout: 5000 });
  const element = await page.$('#error');
  const text = await element.textContext();
  if (text.includes('Your username is invalid!')) {
    console.log('Negative test for invalid password passed: Correct error message displayed');
  }
} catch (error) {
  console.log('Negative test for invalid password failed: Error message not found or timeout occurred. ');
}


  // ---------------------
  await context.close();
  await browser.close();
})(); 