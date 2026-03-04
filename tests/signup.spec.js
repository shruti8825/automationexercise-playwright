const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../pages/SignupPage');
const { getLatestUser } = require('../utils/testData');

  test('Test Case 1: Signup + save data', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    const user = await signupPage.createRandomAccount();
    await signupPage.verifyLoggedInAs(user.username);
  });

   test('Test Case 2: Login with saved data verify username and logout', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const user = getLatestUser();
    await signupPage.goto();
    await signupPage.login(user.email, user.password);
    await signupPage.verifyLoggedInAs(user.username);
    console.log('verified user' + user.username);
    await signupPage.Logout();
    console.log('user loggedout');
  });

   test(' Test Case 3: login with invalid data', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    const user = await signupPage.createInvalidLogin();
    await expect(page.locator(':text-is("Your email or password is incorrect!")')).toBeVisible();
    console.log('inavlid crediantials')
  });

   test('Test Case 4: Login with saved data and delete acc', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const user = getLatestUser();
    await signupPage.goto();
    await signupPage.login(user.email, user.password);
    await signupPage.verifyLoggedInAs(user.usernamee);
    await signupPage.deleteAccount();
  });

   

