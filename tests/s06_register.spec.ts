import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { IstavrityRegistrationPage } from '../pages/s06_IstavrityRegistrationPage.ts';

test('Register a user on istavrityportal using POM', async ({ page }) => {
  const regPage = new IstavrityRegistrationPage(page);

  // Generate fake user data
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });

  const digits = faker.string.numeric(8);
  const phone = `4${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;

  const addressLine = faker.location.buildingNumber();
  const street = faker.location.street();
  const city = faker.location.city();
  const postCode = faker.location.zipCode('2###');

  const password = 'Test@123';

  console.log(`🧑 Generated user: ${firstName} ${lastName}, Email: ${email}, Phone: ${phone}`);

  // Use POM methods
  await regPage.navigate();
  await regPage.startRegistration();
  await regPage.fillPersonalInfo(`${firstName} ${lastName}`, email, phone);
  await regPage.fillAddressInfo(addressLine, street, city, postCode);
  await regPage.setPassword(password);
  await regPage.agreeAndSubmit();
  await regPage.confirmSuccess();
});
