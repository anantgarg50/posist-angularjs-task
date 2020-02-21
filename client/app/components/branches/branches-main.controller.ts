import angular from 'angular';

import { BranchesService } from '../../services/branches-service';
import { HeadquartersService } from '../../services/headquarters-service';
export class BranchesMainController {
  static $inject = ['$scope', '$timeout', 'branchesService', 'headquartersService'];

  public headquartersList: Headquarter[];
  public branchesList: Branch[];
  public initialValue: Branch = {
    name: undefined,
    location: undefined,
    headquarter: undefined
  };
  public branch: Branch = angular.copy(this.initialValue);

  constructor(
    private $scope: ng.IScope,
    private $timeout: ng.ITimeoutService,
    private branchesService: BranchesService,
    private headquartersService: HeadquartersService,
  ) {
    this.populateHeadquartersList();

    this.populateBranchesList();
  }

  populateHeadquartersList() {
    this.$timeout(async () => {
      this.headquartersList = await this.headquartersService.getList();

      this.$scope.$digest();
    });
  }

  populateBranchesList() {
    this.$timeout(async () => {
      this.branchesList = await this.branchesService.getList();

      this.$scope.$digest();
    });
  }

  async createBranch(branchForm: angular.IFormController) {
    if (!branchForm.$valid) {
      return;
    }

    await this.branchesService.create(this.branch);

    this.resetForm(branchForm);
    this.populateBranchesList();
  }

  resetForm(branchForm: angular.IFormController) {
    branchForm.$setPristine();
    branchForm.$setUntouched();

    this.branch = angular.copy(this.initialValue);
  }
};

export default BranchesMainController;