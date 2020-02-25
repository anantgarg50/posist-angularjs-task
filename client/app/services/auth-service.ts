import { TokenService } from './token-service';
import { UserService } from './user-service';

export class AuthService {
  static $inject = ['$http', 'API_URL', 'tokenService', 'userService'];

  constructor(
    private $http: ng.IHttpService,
    private API_URL: string,
    private tokenService: TokenService,
    private userService: UserService
  ) { }

  async register(data: UserRegData): Promise<boolean> {
    try {
      const response = await this.$http.post(`${this.API_URL}/auth/register`, {
        name: data.name,
        email: data.email,
        password: data.password
      });

      // @ts-ignore
      return response.data.success;
    } catch (error) {
      console.error(error);
    }
  }

  async login(data?: UserLoginData) {
    try {
      const response = await this.$http.post(`${this.API_URL}/auth/login`, {
        email: data.email,
        password: data.password
      });

      // @ts-ignore
      const token = response.data.token;
      if (token) {
        this.tokenService.setToken(token);
        await this.userService.fetchUser();
      }

      return !!token;
    } catch (error) {
      console.error(error);
    }
  }

  async logout() {
    try {
      this.tokenService.removeToken();
      this.userService.removeUser()
    } catch (error) {
      console.error(error);
    }
  }

  isLoggedIn() {
    return !!this.getAuthToken();
  }

  getAuthToken(): string {
    return this.tokenService.getToken();
  }
};

export default AuthService;