export class UserService {
  static $inject = ['$http', 'API_URL'];

  constructor(private $http: ng.IHttpService, private API_URL: string) { }

  async getBookings(): Promise<Booking[] | any> {
    try {
      const response = await this.$http.get(`${this.API_URL}/user/listBookings`);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export default UserService;