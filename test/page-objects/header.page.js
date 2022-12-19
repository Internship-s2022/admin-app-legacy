/* eslint-disable no-undef */
class HeaderPage {
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
    return $('[data-testid=logout-btn]');
  }
  get logoutModalConfirmationBtn() {
    return $('[data-testid=confirmBtn]');
  }
  get logoutModalCancelBtn() {
    return $('[data-testid=cancelBtn]');
  }
  // METHODS
}

export default new HeaderPage();
