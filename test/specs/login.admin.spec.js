/* eslint-disable no-undef */
import LoginPage from '../page-objects/login.page';
import HeaderPage from '../page-objects/header.page';
import * as dotenv from 'dotenv';
dotenv.config();

const adminEmail = process.env.REACT_APP_ADMIN_USER;
const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

describe('Login page automated test', () => {
  beforeAll('Open browser', () => {
    LoginPage.open();
  });
  describe('Login page elements tests', () => {
    it('Testing browser URL', async () => {
      await expect(browser).toHaveUrlContaining('login');
    });
    it('Testing browser title', async () => {
      await expect(browser).toHaveTitle('Radium Admin');
    });
    it('Testing display of Radium Admin Logo', async () => {
      await expect(LoginPage.radiumAdminLogo).toBeDisplayed();
    });
    it('Testing display and state of Google Button ', async () => {
      await expect(LoginPage.googleButton).toBeEnabled();
    });
  });
  describe('Admin login functionality with Google Account', () => {
    it('Testing the opening of new tab to access with new account', async () => {
      await LoginPage.googleButton.click();
      await browser.pause(10000);
      await browser.switchWindow('Acceso: Cuentas de Google');
      await expect(browser).toHaveTitle('Acceso: Cuentas de Google');
    });
    it('Testing Admin role login with valid credentials', async () => {
      await LoginPage.login(adminEmail, adminPassword);
      await browser.pause(10000);
      await browser.switchWindow('React App');
      await expect(browser).toHaveUrlContaining('admin');
    });
    it('Testing Admin role login with valid credentials', async () => {
      await HeaderPage.logoutBtn.click();
      await expect(browser).toHaveUrlContaining('login');
    });
  });
});
