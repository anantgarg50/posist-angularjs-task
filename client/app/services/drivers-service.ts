export class DriversService {
  static $inject = ['$http', 'API_URL'];

  constructor(private $http: ng.IHttpService, private API_URL: string) { }

  async create(data: Driver) {
    try {
      await this.$http.post(`${this.API_URL}/driver/create`, {
        name: data.name,
        age: data.age,
        permanentAddress: data.permanentAddress,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getList(allocated?: boolean): Promise<Driver[] | any> {
    try {
      let response;
      if (allocated === undefined) {
        response = await this.$http.get(`${this.API_URL}/driver/list`);
      } else {
        response = await this.$http.get(`${this.API_URL}/driver/list?allocated=${Number(allocated)}`);
      }

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export default DriversService;