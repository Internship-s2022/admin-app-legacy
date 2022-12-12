/* eslint-disable no-undef */
import LoginPage from '../page-objects/login.page';
import HeaderPage from '../page-objects/header.page';
import UserPage from '../page-objects/superAdmin/user.page';
import * as dotenv from 'dotenv';
dotenv.config();

const superAdminEmail = process.env.REACT_APP_SUPERADMIN_USER;
const superAdminPassword = process.env.REACT_APP_SUPERADMIN_PASSWORD;

describe('User flow log-in testing', () => {
  beforeAll('Refresh and delete cache', () => {
    LoginPage.open();
  });
  it('Testing the opening of new tab to access with new account', async () => {
    await LoginPage.googleButton.click();
    await browser.pause(5000);
    await browser.switchWindow('Acceso: Cuentas de Google');
    await expect(browser).toHaveTitle('Acceso: Cuentas de Google');
  });
  it('Testing SuperAdmin role login with valid credentials', async () => {
    await LoginPage.login(superAdminEmail, superAdminPassword);
    await browser.switchWindow('Radium Admin');
    await expect(browser).toHaveUrlContaining('super-admin');
  });
});

describe('User flow homepage elements display testing', () => {
  it('Testing the display of welcome title', async () => {
    await expect(UserPage.userWelcomeTitle).toHaveTextContaining('Bienvenido');
  });
  it('Testing the display of subtitle title', async () => {
    await expect(UserPage.userSubtitle).toHaveText(
      'Esta es la lista de usuarios, puedes asignarles el acceso que desees!',
    );
  });
  it('Testing the display and functionality of "+ Agregar nuevo usuario" button', async () => {
    await expect(UserPage.addUserButton).toBeDisplayed();
    await expect(UserPage.addUserButton).toBeEnabled();
  });
  it('Testing the display of the welcome title', async () => {
    await expect(UserPage.userWelcomeTitle).toHaveTextContaining('Bienvenido');
  });
});
