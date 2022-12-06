import LoginPage from '../page-objects/login.page';
import HeaderPage from '../page-objects/header.page';
import UserPage from '../page-objects/superAdmin/user.page';

import * as dotenv from 'dotenv';
dotenv.config();

const superAdminEmail = process.env.REACT_APP_SUPERADMIN_USER;
const superAdminPassword = process.env.REACT_APP_SUPERADMIN_PASSWORD;

describe('Testing SuperAdmin login functionality with Google Account', () => {
  beforeAll('Refresh and delete cache', () => {
    LoginPage.open();
  });
  it('Testing the opening of new tab to access with new account', async () => {
    await LoginPage.googleButton.click();
    await browser.pause(10000);
    await browser.switchWindow('Acceso: Cuentas de Google');
    await expect(browser).toHaveTitle('Acceso: Cuentas de Google');
  });
  it('Testing SuperAdmin role login with valid credentials', async () => {
    await LoginPage.login(superAdminEmail, superAdminPassword);
    await browser.switchWindow('Radium Admin');
    await expect(browser).toHaveUrlContaining('super-admin');
  });
});

describe('Testing display of elements on Superadmin homepage', () => {
  it('Testing welcome title', async () => {
    await expect(UserPage.userWelcomeTitle).toHaveTextContent('Bienvenido')
  });
  it('Testing SuperAdmin role login with valid credentials', async () => {
    await LoginPage.login(superAdminEmail, superAdminPassword);
    await browser.switchWindow('Radium Admin');
    await expect(browser).toHaveUrlContaining('super-admin');
  });
});