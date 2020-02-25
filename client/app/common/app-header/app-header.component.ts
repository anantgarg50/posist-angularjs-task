import { AppHeaderController } from './app-header.controller';

const appHeaderTemplate = require('!!html-loader!./app-header.template.html');

export const AppHeader: angular.IComponentOptions = {
  template: appHeaderTemplate,
  controller: AppHeaderController
};

export default AppHeader;