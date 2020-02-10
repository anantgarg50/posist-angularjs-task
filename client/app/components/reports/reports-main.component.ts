import { ReportsMainController } from './reports-main.controller';

const reportsMainTemplate = require('!!html-loader!./reports-main.template.html');

export const ReportsMain: angular.IComponentOptions = {
  template: reportsMainTemplate,
  controller: ReportsMainController
};

export default ReportsMain;