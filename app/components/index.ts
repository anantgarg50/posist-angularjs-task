import angular from 'angular';
import { app } from '../app.module';

import { HomepageMain } from './homepage/homepage-main.component';
import { HeadquartersMain } from './headquarters/headquarters-main.component';
import { BranchesMain } from './branches/branches-main.component';
import { CarsMain } from './cars/cars-main.component';
import { DriversMain } from './drivers/drivers-main.component';
import { BookingsMain } from './bookings/bookings-main.component';
import { ReportsMain } from './reports/reports-main.component';

angular
  .module(app)
  .component('homepageMain', HomepageMain)
  .component('headquartersMain', HeadquartersMain)
  .component('branchesMain', BranchesMain)
  .component('carsMain', CarsMain)
  .component('driversMain', DriversMain)
  .component('bookingsMain', BookingsMain)
  .component('reportsMain', ReportsMain);