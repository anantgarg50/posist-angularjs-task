import angular from 'angular';
import { app } from '../app.module';

import { TokenService } from './token-service';
import { AuthService } from './auth-service';
import { UserService } from './user-service';
import { HeadquartersService } from './headquarters-service';
import { BranchesService } from './branches-service';
import { CarsService } from './cars-service';
import { DriversService } from './drivers-service';
import { BookingsService } from './bookings-service';
import { ReportsService } from './reports-service';

angular
  .module(app)
  .service('tokenService', TokenService)
  .service('authService', AuthService)
  .service('userService', UserService)
  .service('headquartersService', HeadquartersService)
  .service('branchesService', BranchesService)
  .service('carsService', CarsService)
  .service('driversService', DriversService)
  .service('bookingsService', BookingsService)
  .service('reportsService', ReportsService);