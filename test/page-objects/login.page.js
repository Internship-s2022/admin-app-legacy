/* eslint-disable no-undef */
import Page from './page';

class LoginPage extends Page {
  /**
   * GETTERS
   */
  get radiumAdminLogo() {
    return $('[alt="radium logo"]');
  }
  get googleButton() {
    return $('[test-id="google-button"]');
  }
  get emailInput() {
    return $('#identifierId');
  }
  get emailNextBtn() {
    return $('#identifierNext');
  }
  get passwordInput() {
    return $('#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input');
  }
  get passwordNextBtn() {
    return $('#passwordNext');
  }
  /**
   * SETTERS
   */
  async setEmail(email) {
    await this.emailInput.setValue(email);
  }
  async setPassword(password) {
    await this.passwordInput.setValue(password);
  }
  /**
   * METHODS
   */
  async login(email, password) {
    await this.setEmail(email);
    await this.emailNextBtn.click();
    await this.setPassword(password);
    await this.passwordNextBtn.click();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open('login');
  }
}

export default new LoginPage();
