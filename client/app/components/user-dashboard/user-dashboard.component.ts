import { UserDashboardController } from './user-dashboard.controller';

const userDashboardTemplate = require('!!html-loader!./user-dashboard.template.html');

export const UserDashboard: angular.IComponentOptions = {
  template: userDashboardTemplate,
  controller: UserDashboardController
};

export default UserDashboard;