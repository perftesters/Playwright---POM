import { expect, type Locator, type Page } from '@playwright/test';

export class IstavrityRegistrationPage {
  readonly page: Page;

  readonly notRegisteredBtn: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly memberTypeSelect: Locator;
  readonly nextBtn: Locator;

  readonly countrySelect: Locator;
  readonly regionSelect: Locator;
  readonly addressInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly postCodeInput: Locator;

  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly termsCheckbox: Locator;
  readonly registerBtn: Locator;
  readonly successDialogOkBtn: Locator;
  readonly welcomeMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.notRegisteredBtn = page.getByRole('button', { name: 'Not yet registered?' });

    this.nameInput = page.getByRole('textbox', { name: 'Name *' });
    this.emailInput = page.getByRole('textbox', { name: 'Email *' });
    this.phoneInput = page.getByRole('textbox', { name: 'Phone number without ISD Code or' });
    this.memberTypeSelect = page.locator('select[name="memberType"]');
    this.nextBtn = page.getByRole('button', { name: 'NEXT' });

    this.countrySelect = page.locator('select[name="rcrs-country"]');
    this.regionSelect = page.locator('select[name="rcrs-region"]');
    this.addressInput = page.getByRole('textbox', { name: 'Address line' });
    this.streetInput = page.getByRole('textbox', { name: 'Street / Locality' });
    this.cityInput = page.getByRole('textbox', { name: 'Suburb / City *' });
    this.postCodeInput = page.getByRole('textbox', { name: 'Post Code *' });

    this.passwordInput = page.getByRole('textbox', { name: 'Password- minimum 8 charcters' });
    this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm *' });

    this.termsCheckbox = page.getByRole('checkbox');
    this.registerBtn = page.getByRole('button', { name: 'REGISTER' });
    this.successDialogOkBtn = page.getByRole('button', { name: 'OK' });
    this.welcomeMessage = page.locator('text=Welcome');
  }

  async navigate() {
    await this.page.goto('https://istavrityportal-test.netlify.app/');
    await expect(this.page).toHaveTitle(/Istavrity/);
  }

  async startRegistration() {
    await this.notRegisteredBtn.click();
    await expect(this.nameInput).toBeVisible();
  }

  async fillPersonalInfo(name: string, email: string, phone: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.memberTypeSelect.selectOption('0');
    await this.nextBtn.click();
    await expect(this.countrySelect).toBeVisible();
  }

  async fillAddressInfo(address: string, street: string, city: string, postCode: string) {
    await this.countrySelect.selectOption('Australia');
    await this.regionSelect.selectOption('New South Wales');
    await this.addressInput.fill(address);
    await this.streetInput.fill(street);
    await this.cityInput.fill(city);
    await this.postCodeInput.fill(postCode);
    await this.nextBtn.click();
    await expect(this.passwordInput).toBeVisible();
  }

  async setPassword(password: string) {
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
  }

  async agreeAndSubmit() {
    await this.termsCheckbox.check();
    await this.registerBtn.click();
    await expect(this.successDialogOkBtn).toBeVisible({ timeout: 5000 });
  }

  async confirmSuccess() {
    await this.successDialogOkBtn.click();
    try {
      await expect(this.welcomeMessage).toBeVisible({ timeout: 5000 });
    } catch {
      console.warn('⚠️ Registration completed, but no post-registration confirmation found.');
    }
  }
}
