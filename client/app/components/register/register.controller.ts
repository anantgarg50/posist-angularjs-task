import angular from 'angular';

import { AuthService } from '../../services/auth-service';

export class RegisterController {
  static $inject = ['$scope', '$location', 'authService'];

  public initialValue: UserRegData = {
    name: undefined,
    email: undefined,
    password: undefined
  };
  public userData: UserRegData = angular.copy(this.initialValue);

  constructor(
    private $scope: ng.IScope,
    private $location: ng.ILocationService,
    private authService: AuthService
  ) { }

  async register(form: angular.IFormController) {
    const success = await this.authService.register(this.userData);

    if (success) {
      this.$scope.$apply(() => {
        this.$location.path('/login');
      });
    } else {
      console.error('Error in user registration!');
    }

    this.$scope.$apply(() => {
      this.resetForm(form);
    });
  }

  resetForm(form: angular.IFormController) {
    form.$setPristine();
    form.$setUntouched();

    this.userData = angular.copy(this.initialValue);
  }
};

export default RegisterController;