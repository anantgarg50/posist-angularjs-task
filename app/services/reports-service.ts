import { HeadquartersService } from './headquarters-service';
import { BranchesService } from './branches-service';
import { CarsService } from './cars-service';
import { DriversService } from './drivers-service';

interface Booking {
  _id?: string,
  customerName: string,
  carBooked: any,
  pickupAddress: string,
  startTime: string,
  branch: any,
  ratePerKilometer: number,
  driverDetails: any,
  hourlyRate: number,
  endTime: string,
  kmsTravelled: number,
  billedAmount: number
}

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
  bookings: any[],
  currentlyBooked: boolean
}

interface Branch {
  _id?: string,
  name: string,
  location: string,
  headquarter: any,
  cars: any[],
  bookings: any[]
}

interface Driver {
  _id?: string,
  name: string,
  age: number,
  permanentAddress: string,
  assignedCar: object,
  bookings: any[]
}

interface Headquarter {
  _id?: string,
  name: string,
  location: string,
  branches: object[]
}

export class ReportsService {
  static $inject = ['headquartersService', 'branchesService', 'carsService', 'driversService'];

  constructor(
    private headquartersService: HeadquartersService,
    private branchesService: BranchesService,
    private carsService: CarsService,
    private driversService: DriversService,
  ) { }

  generateHeadquartersRevenueReport() {
    const headquarters = this.headquartersService.getList().map(
      (headquarter: Headquarter) => {
        return [
          headquarter.name,
          headquarter.location,
          headquarter.branches.reduce((accumulator: number, current: Branch) => {
            accumulator += this.branchesService.get(
              current._id
            ).bookings.reduce((accumulator: number, current: Booking) => {
              accumulator += current.billedAmount;

              return accumulator;
            }, 0);

            return accumulator;
          }, 0)
        ];
      }
    );

    headquarters.sort((a: any, b: any) => b[2] - a[2]);

    return headquarters;
  }

  generateBranchesRevenueReport() {
    const branches = this.branchesService.getList().map(
      (branch: Branch) => {
        return [
          branch.name,
          branch.location,
          `${branch.headquarter.name} (${branch.headquarter.location})`,
          branch.bookings.reduce((accumulator: number, current: Booking) => {
            accumulator += current.billedAmount;

            return accumulator;
          }, 0)
        ];
      }
    );

    branches.sort((a: any, b: any) => b[3] - a[3]);

    return branches;
  }

  generateRentalCarsRevenueReport() {
    const cars = this.carsService.getList().map(
      (car: Car) => {
        return [
          car.carRegNumber,
          `${car.manufacturer} ${car.model}`,
          `${car.operatedBy.name} (${car.operatedBy.location})`,
          car.bookings.reduce((accumulator: number, current: Booking) => {
            accumulator += current.billedAmount;

            return accumulator;
          }, 0)
        ];
      }
    );

    cars.sort((a: any, b: any) => b[3] - a[3]);

    return cars;
  }

  generateCarDriversRevenueReport() {
    const drivers = this.driversService.getList().map(
      (driver: Driver) => {
        return [
          driver.name,
          driver.age,
          driver.bookings.reduce((accumulator: number, current: Booking) => {
            accumulator += current.billedAmount;

            return accumulator;
          }, 0)
        ];
      }
    );

    drivers.sort((a: any, b: any) => b[2] - a[2]);

    return drivers;
  }

  generateCarDriversHighestBookingsReport() {
    const drivers = this.driversService.getList().map(
      (driver: Driver) => {
        return [
          driver.name,
          driver.age,
          driver.bookings.length
        ];
      }
    );

    drivers.sort((a: any, b: any) => b[2] - a[2]);

    return drivers;
  }

  generateRentalCarsHighestBookingsReport() {
    const cars = this.carsService.getList().map(
      (car: Car) => {
        return [
          car.carRegNumber,
          `${car.manufacturer} ${car.model}`,
          `${car.operatedBy.name} (${car.operatedBy.location})`,
          car.bookings.length
        ];
      }
    );

    cars.sort((a: any, b: any) => b[3] - a[3]);

    return cars;
  }

  generateBranchesHighestBookingsReport() {
    const branches = this.branchesService.getList().map(
      (branch: Branch) => {
        return [
          branch.name,
          branch.location,
          `${branch.headquarter.name} (${branch.headquarter.location})`,
          branch.bookings.length
        ];
      }
    );

    branches.sort((a: any, b: any) => b[3] - a[3]);

    return branches;
  }

  generateCarDriversHighestKmsReport() {
    const drivers = this.driversService.getList().map(
      (driver: Driver) => {
        return [
          driver.name,
          driver.age,
          driver.bookings.reduce((accumulator: number, current: Booking) => {
            accumulator += current.kmsTravelled;

            return accumulator;
          }, 0)
        ];
      }
    );

    drivers.sort((a: any, b: any) => b[2] - a[2]);

    return drivers;
  }

  generateRentalCarsHighestKmsReport() {
    const cars = this.carsService.getList().map(
      (car: Car) => {
        return [
          car.carRegNumber,
          `${car.manufacturer} ${car.model}`,
          `${car.operatedBy.name} (${car.operatedBy.location})`,
          car.bookings.reduce((accumulator: number, current: Booking) => {
            accumulator += current.kmsTravelled;

            return accumulator;
          }, 0)
        ];
      }
    );

    cars.sort((a: any, b: any) => b[3] - a[3]);

    return cars;
  }
};

export default ReportsService;