import angular from 'angular';

import { BranchesService } from '../../services/branches-service';
import { HeadquartersService } from '../../services/headquarters-service';

interface Branch {
  _id?: string,
  name: string,
  location: string,
  headquarter: any,
  cars: object[],
  bookings: object[]
}

interface Headquarter {
  _id?: string,
  name: string,
  location: string,
  branches: object[]
}

export class BranchesMainController {
  static $inject = ['branchesService', 'headquartersService'];

  public headquartersList: Headquarter[];
  public branchesList: Branch[];
  public initialValue: Branch = {
    name: undefined,
    location: undefined,
    headquarter: undefined,
    cars: [],
    bookings: []
  };
  public branch: Branch = angular.copy(this.initialValue);

  constructor(
    private branchesService: BranchesService,
    private headquartersService: HeadquartersService
  ) {
    this.branchesList = branchesService.getList();
    this.headquartersList = headquartersService.getList();
  }

  createBranch(branchForm: angular.IFormController) {
    if (!branchForm.$valid) {
      return;
    }

    const headquarter: Headquarter = this.headquartersService.get(this.branch.headquarter);
    this.branch.headquarter = {
      _id: headquarter._id,
      name: headquarter.name,
      location: headquarter.location
    };

    const saved: Branch = this.branchesService.save(this.branch);

    headquarter.branches.push({
      _id: saved._id,
      name: saved.name,
      location: saved.location
    });

    this.headquartersService.update(headquarter._id, headquarter);

    this.resetForm(branchForm);
  }

  resetForm(branchForm: angular.IFormController) {
    branchForm.$setPristine();
    branchForm.$setUntouched();

    this.branch = angular.copy(this.initialValue);
  }
};

export default BranchesMainController;