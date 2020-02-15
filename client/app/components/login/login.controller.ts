import angular from 'angular';

import { AuthService } from '../../services/auth-service';

export class LoginController {
  static $inject = ['authService'];

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login();
  }
};

export default LoginController;