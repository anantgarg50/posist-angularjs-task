import { AuthService } from '../../services/auth-service';

export class UserDashboardController {
  static $inject = ['authService'];

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }
};

export default UserDashboardController;