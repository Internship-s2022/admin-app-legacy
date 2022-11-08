/* eslint-disable no-undef */
import LoginPage from './login.page';

class HeaderPage extends LoginPage {
  // GETTERS
  get radiumAdminHeaderBrand() {
    return $('.header_brand__mLo60');
  }
  get dashboardTab() {
    return $('=Dashboard');
  }
  get employeeTab() {
    return $('=Employees');
  }
  get projectsTab() {
    return $('=Projects');
  }
  get clientsTab() {
    return $('=Clients');
  }
  get logoutBtn() {
    return $('.header_logout__tj6A7 > svg');
  }

  // METHODS
}

export default new HeaderPage();
