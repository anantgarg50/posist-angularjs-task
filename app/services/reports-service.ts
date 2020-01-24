export class ReportsService {
  static $inject = ['headquartersService', 'branchesService', 'carsService', 'driversService', 'bookingsService'];

  constructor(
    private headquartersService: any,
    private branchesService: any,
    private carsService: any,
    private driversService: any,
    private bookingsService: any
  ) { }

  generateReport(reportType: string) {
    console.log(reportType);
  }
};

export default ReportsService;