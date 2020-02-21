export class TokenService {
  setToken(token: string): void {
    localStorage.setItem('auth-token', token);
  }

  getToken(): string {
    return localStorage.getItem('auth-token');
  }

  removeToken(): void {
    localStorage.removeItem('auth-token');
  }
};

export default TokenService;