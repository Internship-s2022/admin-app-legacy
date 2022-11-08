/* eslint-disable no-undef */
import LoginPage from '../page-objects/login.page';
import * as dotenv from 'dotenv';
dotenv.config();

const adminEmail = process.env.REACT_APP_ADMIN_USER;
const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

describe('Login page elements', () => {
  it('Testing browser URL', async () => {
    await LoginPage.open();
    await expect(browser).toHaveUrl('https://test.admin.app.radiumrocket.com/login');
  });
  it('Testing browser URL', async () => {
    await LoginPage.open();
    await expect(browser).toHaveTitle('React App');
  });
  it('Testing display of Radium Admin', async () => {
    await LoginPage.open();
    await expect(LoginPage.radiumAdminLogo).toBeDisplayed();
  });
  it('Testing display of Google Button ', async () => {
    await LoginPage.open();
    await expect(LoginPage.googleButton).toBeEnabled();
  });
});

describe('Login functionality with Google Account', () => {
  it('Testing the opening of new tab to access with new account', async () => {
    await LoginPage.googleButton.click();
    await browser.pause(10000);
    await browser.switchWindow('Acceso: Cuentas de Google');
    await expect(browser).toHaveTitle('Acceso: Cuentas de Google');
  });
  it('Testing login with valid credentials', async () => {
    await LoginPage.login(adminEmail, adminPassword);
    await browser.switchWindow('React App');
    await expect(browser).toHaveTitle('React App');
  });
});
