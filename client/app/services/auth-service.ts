import { ngStorage } from 'ngstorage';

function openPopup(url: string, windowName: string, width: number, height: number) {
  const left = (screen.width / 2) - (width / 2);
  const top = (screen.height / 2) - (height / 2);

  return window.open(url, windowName, `menubar=no, toolbar=no, location=no, personalbar=no, status=no, dependent=yes, minimizable=no, fullscreen=no, resizable=no, scrollbars=yes, width=${width}, height=${height}, top=${top}, left=${left}`);
}

export class AuthService {
  static $inject = ['$localStorage', 'API', '$http', '$window'];

  private authToken: string;
  private loginPopup: any = null;

  constructor(private $localStorage: ngStorage.StorageService, private api: string, private $http: ng.IHttpService, private $window: ng.IWindowService) {
    this.authToken = $localStorage.authToken;

    window.addEventListener('beforeunload', (e: any) => {
      if (this.loginPopup && !this.loginPopup.closed) {
        this.loginPopup.close();
      }
    });

    window.addEventListener('message', (e: any) => {
      if (e.origin === 'http://localhost:8080') {
        return;
      }

      if (e.data) {
        const params = new URLSearchParams(e.data);
        const token = params.get('token');

        if (token) {
          this.setAuthToken(token);
        }
      }

      this.$window.location.pathname = '/user';
    });
  }

  login() {
    if (this.loginPopup && !this.loginPopup.closed) {
      console.info('Login Popup already opened!');

      return;
    }

    this.loginPopup = openPopup(`${this.api}/auth/google`, 'login', 500, 800);
  }

  logout() {
    this.$http
      .post(`${this.api}/auth/logout`, {
        token: this.authToken
      })
      .then(() => {
        this.setAuthToken('');

        this.$window.location.pathname = '/login';
      })
      .catch((err: any) => console.error(err));
  }

  isAuthenticated(): boolean {
    return !!this.authToken;
  }

  getAuthToken(): string | null {
    return this.authToken;
  }

  setAuthToken(token: string) {
    this.authToken = token;
    this.$localStorage.authToken = token;
  }
};

export default AuthService;