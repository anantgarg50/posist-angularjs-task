export const HomepageMain: angular.IComponentOptions = {
  template: `
    <div>
      <section class="section">
        <div class="container">
          <div
            class="columns is-multiline is-variable is-1-mobile is-2-tablet is-2-desktop"
          >
            <div class="is-3-desktop column is-6-tablet is-12-mobile">
              <a href="/headquarters">
                <div class="card has-background-primary card-item-clickable">
                  <div class="card-content">
                    <span class="title is-centered">Headquarters</span>
                    <span class="icon is-large is-pulled-right">
                      <i class="fas fa-2x fa-arrow-circle-right"></i>
                    </span>
                  </div>
                </div>
              </a>
            </div>
            <div class="is-3-desktop column is-6-tablet is-12-mobile">
              <a href="/branches">
                <div class="card has-background-info card-item-clickable">
                  <div class="card-content">
                    <span class="title is-centered">Branches</span>
                    <span class="icon is-large is-pulled-right">
                      <i class="fas fa-2x fa-arrow-circle-right"></i>
                    </span>
                  </div>
                </div>
              </a>
            </div>
            <div class="is-3-desktop column is-6-tablet is-12-mobile">
              <a href="/cars">
                <div class="card has-background-success card-item-clickable">
                  <div class="card-content">
                    <span class="title is-centered">Rental Cars</span>
                    <span class="icon is-large is-pulled-right">
                      <i class="fas fa-2x fa-arrow-circle-right"></i>
                    </span>
                  </div>
                </div>
              </a>
            </div>
            <div class="is-3-desktop column is-6-tablet is-12-mobile">
              <a href="/drivers">
                <div class="card has-background-warning card-item-clickable">
                  <div class="card-content">
                    <span class="title is-centered">Car Drivers</span>
                    <span class="icon is-large is-pulled-right">
                      <i class="fas fa-2x fa-arrow-circle-right"></i>
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div class="columns is-centered">
            <div class="column is-half">
              <a href="/reports">
                <div class="card has-background-grey-light card-item-clickable">
                  <div class="card-content">
                    <span class="title is-centered">Revenue Reports</span>
                    <span class="icon is-large is-pulled-right">
                      <i class="fas fa-2x fa-arrow-circle-right"></i>
                    </span>
                  </div>
                </div>
              </a>
            </div>

            <div class="column is-half">
              <a href="/bookings">
                <div class="card has-background-grey-lighter card-item-clickable">
                  <div class="card-content">
                    <span class="title is-centered">Bookings</span>
                    <span class="icon is-large is-pulled-right">
                      <i class="fas fa-2x fa-arrow-circle-right"></i>
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
};

export default HomepageMain;