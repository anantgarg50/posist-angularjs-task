export class BookingsService {
  static $inject = ['$http', 'API_URL'];

  constructor(private $http: ng.IHttpService, private API_URL: string) { }

  async create(data: Booking) {
    try {
      await this.$http.post(`${this.API_URL}/booking/create`, {
        carBooked: data.carBooked,
        pickupAddress: data.pickupAddress,
        startTime: data.startTime,
        branch: data.branch
      });
    } catch (error) {
      console.error(error);
    }
  }

  async completeBooking(data: Booking) {
    try {
      await this.$http.post(`${this.API_URL}/booking/complete`, {
        _id: data._id,
        endTime: data.endTime,
        kmsTravelled: data.kmsTravelled
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getCurrentBookings(): Promise<Branch[] | any> {
    try {
      const response = await this.$http.get(`${this.API_URL}/booking/listCurrentBookings`);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getEndedBookings(): Promise<Branch[] | any> {
    try {
      const response = await this.$http.get(`${this.API_URL}/booking/listEndedBookings`);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export default BookingsService;