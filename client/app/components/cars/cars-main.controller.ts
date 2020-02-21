import angular from 'angular';

import { CarsService } from '../../services/cars-service';
import { BranchesService } from '../../services/branches-service';
import { DriversService } from '../../services/drivers-service';
export class CarsMainController {
  static $inject = [
    '$scope',
    '$timeout',
    'carsService',
    'branchesService',
    'driversService'
  ];

  public carsList: Car[];
  public branchesList: Branch[];
  public unallocatedDriversList: Driver[];
  public initialValue: Car = {
    manufacturer: undefined,
    model: undefined,
    seatingCapacity: undefined,
    ratePerKilometer: undefined,
    hourlyRate: undefined,
    carRegNumber: undefined,
    operatedBy: undefined,
    drivenBy: undefined
  };
  public car: Car = angular.copy(this.initialValue);

  constructor(
    private $scope: ng.IScope,
    private $timeout: ng.ITimeoutService,
    private carsService: CarsService,
    private branchesService: BranchesService,
    private driversService: DriversService
  ) {
    this.populateCarsList();
    this.populateBranchesList();
    this.populateUnallocatedDriversList();
  }

  async populateCarsList() {
    this.$timeout(async () => {
      this.carsList = await this.carsService.getList();

      this.$scope.$digest();
    });
  }

  async populateBranchesList() {
    this.$timeout(async () => {
      this.branchesList = await this.branchesService.getList();

      this.$scope.$digest();
    });
  }

  async populateUnallocatedDriversList() {
    this.$timeout(async () => {
      this.unallocatedDriversList = await this.driversService.getList(false);

      this.$scope.$digest();
    });
  }

  async createCar(carForm: angular.IFormController) {
    if (!carForm.$valid) {
      return;
    }

    await this.carsService.create(this.car);

    this.resetForm(carForm);
    this.populateCarsList();
    this.populateUnallocatedDriversList();
  }

  resetForm(carForm: angular.IFormController) {
    carForm.$setPristine();
    carForm.$setUntouched();

    this.car = angular.copy(this.initialValue);
  }
};

export default CarsMainController;