import { TokenService } from './token-service';

export class AuthService {
  static $inject = ['$http', 'API_URL', 'tokenService'];

  constructor(
    private $http: ng.IHttpService,
    private API_URL: string,
    private tokenService: TokenService
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
      }

      return !!token;
    } catch (error) {
      console.error(error);
    }
  }

  async logout() {
    try {
      this.tokenService.removeToken();
    } catch (error) {
      console.error(error);
    }
  }

  getAuthToken(): string {
    return this.tokenService.getToken();
  }
};

export default AuthService;