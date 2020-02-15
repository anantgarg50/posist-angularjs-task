import angular from 'angular';
import { app } from './app.module';

angular
  .module(app)
  .constant('API', 'http://localhost:5000')
  .config([
    '$routeProvider',
    '$locationProvider',
    function config($routeProvider: ng.route.IRouteProvider, $locationProvider: any) {
      $routeProvider
        .when('/login', {
          template: '<login></login>'
        })
        .when('/admin', {
          template: '<admin-dashboard></admin-dashboard>'
        })
        .when('/user', {
          template: '<user-dashboard></user-dashboard>'
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
          template: '<ended-bookings></ended-bookings>'
        })
        .when('/book', {
          template: '<book-car></book-car>'
        })
        .otherwise({
          redirectTo: '/login'
        });

      $locationProvider.html5Mode(true);
    }
  ]);
  // .run([
  //   "$rootScope", 
  //   "$location", 
  //   function ($rootScope: ng.IRootScopeService, $location: ng.ILocationService) {
  //   $rootScope.$on("$routeChangeStart", function (evt, to, from) {
  //     // requires authorization?
  //     if (to.authorize === true) {
  //       to.resolve = to.resolve || {};
  //       if (!to.resolve.authorizationResolver) {
  //         // inject resolver
  //         to.resolve.authorizationResolver = ["authService", function (authService) {
  //           return authService.authorize();
  //         }];
  //       }
  //     }
  //   });

  //   $rootScope.$on("$routeChangeError", function (evt, to, from, error) {
  //     if (error instanceof AuthorizationError) {
  //       // redirect to login with original path we'll be returning back to
  //       $location
  //         .path("/login")
  //         .search("returnTo", to.originalPath);
  //     }
  //   });
  // }]);