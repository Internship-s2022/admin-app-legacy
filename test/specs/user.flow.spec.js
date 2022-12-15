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
    await browser.pause(2000);
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

describe('# User flow # CREATE USER functionality', () => {
  it('Testing opening of modal to add a new user', async () => {
    await UserPage.addUserButton.click();
    await browser.pause(2000);
    await expect(UserPage.createUserCancelBtn).toBeDisplayed();
    await expect(UserPage.createUserConfirmBtn).toBeDisplayed();
  });
  it('Testing validation on adding a new user with empty fields', async () => {
    await UserPage.createUserConfirmBtn.click();
    await expect(UserPage.userEmailInputError).toHaveText('Este campo es requerido');
    await expect(UserPage.userNameInputError).toHaveText('Este campo es requerido');
    await expect(UserPage.userLastNameInputError).toHaveText('Este campo es requerido');
    await expect(UserPage.userLocationInputError).toHaveText('Este campo es requerido');
    await expect(UserPage.userDateInputError).toHaveText('Este campo es requerido');
  });
  it('Testing validation on adding a new user with invalid data', async () => {
    await UserPage.addUserForm('t3st@gmail.com', 'T3st', 'Super 4dmin', 'M0ntevideo.', '10102020');
    await UserPage.createUserConfirmBtn.click();
    await expect(UserPage.userEmailInputError).toHaveText('El formato del email no es válido');
    await expect(UserPage.userNameInputError).toHaveText('El nombre debe contener solo letras');
    await expect(UserPage.userLastNameInputError).toHaveText(
      'El apellido debe contener solo letras',
    );
    await expect(UserPage.userLocationInputError).toHaveText(
      'El formato de localidad no es válido',
    );
    await expect(UserPage.userDateInputError).toHaveText('El usuario debe ser mayor a 18 años');
  });
  it('Testing validation on adding a new user with incomplete data', async () => {
    await UserPage.createUserCancelBtn.click();
    await UserPage.addUserButton.click();
    await UserPage.addUserForm('tet', 'Te', 'Su', 'Mo', '1111111111');
    await UserPage.createUserConfirmBtn.click();
    await expect(UserPage.userEmailInputError).toHaveText('El formato del email no es válido');
    await expect(UserPage.userNameInputError).toHaveText(
      'El nombre debe contener al menos 3 letras',
    );
    await expect(UserPage.userLastNameInputError).toHaveText(
      'El apellido debe contener al menos 3 letras',
    );
    await expect(UserPage.userLocationInputError).toHaveText(
      'El nombre de la localidad debe tener al menos 3 letras',
    );
    await expect(UserPage.userDateInputError).toHaveText('El formato de fecha debe ser dd/mm/aaaa');
  });
  it('Testing validation on adding a new user with valid data', async () => {
    await UserPage.createUserCancelBtn.click();
    await UserPage.addUserButton.click();
    await UserPage.addUserForm(
      'test.newuser@radiumrocket.com',
      'Test',
      'New User',
      'San Luis',
      '01012000',
    );
    await UserPage.createUserConfirmBtn.click();
    await browser.pause(2000);
    await expect(UserPage.snackBarMessage).toHaveText('Usuario creado con éxito');
  });
});

// describe('# User flow # EDIT ROLE functionality', () => {
//   it('Testing opening of modal to add a new user', async () => {
//     await UserPage.addUserButton.click();
//     await browser.pause(2000);
//     await expect(UserPage.createUserCancelBtn).toBeDisplayed();
//     await expect(UserPage.createUserConfirmBtn).toBeDisplayed();
//   });
// });
