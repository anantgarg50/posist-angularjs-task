import angular from 'angular';

import { app } from '../app.module';

import { Login } from './login/login.component';
import { AdminDashboard } from './admin-dashboard/admin-dashboard.component';
import { UserDashboard } from './user-dashboard/user-dashboard.component';
import { HeadquartersMain } from './headquarters/headquarters-main.component';
import { BranchesMain } from './branches/branches-main.component';
import { CarsMain } from './cars/cars-main.component';
import { DriversMain } from './drivers/drivers-main.component';
import { EndedBookings } from './bookings/ended-bookings.component';
import { BookCar } from './bookings/book-car.component';
import { ReportsMain } from './reports/reports-main.component';

angular
  .module(app)
  .component('login', Login)
  .component('adminDashboard', AdminDashboard)
  .component('userDashboard', UserDashboard)
  .component('headquartersMain', HeadquartersMain)
  .component('branchesMain', BranchesMain)
  .component('carsMain', CarsMain)
  .component('driversMain', DriversMain)
  .component('endedBookings', EndedBookings)
  .component('bookCar', BookCar)
  .component('reportsMain', ReportsMain);