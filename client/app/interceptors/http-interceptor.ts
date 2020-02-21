import { TokenService } from '../services/token-service';

export class HttpInterceptor {
  static $inject = ['$location', 'tokenService'];

  constructor(
    private $location: ng.ILocationService,
    private tokenService: TokenService
  ) { }

  request = (config: ng.IRequestConfig) => {
    const token = this.tokenService.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  }

  responseError = (response: any) => {
    if (response.status === 401) {
      this.$location.path('/login');
    }

    return response;
  }
};

export default HttpInterceptor;