export class ReportsService {
  static $inject = ['$http', 'API_URL'];

  constructor(private $http: ng.IHttpService, private API_URL: string) { }

  async generateReport(reportType: string): Promise<any> {
    try {
      const response = await this.$http.get(`${this.API_URL}/reports/generate?reportType=${reportType}`);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export default ReportsService;