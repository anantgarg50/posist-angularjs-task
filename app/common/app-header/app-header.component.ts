export const AppHeader: angular.IComponentOptions = {
  template: `
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="__main_navbar">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="__main_navbar" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" href="/">
            Home
          </a>

          <a class="navbar-item" href="/headquarters">
            Headquarters
          </a>

          <a class="navbar-item" href="/branches">
            Branches
          </a>

          <a class="navbar-item" href="/cars">
            Rental Cars
          </a>

          <a class="navbar-item" href="/drivers">
            Car Drivers
          </a>

          <a class="navbar-item" href="/bookings">
            Bookings
          </a>

          <a class="navbar-item" href="/reports">
            Reports
          </a>
        </div>
      </div>
    </nav>
  `
};

export default AppHeader;