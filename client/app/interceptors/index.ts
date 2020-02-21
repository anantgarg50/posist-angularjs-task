import angular from 'angular';
import { app } from '../app.module';

import { HttpInterceptor } from './http-interceptor';

angular
  .module(app)
  .service('httpInterceptor', HttpInterceptor)