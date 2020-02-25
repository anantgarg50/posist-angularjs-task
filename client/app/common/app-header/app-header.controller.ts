import { UserService } from '../../services/user-service';
import { AuthService } from '../../services/auth-service';

export class AppHeaderController {
  static $inject = ['$scope', '$timeout', '$location', 'authService', 'userService'];

  private isAdmin: boolean;
  private isUser: boolean;

  constructor(
    private $scope: ng.IScope,
    private $timeout: ng.ITimeoutService,
    private $location: ng.ILocationService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.getUser();
  }

  async getUser() {
    this.$timeout(async () => {
      const user = await this.userService.getUser();
      this.setUserRole(user.role);

      this.$scope.$digest();
    });
  }

  setUserRole(role: number) {
    if (role === 1) {
      this.isAdmin = true;
    } else if (role === 2) {
      this.isUser = true;
    }
  }

  async logout() {
    try {
      await this.authService.logout();

      this.$timeout(() => {
        this.isAdmin = this.isUser = undefined;
        this.$location.path('/');

        this.$scope.$digest();
      })
    } catch (error) {
      console.error(error);
    }
  }
};

export default AppHeaderController;