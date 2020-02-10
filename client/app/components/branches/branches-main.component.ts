import { BranchesMainController } from './branches-main.controller';

const branchesMainTemplate = require('!!html-loader!./branches-main.template.html');

export const BranchesMain: angular.IComponentOptions = {
  template: branchesMainTemplate,
  controller: BranchesMainController
};

export default BranchesMain;