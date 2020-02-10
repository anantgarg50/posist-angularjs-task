import { CarsMainController } from './cars-main.controller';

const carsMainTemplate = require('!!html-loader!./cars-main.template.html');

export const CarsMain: angular.IComponentOptions = {
  template: carsMainTemplate,
  controller: CarsMainController
};

export default CarsMain;