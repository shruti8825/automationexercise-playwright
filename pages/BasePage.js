const { expect } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto('https://automationexercise.com/');
  }

  async checkTitle(expectedTitle) {
    await expect(this.page).toHaveTitle('Automation Exercise');
  }
}

module.exports = { BasePage };
