import angular from 'angular';

import { AuthService } from '../../services/auth-service';

export class LoginController {
  static $inject = ['$scope', '$location', 'authService'];

  public initialValue: UserLoginData = {
    email: undefined,
    password: undefined
  };
  public userData: UserLoginData = angular.copy(this.initialValue);

  constructor(
    private $scope: ng.IScope,
    private $location: ng.ILocationService,
    private authService: AuthService
  ) { }

  async login(form: angular.IFormController) {
    const success = await this.authService.login(this.userData);

    if (success) {
      this.$scope.$apply(() => {
        this.$location.path('/');
      });
    } else {
      console.error('Login Error!');
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

export default LoginController;