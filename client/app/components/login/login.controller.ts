import angular from 'angular';

import { AuthService } from '../../services/auth-service';
import { UserService } from '../../services/user-service';

export class LoginController {
  static $inject = ['$scope', '$location', 'authService', 'userService'];

  public initialValue: UserLoginData = {
    email: undefined,
    password: undefined
  };
  public userData: UserLoginData = angular.copy(this.initialValue);

  constructor(
    private $scope: ng.IScope,
    private $location: ng.ILocationService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  async login(form: angular.IFormController) {
    const success = await this.authService.login(this.userData);

    if (success) {
      const user = await this.userService.getUser();

      this.$scope.$apply(() => {
        this.$location.path(user.role === 1 ? '/admin' : '/user');
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