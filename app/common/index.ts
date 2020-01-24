import angular from 'angular';
import { app } from '../app.module';

import { AppHeader } from './app-header/app-header.component';

angular
  .module(app)
  .component('appHeader', AppHeader);