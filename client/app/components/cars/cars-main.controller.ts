import angular from 'angular';

import { CarsService } from '../../services/cars-service';
import { BranchesService } from '../../services/branches-service';
import { DriversService } from '../../services/drivers-service';

interface Car {
  _id?: string,
  operatedBy: any,
  drivenBy: any,
  manufacturer: string,
  model: string,
  seatingCapacity: number,
  ratePerKilometer: number,
  hourlyRate: number,
  carRegNumber: string,
  bookings: object[],
  currentlyBooked: boolean
}

interface Branch {
  _id?: string,
  name: string,
  location: string,
  headquarter: any,
  cars: object[],
  bookings: object[]
}

interface Driver {
  _id?: string,
  name: string,
  age: number,
  permanentAddress: string,
  assignedCar: object,
  bookings: object[]
}

export class CarsMainController {
  static $inject = ['carsService', 'branchesService', 'driversService'];

  public carsList: Car[];
  public branchesList: BranchesService[];
  public driversList: Driver[];
  public initialValue: Car = {
    manufacturer: undefined,
    model: undefined,
    seatingCapacity: undefined,
    ratePerKilometer: undefined,
    hourlyRate: undefined,
    carRegNumber: undefined,
    operatedBy: undefined,
    drivenBy: undefined,
    bookings: [],
    currentlyBooked: false
  };
  public car: Car = angular.copy(this.initialValue);

  constructor(
    private carsService: CarsService,
    private branchesService: BranchesService,
    private driversService: DriversService
  ) {
    this.carsList = carsService.getList();
    this.branchesList = branchesService.getList();
    this.driversList = driversService.getList().filter((el: Driver) => !el.assignedCar);
  }

  createCar(carForm: angular.IFormController) {
    if (!carForm.$valid) {
      return;
    }

    const branch: Branch = this.branchesService.get(this.car.operatedBy);
    const driver: Driver = this.driversService.get(this.car.drivenBy);

    this.car.drivenBy = {
      _id: driver._id,
      name: driver.name
    };
    this.car.operatedBy = {
      _id: branch._id,
      name: branch.name,
      location: branch.location
    };
    const saved: Car = this.carsService.save(this.car);

    driver.assignedCar = {
      _id: saved._id,
      name: `${saved.manufacturer} ${saved.model}`,
      carRegNumber: saved.carRegNumber,
      operatedBy: saved.operatedBy
    };
    this.driversService.update(driver._id, driver);

    branch.cars.push({
      _id: saved._id,
      name: `${saved.manufacturer} ${saved.model}`,
      carRegNumber: saved.carRegNumber,
      drivenBy: saved.drivenBy,
      currentlyBooked: saved.currentlyBooked
    });
    this.branchesService.update(branch._id, branch);

    this.resetForm(carForm);
  }

  resetForm(carForm: angular.IFormController) {
    carForm.$setPristine();
    carForm.$setUntouched();

    this.car = angular.copy(this.initialValue);
  }
};

export default CarsMainController;