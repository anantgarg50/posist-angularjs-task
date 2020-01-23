export const HeadquartersMain: angular.IComponentOptions = {
  template: `
    <div>
      <app-header></app-header>
      
      <section class="section">
        <div class="container">
          <p class="title has-text-centered">
            Headquarters
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <form onsubmit="return createHeadquarter()">
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <label class="label">Name</label>
                  <div class="control">
                    <input
                      id="__headquarters_name"
                      class="input"
                      type="text"
                      required
                      placeholder="Headquarter Name"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label">Location</label>
                  <div class="control">
                    <input
                      id="__headquarters_location"
                      class="input"
                      type="text"
                      required
                      placeholder="Headquarter location"
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
                <th scope="col">Location</th>
                <th scope="col">No. of Operational Branches</th>
              </tr>
            </thead>
            <tbody id="__headquarters_table"></tbody>
          </table>
        </div>
      </section>
    </div>
  `
};

export default HeadquartersMain;