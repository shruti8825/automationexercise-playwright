const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../pages/SignupPage');
const { getLatestUser } = require('../utils/testData');


 test('Test case 1 : open website and fetch all <p>', async ({page}) => {
      const signupPage = new SignupPage(page);
      await signupPage.goto();
      await page.waitForLoadState('networkidle');
     const dressnames = await page.locator(".productinfo.text-center p").allTextContents();
      console.log('All product names:', dressnames);
  });

  test('Test Case 2: Signup + save data', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    const user = await signupPage.createRandomAccount();
    await signupPage.verifyLoggedInAs(user.username);
  });

   test('Test Case 3: Login with saved data verify username and logout', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const user = getLatestUser();
    await signupPage.goto();
    await signupPage.login(user.email, user.password);
    await signupPage.verifyLoggedInAs(user.username);
    console.log('verified user' + user.username);
    await signupPage.Logout();
    console.log('user loggedout');
  });

   test(' Test Case 4: login with invalid data', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    const user = await signupPage.createInvalidLogin();
    await expect(page.locator(':text-is("Your email or password is incorrect!")')).toBeVisible();
    console.log('inavlid crediantials')
  });

  //  test('Test Case 5: Login with saved data and delete acc', async ({ page }) => {
  //   const signupPage = new SignupPage(page);
  //   const user = getLatestUser();
  //   await signupPage.goto();
  //   await signupPage.login(user.email, user.password);
  //   await signupPage.verifyLoggedInAs(user.username);
  //   await signupPage.deleteAccount();
  // });

 

   

