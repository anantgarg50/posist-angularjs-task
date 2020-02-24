import angular from 'angular';

import ngRoute from 'angular-route';

import 'bulma/css/bulma.css';

export const app = angular
  .module('app', [
    ngRoute
  ])
  .name;

export default app;