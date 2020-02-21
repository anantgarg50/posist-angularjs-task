import angular from 'angular';

import { DriversService } from '../../services/drivers-service';

export class DriversMainController {
  static $inject = ['$scope', '$timeout', 'driversService'];

  public driversList: Driver[];
  public initialValue: Driver = {
    name: undefined,
    age: undefined,
    permanentAddress: undefined
  };
  public driver: Driver = angular.copy(this.initialValue);

  constructor(
    private $scope: ng.IScope,
    private $timeout: ng.ITimeoutService,
    private driversService: DriversService
  ) {
    this.populateDriversList();
  }

  populateDriversList() {
    this.$timeout(async () => {
      this.driversList = await this.driversService.getList();

      this.$scope.$digest();
    });
  }

  async createDriver(driverForm: angular.IFormController) {
    if (!driverForm.$valid) {
      return;
    }

    await this.driversService.create(this.driver);

    this.resetForm(driverForm);
    this.populateDriversList();
  }

  resetForm(driverForm: angular.IFormController) {
    driverForm.$setPristine();
    driverForm.$setUntouched();

    this.driver = angular.copy(this.initialValue);
  }
};

export default DriversMainController;