import angular from 'angular';

import { HeadquartersService } from '../../services/headquarters-service';

export class HeadquartersMainController {
  static $inject = ['$scope', '$timeout', 'headquartersService'];

  public headquartersList: Headquarter[];
  public initialValue: Headquarter = {
    name: undefined,
    location: undefined
  };
  public headquarter: Headquarter = angular.copy(this.initialValue);

  constructor(
    private $scope: ng.IScope,
    private $timeout: ng.ITimeoutService,
    private headquartersService: HeadquartersService
  ) {
    this.populateHeadquartersList();
  }

  populateHeadquartersList() {
    this.$timeout(async () => {
      this.headquartersList = await this.headquartersService.getList();

      this.$scope.$digest();
    });
  }

  async createHeadquarter(headquarterForm: angular.IFormController) {
    if (!headquarterForm.$valid) {
      return;
    }

    await this.headquartersService.create(this.headquarter);

    this.resetForm(headquarterForm);
    this.populateHeadquartersList();
  }

  resetForm(headquarterForm: angular.IFormController) {
    headquarterForm.$setPristine();
    headquarterForm.$setUntouched();

    this.headquarter = angular.copy(this.initialValue);
  }
};

export default HeadquartersMainController;