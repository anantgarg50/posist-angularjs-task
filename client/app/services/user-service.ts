export class UserService {
  static $inject = ['$http', 'API_URL'];

  private user: User;

  constructor(private $http: ng.IHttpService, private API_URL: string) { }

  async getBookings(): Promise<Booking[] | any> {
    try {
      const response = await this.$http.get(`${this.API_URL}/user/listBookings`);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async fetchUser(): Promise<void> {
    try {
      const response = await this.$http.get(`${this.API_URL}/user/profile`);

      this.user = response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getUser(): Promise<User> {
    if (this.user) {
      return this.user;
    }

    await this.fetchUser();

    return this.user;
  }

  removeUser() {
    this.user = undefined;
  }
};

export default UserService;