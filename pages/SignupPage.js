const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');
const { generateRandomUser, generateInvalidUser } = require('../utils/testData');

class SignupPage extends BasePage {
  constructor(page) {
    super(page);

    //verify user
    this.loggedInText = ':text("Logged in as")';

    // Navigation
    this.signupLoginBtn = ':text-is("Signup / Login")';

    // SIGNUP
    this.nameInput = '[name="name"]';
    this.emailInput = "[data-qa='signup-email']";
    this.signupSubmit = ':text-is("Signup")';
    this.accountInfoTitle = 'b:has-text("ENTER ACCOUNT INFORMATION")';

    // LOGIN  
    this.loginTitle = ':text("Login to your account")';
    this.loginEmail = '[data-qa="login-email"]';
    this.loginPassword = 'input[placeholder="Password"]';
    this.loginBtn = ':text-is("Login")';
    this.loginError = ':text("Your email or password is incorrect!")';

    // COMMON
    this.deleteAccountBtn = ':text-is("Delete Account")';
    this.accountDeleted = ':text("ACCOUNT DELETED!")';
    this.Logoutbutton = ':text-is("Logout")';

    // Form fields
    this.genderFemale = '#id_gender2';
    this.passwordInput = '#password';
    this.daySelect = '#days';
    this.monthSelect = '#months';
    this.yearSelect = '#years';
    this.newsletter = '#newsletter:visible';
    this.optin = '#optin:visible';
    this.firstName = '#first_name:visible';
    this.lastName = '#last_name:visible';
    this.company = 'input[id="company"]';
    this.address1 = '#address1:visible';
    this.address2 = '#address2:visible';
    this.country = '#country:visible';
    this.state = '#state';
    this.city = '#city';
    this.zipcode = '#zipcode';
    this.mobile = '#mobile_number';
    this.createBtn = 'button:has-text("Create Account")';
    this.accountCreated = ':text("ACCOUNT CREATED!")';
  }

  async signup(name, email) {
    await this.page.locator(this.signupLoginBtn).click();
    await this.page.locator(this.nameInput).fill(name);
    await this.page.locator(this.emailInput).fill(email);
    await this.page.locator(this.signupSubmit).click();
    await expect(this.page.locator(this.accountInfoTitle)).toBeVisible();
  }

  async login(email, password) {
    await this.page.locator(this.signupLoginBtn).click();
    await expect(this.page.locator(this.loginTitle)).toBeVisible();
    await this.page.locator(this.loginEmail).fill(email);
    await this.page.locator(this.loginPassword).fill(password);
    await this.page.locator(this.loginBtn).click();
  }

  async createRandomAccount() {
    const user = generateRandomUser();
    console.log('Generated:', user.username);
    await this.signup(user.username, user.email);
    await this.page.locator(this.passwordInput).fill(user.password);
    await this.fillAccountDetails();
    return user;
  }

  async createInvalidLogin() {
    const user = generateInvalidUser();
    console.log('Entered invalid crediantials:', user.invalidemail, user.invalidpassword);
    await this.login(user.invalidemail, user.invalidpassword);
    return user;
  }

  async fillAccountDetails() {
    await this.page.locator(this.genderFemale).click();
    await this.page.locator(this.daySelect).selectOption('16');
    await this.page.locator(this.monthSelect).selectOption('7');
    await this.page.locator(this.yearSelect).selectOption('2002');
    await this.page.locator(this.newsletter).click();
    await this.page.locator(this.optin).click();
    await this.page.locator(this.firstName).fill('shruti');
    await this.page.locator(this.lastName).fill('jangalgi');
    await this.page.locator(this.company).fill('parkar digital');
    await this.page.locator(this.address1).fill('pune');
    await this.page.locator(this.address2).fill('pune');
    await this.page.locator(this.country).selectOption('India');
    await this.page.locator(this.state).fill('maharashtra');
    await this.page.locator(this.city).fill('pune');
    await this.page.locator(this.zipcode).fill('411048');
    await this.page.locator(this.mobile).fill('96998037922');
    await this.page.locator(this.createBtn).click();
    await expect(this.page.locator(this.accountCreated)).toBeVisible();
    await this.page.locator('a:has-text("Continue")').click();
  }

  async verifyLoggedInAs(username) {
    await expect(this.page.locator(this.loggedInnText)).toContainText(username);
    console.log("verified");
  }

  async deleteAccount() {
    await this.page.locator(this.deleteAccountBtn).click();
    await expect(this.page.locator(this.accountDeleted)).toBeVisible();
    console.log("acc deleted");
  }

  async Logout() {
    await expect(this.page.locator(this.Logoutbutton)).toBeVisible();
    console.log('logout button visible...');
    await this.page.locator(this.Logoutbutton).click();
    console.log("clicked deleted button")
    await expect(this.page).toHaveURL('https://automationexercise.com/login');
    const currentUrl = this.page.url();
    console.log('Current URL:', currentUrl);

  }
}

module.exports = { SignupPage };
