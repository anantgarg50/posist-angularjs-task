export const DriversMain: angular.IComponentOptions = {
  template: `
    <div>
      <app-header></app-header>

      <section class="section">
        <div class="container">
          <p class="title has-text-centered">
            Car Drivers
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <form onsubmit="createCarDriver()">
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <label class="label">Name</label>
                  <div class="control">
                    <input
                      id="__car_drivers_name"
                      class="input"
                      type="text"
                      required
                      placeholder="Name"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label">Age</label>
                  <div class="control">
                    <input
                      id="__car_drivers_age"
                      class="input"
                      type="number"
                      required
                      placeholder="Age"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label">Permanent Address</label>
                  <div class="control">
                    <input
                      id="__car_drivers_permanent_address"
                      class="input"
                      type="text"
                      required
                      placeholder="Permanent Address"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-grouped is-grouped-right">
              <div class="control">
                <button class="button is-primary" type="submit">
                  Submit
                </button>
              </div>
              <div class="control">
                <button class="button is-light" type="reset">
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section class="section">
        <div class="table-container">
          <table class="table is-bordered is-striped is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th scope="col">S.N.</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Permanent Address</th>
                <th scope="col">Assigned Car</th>
              </tr>
            </thead>
            <tbody id="__car_drivers_table"></tbody>
          </table>
        </div>
      </section>
    </div>
  `
};

export default DriversMain;