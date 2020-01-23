export const ReportsMain: angular.IComponentOptions = {
  template: `
    <div>
      <app-header></app-header>

      <section class="section">
        <div class="container">
          <p class="title has-text-centered">
            Reports
          </p>
        </div>
      </section>

      <section class="section">
        <form>
          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <label class="label">Select Report Type :-</label>
            </div>

            <div class="control">
              <div class="select is-small">
                <select onchange="generateRevenueReport(this)">
                  <option value="">Select ...</option>
                  <option value="headquartersRevenue"
                    >Headquarters Revenue</option
                  >
                  <option value="branchesRevenue">Branches Revenue</option>
                  <option value="rentalCarsRevenue">Rental Cars Revenue</option>
                  <option value="carDriversRevenue">Car Drivers Revenue</option>
                  <option value="carDriversHighestBookings"
                    >Car Drivers (Highest Bookings)</option
                  >
                  <option value="rentalCarsHighestBookings"
                    >Rental Cars (Highest Bookings)</option
                  >
                  <option value="branchesHighestBookings"
                    >Branches (Highest Bookings)</option
                  >
                  <option value="carDriversHighestKms"
                    >Car Drivers (Highest KMs Travelled)</option
                  >
                  <option value="rentalCarsHighestKms"
                    >Rental Cars (Highest KMs Travelled)</option
                  >
                </select>
              </div>
            </div>
          </div>
        </form>
      </section>

      <section class="section">
        <div class="table-container">
          <p class="title has-text-centered" id="__reports_table_title"></p>
          <table class="table is-bordered is-striped is-hoverable is-fullwidth">
            <thead id="__reports_table_head"></thead>
            <tbody id="__reports_table_body"></tbody>
          </table>
        </div>
      </section>
    </div>
  `
};

export default ReportsMain;