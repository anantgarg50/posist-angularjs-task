import { HeadquartersMainController } from './headquarters-main.controller';

const headquartersMainTemplate = require('!!html-loader!./headquarters-main.template.html');

export const HeadquartersMain: angular.IComponentOptions = {
  template: headquartersMainTemplate,
  controller: HeadquartersMainController
};

export default HeadquartersMain;