import { StorageService } from './storage-service';

export class BookingsService {
  static $inject = ['storageService'];

  private DB_NAME = 'bookings';

  constructor(private storageService: StorageService) {
    const data = storageService.getAll(this.DB_NAME);

    if (!Array.isArray(data)) {
      storageService.setAll(this.DB_NAME, []);
    }
  }

  save(data: object) {
    return this.storageService.saveEntry(this.DB_NAME, data);
  }

  update(_id: string, data: object) {
    return this.storageService.updateEntry(this.DB_NAME, _id, data);
  }

  get(_id: string) {
    return this.storageService.getEntry(this.DB_NAME, _id);
  }

  getList() {
    return this.storageService.getAll(this.DB_NAME);
  }

  calculateBillAmount(
    startTime: string,
    endTime: string,
    ratePerKilometer: number,
    hourlyRate: number,
    kmsTravelled: number
  ) {
    const DAILY_TIME_ALLOTTED: number = 8 * 60 * 60 * 1000;
    const DAILY_KMS_ALLOTTED: number = 250;

    const timeDiff: number = Number(new Date(endTime)) - Number(new Date(startTime));
    const daysBooked: number = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    const totalAllowedHours: number = daysBooked * DAILY_TIME_ALLOTTED;
    const minChargeableKms: number = daysBooked * DAILY_KMS_ALLOTTED;

    const chargeableKms: number =
      kmsTravelled < minChargeableKms ? minChargeableKms : kmsTravelled;
    const extraChargeableHours: number = Math.ceil(
      (timeDiff - totalAllowedHours) / (60 * 60 * 1000)
    );

    let billAmount: number = chargeableKms * ratePerKilometer;
    billAmount +=
      extraChargeableHours > 0 ? extraChargeableHours * hourlyRate : 0;

    return billAmount;
  }
};

export default BookingsService;