export const CarsMain: angular.IComponentOptions = {
  template: `
    <div>
      <app-header></app-header>

      <section class="section">
        <div class="container">
          <p class="title has-text-centered">
            Rental Cars
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <form onsubmit="return createRentalCar()">
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <label class="label">Manufacturer</label>
                  <div class="control">
                    <input
                      id="__rental_cars_manufacturer"
                      class="input"
                      type="text"
                      required
                      placeholder="Car manufacturer Name"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label">Model</label>
                  <div class="control">
                    <input
                      id="__rental_cars_model"
                      class="input"
                      type="text"
                      required
                      placeholder="Car Model"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label">Driver Name</label>
                  <div class="control">
                    <div class="select">
                      <select id="__rental_cars_driven_by" required>
                        <option value="">Assign Driver...</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Operated By</label>
                  <div class="control">
                    <div class="select">
                      <select id="__rental_cars_operated_by" required>
                        <option value="">Select Branch Name...</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <label class="label">Seating Capacity</label>
                  <div class="control">
                    <input
                      id="__rental_cars_seating_capacity"
                      class="input"
                      type="number"
                      required
                      placeholder="Seating Capacity excluding Driver"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label">Cost(in ₹) Per KM</label>
                  <div class="control">
                    <input
                      id="__rental_cars_rate_per_kilometer"
                      class="input"
                      type="number"
                      required
                      placeholder="Cost(in ₹) Per KM"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label">Hourly Rate(in ₹)</label>
                  <div class="control">
                    <input
                      id="__rental_cars_hourly_rate"
                      class="input"
                      type="number"
                      required
                      placeholder="Hourly Rate(in ₹)"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label">Car Registration Number</label>
                  <div class="control">
                    <input
                      id="__rental_cars_reg_number"
                      class="input"
                      type="Text"
                      required
                      placeholder="Car Registration Number"
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
                <th scope="col">Registration No.</th>
                <th scope="col">Make/Model</th>
                <th scope="col">Seating Capacity</th>
                <th scope="col">Driver Name</th>
                <th scope="col">Cost(in ₹) Per KM</th>
                <th scope="col">Hourly Rate(in ₹)</th>
                <th scope="col">Operated By</th>
              </tr>
            </thead>
            <tbody id="__rental_cars_table"></tbody>
          </table>
        </div>
      </section>
    </div>
  `
};

export default CarsMain;