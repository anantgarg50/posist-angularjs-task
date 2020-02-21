import angular from 'angular';

import { BookingsService } from '../../services/bookings-service';
import { DriversService } from '../../services/drivers-service';
import { BranchesService } from '../../services/branches-service';
import { CarsService } from '../../services/cars-service';

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

export class BookCarController {
  static $inject = ['bookingsService', 'carsService', 'branchesService', 'driversService'];

  public endBookingModalVisible: boolean = false;
  public bookingsList: Booking[];
  public endedBookings: Booking[];
  public currentBookings: Booking[];
  public branchesList: BranchesService[];
  public availableCars: object[];
  private bookingInitialValue: Booking = {
    customerName: undefined,
    carBooked: undefined,
    pickupAddress: undefined,
    startTime: undefined,
    branch: undefined,
    ratePerKilometer: undefined,
    driverDetails: undefined,
    hourlyRate: undefined,
    endTime: undefined,
    kmsTravelled: undefined,
    billedAmount: undefined
  };
  public booking: Booking = angular.copy(this.bookingInitialValue);
  private endBookingInitialValue: any = {
    _id: undefined,
    endTime: undefined,
    kmsTravelled: undefined
  };
  public endBooking: any = angular.copy(this.endBookingInitialValue);

  constructor(
    private bookingsService: BookingsService,
    private carsService: any,
    private branchesService: any,
    private driversService: any
  ) {
    this.bookingsList = bookingsService.getList();
    this.branchesList = branchesService.getList();
    this.setTableData();
  }

  setTableData() {
    this.endedBookings = this.bookingsList.filter((el: Booking) => el.endTime);
    this.currentBookings = this.bookingsList.filter((el: Booking) => !el.endTime);
  }

  createBooking(bookingForm: angular.IFormController) {
    if (!bookingForm.$valid) {
      return;
    }

    const car: Car = this.carsService.get(this.booking.carBooked);
    const branch: Branch = this.branchesService.get(this.booking.branch);
    const driver: Driver = this.driversService.get(car.drivenBy._id);

    this.booking.branch = {
      _id: branch._id,
      name: branch.name,
      location: branch.location
    };
    this.booking.carBooked = {
      _id: car._id,
      name: `${car.manufacturer} ${car.model}`,
      carRegNumber: car.carRegNumber
    }
    this.booking.ratePerKilometer = car.ratePerKilometer;
    this.booking.hourlyRate = car.hourlyRate;
    this.booking.driverDetails = angular.copy(car.drivenBy);
    const saved: Booking = this.bookingsService.save(this.booking);

    branch.bookings.push({
      _id: saved._id,
      customerName: saved.customerName,
      carBooked: saved.carBooked,
      driverDetails: saved.driverDetails,
      ratePerKilometer: saved.ratePerKilometer,
      hourlyRate: saved.hourlyRate,
      pickupAddress: saved.pickupAddress,
      startTime: saved.startTime
    });
    const bookedCarIndex: number = branch.cars.findIndex((el: Car) => el._id === car._id);
    branch.cars[bookedCarIndex].currentlyBooked = true;
    this.branchesService.update(branch._id, branch);

    car.currentlyBooked = true;
    car.bookings.push({
      _id: saved._id,
      customerName: saved.customerName,
      driverDetails: saved.driverDetails,
      ratePerKilometer: saved.ratePerKilometer,
      hourlyRate: saved.hourlyRate,
      pickupAddress: saved.pickupAddress,
      startTime: saved.startTime
    });
    this.carsService.update(car._id, car);

    driver.bookings.push({
      _id: saved._id,
      customerName: saved.customerName,
      carBooked: saved.carBooked,
      ratePerKilometer: saved.ratePerKilometer,
      hourlyRate: saved.hourlyRate,
      pickupAddress: saved.pickupAddress,
      startTime: saved.startTime,
      branch: saved.branch
    });
    this.driversService.update(driver._id, driver);

    this.resetForm(bookingForm);
    this.setTableData();
  }

  completeBooking(endBookingForm: angular.IFormController) {
    if (!endBookingForm.$valid) {
      return;
    }

    const booking: Booking = this.bookingsService.get(this.endBooking._id);
    const branch: Branch = this.branchesService.get(booking.branch._id);
    const car: Car = this.carsService.get(booking.carBooked._id);
    const driver: Driver = this.driversService.get(booking.driverDetails._id);

    booking.kmsTravelled = this.endBooking.kmsTravelled;
    booking.endTime = this.endBooking.endTime;
    booking.billedAmount = this.bookingsService.calculateBillAmount(
      booking.startTime,
      booking.endTime,
      booking.ratePerKilometer,
      booking.hourlyRate,
      booking.kmsTravelled
    );
    this.bookingsService.update(booking._id, booking);

    const bookedCarIndex: number = branch.cars.findIndex((el: Car) => el._id === car._id);
    branch.cars[bookedCarIndex].currentlyBooked = false;
    const branchBookingIndex = branch.bookings.findIndex((el: Booking) => el._id === booking._id);
    branch.bookings[branchBookingIndex].billedAmount = booking.billedAmount;
    branch.bookings[branchBookingIndex].endTime = booking.endTime;
    branch.bookings[branchBookingIndex].kmsTravelled = booking.kmsTravelled;
    this.branchesService.update(branch._id, branch);

    car.currentlyBooked = false;
    const carBookingIndex = car.bookings.findIndex((el: Booking) => el._id === booking._id);
    car.bookings[carBookingIndex].billedAmount = booking.billedAmount;
    car.bookings[carBookingIndex].endTime = booking.endTime;
    car.bookings[carBookingIndex].kmsTravelled = booking.kmsTravelled;
    this.carsService.update(car._id, car);

    const driverBookingIndex = driver.bookings.findIndex((el: Booking) => el._id === booking._id);
    driver.bookings[driverBookingIndex].billedAmount = booking.billedAmount;
    driver.bookings[driverBookingIndex].endTime = booking.endTime;
    driver.bookings[driverBookingIndex].kmsTravelled = booking.kmsTravelled;
    this.driversService.update(driver._id, driver);

    this.toggleEndBookingModal(endBookingForm);
    this.setTableData();
  }

  branchSelected() {
    const branch: Branch = this.branchesService.get(this.booking.branch);

    this.availableCars = branch.cars.filter((el: Car) => !el.currentlyBooked);
  }

  resetForm(form: angular.IFormController) {
    form.$setPristine();
    form.$setUntouched();

    if (form.$name === 'bookingForm') {
      this.booking = angular.copy(this.bookingInitialValue);
    } else {
      this.endBooking = angular.copy(this.endBookingInitialValue);
    }
  }

  toggleEndBookingModal(endBookingForm: angular.IFormController, _id?: String) {
    if (_id) {
      this.endBooking._id = _id;
    }

    this.endBookingModalVisible = !this.endBookingModalVisible;

    if (endBookingForm) {
      this.resetForm(endBookingForm);
    }
  }
};

export default BookCarController;