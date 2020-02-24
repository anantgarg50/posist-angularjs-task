import angular from 'angular';

import { BookingsService } from '../../services/bookings-service';
import { BranchesService } from '../../services/branches-service';
import { CarsService } from '../../services/cars-service';
import { UserService } from '../../services/user-service';

export class BookCarController {
  static $inject = [
    '$scope',
    '$timeout',
    'bookingsService',
    'branchesService',
    'carsService',
    'userService'
  ];

  public endBookingModalVisible: boolean = false;
  public userBookings: Booking[];
  public currentBookings: Booking[];
  public endedBookings: Booking[];
  public branchesList: Branch[];
  public availableCars: Car[];
  private bookingInitialValue: Booking = {
    carBooked: undefined,
    pickupAddress: undefined,
    startTime: undefined,
    branch: undefined,
  };
  public booking: Booking = angular.copy(this.bookingInitialValue);
  private endBookingInitialValue: Booking = {
    _id: undefined,
    endTime: undefined,
    kmsTravelled: undefined
  };
  public endBooking: any = angular.copy(this.endBookingInitialValue);

  constructor(
    private $scope: ng.IScope,
    private $timeout: ng.ITimeoutService,
    private bookingsService: BookingsService,
    private branchesService: BranchesService,
    private carsService: CarsService,
    private userService: UserService
  ) {
    this.populateUserBookings();
    this.populateBranches();
  }

  populateUserBookings() {
    this.$timeout(async () => {
      this.userBookings = await this.userService.getBookings();

      this.currentBookings = this.userBookings.filter((el: Booking) => !el.endTime);
      this.endedBookings = this.userBookings.filter((el: Booking) => el.endTime);

      this.$scope.$digest();
    });
  }

  populateBranches() {
    this.$timeout(async () => {
      this.branchesList = await this.branchesService.getList();

      this.$scope.$digest();
    });
  }

  populateAvailableCars(branchId: string) {
    if (!branchId) {
      return;
    }

    this.$timeout(async () => {
      this.availableCars = await this.carsService.getAvailableCars(branchId);

      this.$scope.$digest();
    });
  }

  async createBooking(bookingForm: angular.IFormController) {
    if (!bookingForm.$valid) {
      return;
    }

    await this.bookingsService.create(this.booking);

    this.resetForm(bookingForm);
    this.populateUserBookings();
    this.populateBranches();
  }

  async completeBooking(endBookingForm: angular.IFormController) {
    if (!endBookingForm.$valid) {
      return;
    }

    await this.bookingsService.completeBooking(this.endBooking);

    this.toggleEndBookingModal(endBookingForm);
    this.populateUserBookings();
    this.populateBranches();
  }

  branchSelected() {
    this.populateAvailableCars(this.booking.branch);
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
    } else {
      this.endBooking._id = null;
    }

    this.endBookingModalVisible = !this.endBookingModalVisible;

    if (endBookingForm) {
      this.resetForm(endBookingForm);
    }
  }
};

export default BookCarController;