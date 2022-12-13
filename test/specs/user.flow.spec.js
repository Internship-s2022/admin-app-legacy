/* eslint-disable no-undef */
import LoginPage from '../page-objects/login.page';
import UserPage from '../page-objects/superAdmin/user.page';
import * as dotenv from 'dotenv';
dotenv.config();

const superAdminEmail = process.env.REACT_APP_SUPERADMIN_USER;
const superAdminPassword = process.env.REACT_APP_SUPERADMIN_PASSWORD;

describe('# User flow # log-in testing', () => {
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

describe('# User flow # homepage elements display testing', () => {
  it('Testing display of welcome title', async () => {
    await expect(UserPage.userWelcomeTitle).toHaveTextContaining('Bienvenido');
  });
  it('Testing display of subtitle title', async () => {
    await expect(UserPage.userSubtitle).toHaveText(
      'Esta es la lista de usuarios, puedes asignarles el acceso que desees!',
    );
  });
  it('Testing display and functionality of "+ Agregar nuevo usuario" button', async () => {
    await expect(UserPage.addUserButton).toBeDisplayed();
    await expect(UserPage.addUserButton).toBeEnabled();
  });
  it('Testing display of searchbar', async () => {
    await expect(UserPage.searchbar).toBeDisplayed();
    await expect(UserPage.searchbar).toBeEnabled;
  });
  it('Testing display of inactive filter button', async () => {
    await expect(UserPage.inactiveFilterButton).toBeDisplayed();
    await expect(UserPage.inactiveFilterButton).toBeEnabled();
  });
  it('Testing display of reset filter button', async () => {
    await expect(UserPage.resetFiltersButton).toBeDisplayed();
    await expect(UserPage.resetFiltersButton).toBeEnabled();
  });
  it('Testing display of delete user button', async () => {
    await expect(UserPage.deleteUserBtn).toBeDisplayed();
    await expect(UserPage.deleteUserBtn).toBeEnabled();
  });
  it('Testing display of edit user button', async () => {
    await expect(UserPage.editUserBtn).toBeDisplayed();
    await expect(UserPage.editUserBtn).toBeEnabled();
  });
});

describe('# User flow # CRUD functionality', () => {
  it('Testing opening of modal to add a new user', async () => {
    await UserPage.addUserButton.click();
    await expect(UserPage.createUserCancelBtn).toBeDisplayed();
  });
});
