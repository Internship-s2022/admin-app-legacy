/* eslint-disable no-undef */
class UserPage {
  // GETTERS
  // Home items
  get userWelcomeTitle() {
    return $('[data-testid=userWelcomeTitle]');
  }
  get userSubtitle() {
    return $('[data-testid=userSubtitle]');
  }
  get addUserButton() {
    return $('[data-testid=addUserButton]');
  }
  // Add user modal items
  get userAccessRoleInput() {
    return $('[data-testid=access-role-dropdown]');
  }
  get userEmailInput() {
    return $('[data-testid=email-input]');
  }
  get userNameInput() {
    return $('[data-testid=first-name-input]');
  }
  get userLastNameInput() {
    return $('[data-testid=last-name-input]');
  }
  get userLocationInput() {
    return $('[data-testid=location-input]');
  }
  get userDateInput() {
    return $('[data-testid=date-input]');
  }
  get createUserConfirmBtn() {
    return $('[data-testid=submit-btn]');
  }
  get createUserCancelBtn() {
    return $('[data-testid=reset-btn]');
  }
  // METHODS
}

export default new UserPage();
