/* eslint-disable no-undef */
import LoginPage from '../page-objects/login.page';
import HeaderPage from '../page-objects/header.page';
import * as dotenv from 'dotenv';
dotenv.config();

const superAdminEmail = process.env.REACT_APP_SUPERADMIN_USER;
const superAdminPassword = process.env.REACT_APP_SUPERADMIN_PASSWORD;

describe('SuperAdmin login functionality with Google Account', () => {
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
    await browser.switchWindow('React App');
    await expect(browser).toHaveUrlContaining('super-admin');
  });
  it('Testing Admin role login with valid credentials', async () => {
    await HeaderPage.logoutBtn.click();
    await expect(browser).toHaveUrlContaining('login');
  });
});
