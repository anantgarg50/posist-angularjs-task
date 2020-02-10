import angular from 'angular';
import { app } from './app.module';

angular
  .module(app)
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
  ]);