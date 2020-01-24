import angular from 'angular';

import ngRoute from 'angular-route';
import 'ngstorage';

import 'bulma/css/bulma.css';

export const app = angular
  .module('app', [
    ngRoute,
    'ngStorage'
  ])
  .name;

export default app;