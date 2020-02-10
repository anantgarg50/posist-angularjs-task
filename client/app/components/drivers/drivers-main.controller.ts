import angular from 'angular';

import { DriversService } from '../../services/drivers-service';

interface Driver {
  _id?: string,
  name: string,
  age: number,
  permanentAddress: string,
  assignedCar: object,
  bookings: object[]
}

export class DriversMainController {
  static $inject = ['driversService'];

  public driversList: Driver[];
  public initialValue: Driver = {
    name: undefined,
    age: undefined,
    permanentAddress: undefined,
    assignedCar: undefined,
    bookings: []
  };
  public driver: Driver = angular.copy(this.initialValue);

  constructor(private driversService: DriversService) {
    this.driversList = driversService.getList();
  }

  createDriver(driverForm: angular.IFormController) {
    if (!driverForm.$valid) {
      return;
    }

    this.driversService.save(this.driver);

    this.resetForm(driverForm);
  }

  resetForm(driverForm: angular.IFormController) {
    driverForm.$setPristine();
    driverForm.$setUntouched();

    this.driver = angular.copy(this.initialValue);
  }
};

export default DriversMainController;