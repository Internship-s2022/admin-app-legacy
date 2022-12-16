/* eslint-disable no-undef */
import LoginPage from '../page-objects/login.page';
import UserPage from '../page-objects/superAdmin/user.page';
import HeaderPage from '../page-objects/header.page';
import * as dotenv from 'dotenv';
import { userEmail } from '../utils/helper';
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
    await UserPage.addUserForm(userEmail, 'Test', 'New User', 'San Luis', '01012000');
    await UserPage.createUserConfirmBtn.click();
    await browser.pause(2000);
    await expect(UserPage.snackBarMessage).toHaveText('Usuario creado con éxito');
  });
});

describe('# User flow # EDIT ROLE functionality', () => {
  it('Testing opening of modal to change the access role of an existing user', async () => {
    await UserPage.editUserBtn.click();
    await browser.pause(2000);
    await expect(UserPage.managerAccessRoleBtn).toBeDisplayed();
    await expect(UserPage.adminAccessRoleBtn).toBeDisplayed();
    await expect(UserPage.employeeAccessRoleBtn).toBeDisplayed();
    await expect(UserPage.confirmAccessRoleBtn).toBeDisplayed();
    await expect(UserPage.cancelAccessRoleBtn).toBeDisplayed();
  });
  it('Testing editing the access role of an existing user', async () => {
    await UserPage.managerAccessRoleBtn.click();
    await browser.pause(1000);
    await UserPage.confirmAccessRoleBtn.click();
    await browser.pause(1000);
    await expect(UserPage.snackBarMessage).toHaveText('Usuario editado con éxito.');
    await UserPage.editUserBtn.click();
    await UserPage.adminAccessRoleBtn.click();
    await UserPage.confirmAccessRoleBtn.click();
  });
});

describe('# User flow # LOGICAL DELETE functionality', () => {
  it('Testing opening of modal to disable an user', async () => {
    await UserPage.deleteUserBtn.click();
    await browser.pause(1000);
    await expect(UserPage.deleteUserModalTitle).toBeDisplayed();
    await expect(UserPage.deleteUserModalDescription).toBeDisplayed();
    await expect(UserPage.deleteUserModalCancelBtn).toBeDisplayed();
    await expect(UserPage.deleteUserModalConfirmBtn).toBeDisplayed();
  });
  it('Testing elements on modal', async () => {
    await expect(UserPage.deleteUserModalTitle).toHaveText('Eliminar Usuario');
    await expect(UserPage.deleteUserModalDescription).toHaveTextContaining(
      '¿Desea eliminar al usuario Samuel Trillo?',
    );
    await expect(UserPage.deleteUserModalCancelBtn).toBeClickable();
    await expect(UserPage.deleteUserModalConfirmBtn).toBeClickable();
  });
  it('Testing deleting an user', async () => {
    await UserPage.deleteUserModalConfirmBtn.click();
    await expect(UserPage.snackBarMessage).toHaveText('Usuario eliminado con éxito.');
  });
  it('Testing SuperAdmin role logout', async () => {
    await HeaderPage.logoutBtn.click();
    await HeaderPage.logoutModalConfirmationBtn.click();
    await expect(browser).toHaveUrlContaining('login');
  });
});

//
// describe('# User flow # SearchBar and filters functionalities', () => {
//   it('Testing display of searchbar & filter buttons', async () => {
//     await UserPage.deleteUserBtn.click();
//     await browser.pause(1000);
//     await expect(UserPage.deleteUserModalTitle).toBeDisplayed();
//     await expect(UserPage.deleteUserModalDescription).toBeDisplayed();
//     await expect(UserPage.deleteUserModalCancelBtn).toBeDisplayed();
//     await expect(UserPage.deleteUserModalConfirmBtn).toBeDisplayed();
//   });
//   it('Testing elements on modal', async () => {
//     await expect(UserPage.deleteUserModalTitle).toHaveText('Eliminar Usuario');
//     await expect(UserPage.deleteUserModalDescription).toHaveTextContent(
//       '¿Desea eliminar al usuario?',
//     );
//     await expect(UserPage.deleteUserModalCancelBtn).toBeClickable();
//     await expect(UserPage.deleteUserModalConfirmBtn).toBeClickable();
//   });
//   it('Testing deleting an user', async () => {
//     await UserPage.deleteUserModalConfirmBtn.click();
//     await expect(UserPage.snackBarMessage).toHaveText('Usuario eliminado con éxito.');
//   });
// });
