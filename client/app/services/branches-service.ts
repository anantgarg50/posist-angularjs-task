export class BranchesService {
  static $inject = ['$http', 'API_URL'];

  constructor(private $http: ng.IHttpService, private API_URL: string) { }

  async create(data: Branch) {
    try {
      await this.$http.post(`${this.API_URL}/branch/create`, {
        name: data.name,
        location: data.location,
        headquarter: data.headquarter
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getList(): Promise<Branch[] | any> {
    try {
      const response = await this.$http.get(`${this.API_URL}/branch/list`);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export default BranchesService;