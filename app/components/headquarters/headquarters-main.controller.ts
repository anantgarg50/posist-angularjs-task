import angular from 'angular';

interface Headquarter {
  name: string,
  location: string
}

export class HeadquartersMainController {
  static $inject = ['headquartersService'];

  public initialValue: Headquarter = {
    name: undefined,
    location: undefined
  };
  public headquarter: Headquarter = {
    name: undefined,
    location: undefined
  };

  constructor(private headquartersService: any) { }

  createHeadquarter(headquarterForm: angular.IFormController) {
    if (!headquarterForm.$valid) {
      return;
    }
    console.log(this.headquarter);

    this.resetForm(headquarterForm);
  }

  resetForm(headquarterForm: angular.IFormController) {
    headquarterForm.$setPristine();
    headquarterForm.$setUntouched();

    this.headquarter = angular.copy(this.initialValue);
  }
};

export default HeadquartersMainController;