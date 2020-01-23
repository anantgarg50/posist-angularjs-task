export const BookingsMain: angular.IComponentOptions = {
  template: `
    <div>
      <app-header></app-header>

      <section class="section">
        <div class="container">
          <p class="title has-text-centered">
            Bookings
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <form onsubmit="return createBooking()">
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <label class="label">Customer Name</label>
                  <div class="control">
                    <input
                      id="__bookings_customer_name"
                      class="input"
                      type="text"
                      required
                      placeholder="Customer Name"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label">Pickup Address</label>
                  <div class="control">
                    <input
                      id="__bookings_pickup_address"
                      class="input"
                      type="text"
                      required
                      placeholder="Pickup Address"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <label class="label">Start Time</label>
                  <div class="control">
                    <input
                      id="__bookings_start_time"
                      class="input"
                      type="datetime-local"
                      required
                      placeholder="Booking Start Time"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label">Select Service</label>
                  <div class="control">
                    <div class="select">
                      <select id="__bookings_service" required>
                        <option value="">Select Service...</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Select Car</label>
                  <div class="field-body">
                    <div class="field is-grouped">
                      <div class="control">
                        <div class="select">
                          <select id="__bookings_car_booked" required>
                            <option value="">Select Car...</option>
                          </select>
                        </div>
                      </div>

                      <div class="control">
                        <button
                          class="button is-info"
                          type="button"
                          onclick="populateBookingCarsSelectOptions()"
                        >
                          Get Available Cars
                        </button>
                      </div>
                    </div>
                  </div>
                  <p class="help is-info">
                    Select service before getting available cars.
                  </p>
                </div>
                <!--
                <div class="field">
                  <label class="label">End Time</label>
                  <div class="control">
                    <input
                      id="__bookings_end_time"
                      class="input"
                      type="datetime-local"
                      required
                      placeholder="Booking End Time"
                    />
                  </div>
                  <p class="help">
                    A Late penalty will be charged, if end time is on the next
                    date.*
                  </p>
                  <p class="help">
                    *
                    <span class="has-text-weight-semibold">
                      Hourly Rate of the car rented x Extra hours
                    </span>
                    OR
                    <span class="has-text-weight-semibold"> ₹1000 </span>,
                    whichever is higher.
                  </p>
                </div>

                <div class="field">
                  <label class="label">KMs Travelled</label>
                  <div class="control">
                    <input
                      id="__bookings_kms_travelled"
                      class="input"
                      type="number"
                      required
                      placeholder="Total KMs Travelled"
                    />
                  </div>
                  <p class="help">
                    Min. of 250 KMs will be charged.
                  </p>
                </div>
                -->
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
          <p class="title has-text-centered">
            Current Bookings
          </p>
          <table class="table is-bordered is-striped is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th scope="col">S.N.</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Service Used</th>
                <th scope="col">Car Booked</th>
                <th scope="col">Driver</th>
                <th scope="col">Pickup Address</th>
                <th scope="col">Start Time</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody id="__bookings_current_bookings_table"></tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="table-container">
          <p class="title has-text-centered">
            Ended Bookings
          </p>
          <table class="table is-bordered is-striped is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th scope="col">S.N.</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Service Used</th>
                <th scope="col">Car Booked</th>
                <th scope="col">Driver</th>
                <th scope="col">Pickup Address</th>
                <th scope="col">Start Time</th>
                <th scope="col">End Time</th>
                <th scope="col">KMs Travelled</th>
                <th scope="col">Billed Amount(in ₹)</th>
              </tr>
            </thead>
            <tbody id="__bookings_ended_bookings_table"></tbody>
          </table>
        </div>
      </section>

      <div id="__bookings_end_booking_form_modal" class="modal">
        <div class="modal-background" onclick="closeEndBookingFormModal()"></div>
        <div class="modal-content">
          <div class="box">
            <form
              id="__bookings_end_booking_form"
              onsubmit="return completeBooking()"
            >
              <div class="field is-horizontal">
                <div class="field-body">
                  <div class="field">
                    <label class="label">End Time</label>
                    <div class="control">
                      <input
                        id="__bookings_end_time"
                        class="input"
                        type="datetime-local"
                        required
                        placeholder="Booking End Time"
                      />
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">KMs Travelled</label>
                    <div class="control">
                      <input
                        id="__bookings_kms_travelled"
                        class="input"
                        type="number"
                        required
                        placeholder="Total KMs Travelled"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="field is-grouped is-grouped-right">
                <div class="control">
                  <button class="button is-primary" type="submit">
                    End Ride
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
        </div>
        <button
          class="modal-close is-large"
          onclick="closeEndBookingFormModal()"
          aria-label="close"
        ></button>
      </div>
    </div>
  `
};

export default BookingsMain;