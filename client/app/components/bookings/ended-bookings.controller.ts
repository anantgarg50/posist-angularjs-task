import { BookingsService } from '../../services/bookings-service';

export class EndedBookingsController {
  static $inject = ['$scope', '$timeout', 'bookingsService'];

  public endedBookings: Booking[];
  public currentBookings: Booking[];

  constructor(
    private $scope: ng.IScope,
    private $timeout: ng.ITimeoutService,
    private bookingsService: BookingsService,
  ) {
    this.populateCurrentBookings();
    this.populateEndedBookings();
  }

  populateCurrentBookings() {
    this.$timeout(async () => {
      this.currentBookings = await this.bookingsService.getCurrentBookings();

      this.$scope.$digest();
    });
  }

  populateEndedBookings() {
    this.$timeout(async () => {
      this.endedBookings = await this.bookingsService.getEndedBookings();

      this.$scope.$digest();
    });
  }
};

export default EndedBookingsController;