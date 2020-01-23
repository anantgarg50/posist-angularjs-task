export const BranchesMain: angular.IComponentOptions = {
  template: `
    <div>
      <app-header></app-header>

      <section class="section">
        <div class="container">
          <p class="title has-text-centered">
            Branches
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <form onsubmit="return createBranch()">
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <label class="label">Name</label>
                  <div class="control">
                    <input
                      id="__branches_name"
                      class="input"
                      type="text"
                      required
                      placeholder="Branch Name"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label">Location</label>
                  <div class="control">
                    <input
                      id="__branches_location"
                      class="input"
                      type="text"
                      required
                      placeholder="Branch location"
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label">Headquarter Name</label>
                  <div class="control">
                    <div class="select">
                      <select id="__branches_headquarter" required>
                        <option value="">Select Headquarter...</option>
                      </select>
                    </div>
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
                <th scope="col">Headquarter</th>
                <th scope="col">No. of Operational Cars</th>
              </tr>
            </thead>
            <tbody id="__branches_table"></tbody>
          </table>
        </div>
      </section>
    </div>
  `
};

export default BranchesMain;