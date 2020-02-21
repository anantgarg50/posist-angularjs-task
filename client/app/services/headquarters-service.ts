export class HeadquartersService {
  static $inject = ['$http', 'API_URL'];

  constructor(private $http: ng.IHttpService, private API_URL: string) { }

  async create(data: Headquarter) {
    try {
      await this.$http.post(`${this.API_URL}/headquarter/create`, {
        name: data.name,
        location: data.location
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getList(): Promise<Headquarter[] | any> {
    try {
      const response = await this.$http.get(`${this.API_URL}/headquarter/list`);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export default HeadquartersService;