/* eslint-disable no-undef */
import HeaderPage from './header.page';

class UserPage extends HeaderPage {
  // GETTERS
  get superAdminTitle() {
    return $('.users_welcomeMessage__rc+S- > h1');
  }

  // SETTERS
  // METHODS
}

export default new UserPage();
