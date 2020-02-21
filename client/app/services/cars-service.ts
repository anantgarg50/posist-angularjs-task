export class CarsService {
  static $inject = ['$http', 'API_URL'];

  constructor(private $http: ng.IHttpService, private API_URL: string) { }

  async create(data: Car) {
    try {
      await this.$http.post(`${this.API_URL}/car/create`, {
        manufacturer: data.manufacturer,
        model: data.model,
        seatingCapacity: data.seatingCapacity,
        ratePerKilometer: data.ratePerKilometer,
        hourlyRate: data.hourlyRate,
        carRegNumber: data.carRegNumber,
        operatedBy: data.operatedBy,
        drivenBy: data.drivenBy
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getList(): Promise<Car[] | any> {
    try {
      const response = await this.$http.get(`${this.API_URL}/car/list`);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export default CarsService;