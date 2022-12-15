/* eslint-disable no-undef */
class UserPage {
  // GETTERS
  // Home items
  get userWelcomeTitle() {
    return $('[data-testid="user-welcome-title"]');
  }
  get userSubtitle() {
    return $('[data-testid="user-subtitle"]');
  }
  get addUserButton() {
    return $('[data-testid="add-user-button"]');
  }
  get inactiveFilterButton() {
    return $('[data-testid="inactive-filter-button"]');
  }
  get resetFiltersButton() {
    return $('[data-testid="reset-filter-button"]');
  }
  get searchbar() {
    return $('[data-testid="searchbar-input"]');
  }
  get orderByName() {
    return $('[data-testid="Nombre"]');
  }
  get orderByRole() {
    return $('[data-testid="Rol de acceso"]');
  }
  get deleteUserBtn() {
    return $('[data-testid="delete-button"]');
  }
  get editUserBtn() {
    return $('[data-testid="edit-button"]');
  }
  get snackBarMessage() {
    return $('[data-testid="snackbar"]> div:nth-child(2)');
  }
  // Add user modal elements
  get userAccessRoleInput() {
    return $('[data-testid=access-role-dropdown]');
  }
  get userEmailInput() {
    return $('[name="email"]');
  }
  get userNameInput() {
    return $('[name="firstName"]');
  }
  get userLastNameInput() {
    return $('[name="lastName"]');
  }
  get userLocationInput() {
    return $('[name="location"]');
  }
  get userDateInput() {
    return $('[name="birthDate"]');
  }
  get createUserConfirmBtn() {
    return $('[data-testid=submit-btn]');
  }
  get createUserCancelBtn() {
    return $('[data-testid=reset-btn]');
  }
  // Add user modal error elements
  get userEmailInputError() {
    return $('[data-testid="email-input"] p');
  }
  get userNameInputError() {
    return $('[data-testid="first-name-input"] p');
  }
  get userLastNameInputError() {
    return $('[data-testid="last-name-input"] p');
  }
  get userLocationInputError() {
    return $('[data-testid="location-input"] p');
  }
  get userDateInputError() {
    return $('[data-testid="date-input"] p');
  }
  // Edit role to user modal
  get managerAccessRoleBtn() {
    return $('[data-testid="accessManagerBtn"]');
  }
  get adminAccessRoleBtn() {
    return $('[data-testid="accessAdminBtn"]');
  }
  get employeeAccessRoleBtn() {
    return $('[data-testid="accessEmployeeBtn"]');
  }
  get confirmAccessRoleBtn() {
    return $('[data-testid="confirmAccessRoleBtn"]');
  }
  get cancelAccessRoleBtn() {
    return $('[data-testid="cancelAccessRoleBtn"]');
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
    await this.userDateInput.setValue(userBirthday);
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
