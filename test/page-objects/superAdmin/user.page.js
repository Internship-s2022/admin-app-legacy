/* eslint-disable no-undef */
class UserPage {
  // GETTERS
  // Home items
  get userWelcomeTitle() {
    return $('[data-testid=user-welcome-title]');
  }
  get userSubtitle() {
    return $('[data-testid=user-subtitle]');
  }
  get addUserButton() {
    return $('[data-testid=add-user-button]');
  }
  get inactiveFilterButton() {
    return $('[data-testid=inactive-filter-button]');
  }
  get resetFiltersButton() {
    return $('[data-testid=reset-filter-button]');
  }
  get searchbar() {
    return $('[data-testid=searchbar-input]');
  }
  get orderByName() {
    return $('[data-testid=Nombre]');
  }
  get orderByRole() {
    return $('[data-testid=Rol de acceso]');
  }
  get deleteUserBtn() {
    return $('[data-testid=delete-button]');
  }
  get editUserBtn() {
    return $('[data-testid=edit-button]');
  }
  // Add user modal elements
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
  // Add user modal error elements
  get userEmailInputError() {
    return $('[id=:r6:-helper-text]');
  }
  get userNameInputError() {
    return $('[id=:r7:-helper-text]');
  }
  get userLastNameInputError() {
    return $('[id=:r8:-helper-text]');
  }
  get userLocationInputError() {
    return $('[id=:r9:-helper-text]');
  }
  get userDateInputError() {
    return $('[id=:ra:-helper-text]');
  }
  // SETTERS
  async setUserEmail(userEmail) {
    await this.userEmailInput.setValue(userEmail);
  }
  async setUserName(userName) {
    await this.userNameInput.setValue(userName);
  }
  async setUserLastName(userLastName) {
    await this.userLastNameInput.setValue(userLastName);
  }
  async setUserLocation(userLocation) {
    await this.userLocationInput.setValue(userLocation);
  }
  async setUserBirthday(userBirthday) {
    await this.userBirthday.setValue(userBirthday);
  }
  // METHODS
  async addUserForm(userEmail, userName, userLastName, userLocation, userBirthday) {
    await this.setUserEmail(userEmail);
    await this.setUserName(userName);
    await this.setUserLastName(userLastName);
    await this.setUserLocation(userLocation);
    await this.setUserBirthday(userBirthday);
  }
}

export default new UserPage();
