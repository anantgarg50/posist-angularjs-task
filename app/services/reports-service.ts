import { HeadquartersService } from './headquarters-service';
import { BranchesService } from './branches-service';
import { CarsService } from './cars-service';
import { DriversService } from './drivers-service';
import { BookingsService } from './bookings-service';

export class ReportsService {
  static $inject = ['headquartersService', 'branchesService', 'carsService', 'driversService', 'bookingsService'];

  constructor(
    private headquartersService: HeadquartersService,
    private branchesService: BranchesService,
    private carsService: CarsService,
    private driversService: DriversService,
    private bookingsService: BookingsService
  ) { }
};

export default ReportsService;