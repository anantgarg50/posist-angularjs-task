import { DriversMainController } from './drivers-main.controller';

const driversMainTemplate = require('!!html-loader!./drivers-main.template.html');

export const DriversMain: angular.IComponentOptions = {
  template: driversMainTemplate,
  controller: DriversMainController
};

export default DriversMain;