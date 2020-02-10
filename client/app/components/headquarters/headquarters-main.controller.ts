import angular from 'angular';

import { HeadquartersService } from '../../services/headquarters-service';

interface Headquarter {
  _id?: string,
  name: string,
  location: string,
  branches: object[]
}

export class HeadquartersMainController {
  static $inject = ['headquartersService'];

  public headquartersList: Headquarter[];
  public initialValue: Headquarter = {
    name: undefined,
    location: undefined,
    branches: []
  };
  public headquarter: Headquarter = angular.copy(this.initialValue);

  constructor(private headquartersService: HeadquartersService) {
    this.headquartersList = headquartersService.getList();
  }

  createHeadquarter(headquarterForm: angular.IFormController) {
    if (!headquarterForm.$valid) {
      return;
    }

    this.headquartersService.save(this.headquarter);

    this.resetForm(headquarterForm);
  }

  resetForm(headquarterForm: angular.IFormController) {
    headquarterForm.$setPristine();
    headquarterForm.$setUntouched();

    this.headquarter = angular.copy(this.initialValue);
  }
};

export default HeadquartersMainController;