import angular from 'angular';
import { app } from './app.module';

import { UserService } from './services/user-service';
import { AuthService } from './services/auth-service';

enum UserRoles {
  admin = 1,
  user = 2
};

angular
  .module(app)
  .constant('API_URL', 'http://localhost:5000/api')
  .config([
    '$routeProvider',
    '$locationProvider',
    '$httpProvider',
    function config(
      $routeProvider: any,
      $locationProvider: ng.ILocationProvider,
      $httpProvider: ng.IHttpProvider
    ) {
      $routeProvider
        .when('/', {
          template: '<main-dashboard></main-dashboard>',
          requiresAuth: false,
        })
        .when('/login', {
          template: '<login></login>',
          requiresAuth: false
        })
        .when('/register', {
          template: '<register></register>',
          requiresAuth: false
        })
        .when('/admin', {
          template: '<admin-dashboard></admin-dashboard>',
          requiresAuth: true,
          permissions: [UserRoles.admin]
        })
        .when('/user', {
          template: '<user-dashboard></user-dashboard>',
          requiresAuth: true,
          permissions: [UserRoles.user]
        })
        .when('/headquarters', {
          template: `<headquarters-main></headquarters-main>`,
          requiresAuth: true,
          permissions: [UserRoles.admin]
        })
        .when('/branches', {
          template: '<branches-main></branches-main>',
          requiresAuth: true,
          permissions: [UserRoles.admin]
        })
        .when('/cars', {
          template: '<cars-main></cars-main>',
          requiresAuth: true,
          permissions: [UserRoles.admin]
        })
        .when('/drivers', {
          template: '<drivers-main></drivers-main>',
          requiresAuth: true,
          permissions: [UserRoles.admin]
        })
        .when('/reports', {
          template: '<reports-main></reports-main>',
          requiresAuth: true,
          permissions: [UserRoles.admin]
        })
        .when('/bookings', {
          template: '<ended-bookings></ended-bookings>',
          requiresAuth: true,
          permissions: [UserRoles.admin]
        })
        .when('/book', {
          template: '<book-car></book-car>',
          requiresAuth: true,
          permissions: [UserRoles.user]
        })
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(true);

      $httpProvider.interceptors.push('httpInterceptor');
    }
  ])
  .run([
    "$rootScope",
    "$location",
    'authService',
    'userService',
    function (
      $rootScope: ng.IRootScopeService,
      $location: ng.ILocationService,
      authService: AuthService,
      userService: UserService
    ) {
      $rootScope.$on("$routeChangeStart", async function (event, next, prev) {
        if (next.requiresAuth) {
          if (!authService.isLoggedIn()) {
            $location.path('/');

            return false;
          }

          const user = await userService.getUser();

          if (next.permissions.indexOf(user.role) === -1) {
            $location.path(user.role === 1 ? '/admin' : '/user');
          }
        } else {
          if (!authService.isLoggedIn()) {
            return true;
          }

          const user = await userService.getUser();

          $location.path(user.role === 1 ? '/admin' : '/user');

          $rootScope.$digest();
        }
      });
    }]);