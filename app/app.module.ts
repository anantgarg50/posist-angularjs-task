import angular from 'angular';

import ngRoute from 'angular-route';

import 'bulma/css/bulma.css';

import { AppHeader } from './common/app-header/app-header.component';

import { HomepageMain } from './components/homepage/homepage-main.component';
import { HeadquartersMain } from './components/headquarters/headquarters-main.component';
import { BranchesMain } from './components/branches/branches-main.component';
import { CarsMain } from './components/cars/cars-main.component';
import { DriversMain } from './components/drivers/drivers-main.component';
import { BookingsMain } from './components/bookings/bookings-main.component';
import { ReportsMain } from './components/reports/reports-main.component';

export const app = angular
  .module('app', [
    ngRoute
  ])
  .component('appHeader', AppHeader)
  .component('homepageMain', HomepageMain)
  .component('headquartersMain', HeadquartersMain)
  .component('branchesMain', BranchesMain)
  .component('carsMain', CarsMain)
  .component('driversMain', DriversMain)
  .component('bookingsMain', BookingsMain)
  .component('reportsMain', ReportsMain)
  .config([
    '$routeProvider',
    '$locationProvider',
    function config($routeProvider: ng.route.IRouteProvider, $locationProvider: any) {
      $routeProvider
        .when('/', {
          template: '<homepage-main></homepage-main>'
        })
        .when('/headquarters', {
          template: `<headquarters-main></headquarters-main>`
        })
        .when('/branches', {
          template: '<branches-main></branches-main>'
        })
        .when('/cars', {
          template: '<cars-main></cars-main>'
        })
        .when('/drivers', {
          template: '<drivers-main></drivers-main>'
        })
        .when('/reports', {
          template: '<reports-main></reports-main>'
        })
        .when('/bookings', {
          template: '<bookings-main></bookings-main>'
        })
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(true);
    }
  ])
  .name;

export default app;