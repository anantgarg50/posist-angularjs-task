interface ReportOption {
  id: string,
  name: string
};

export class ReportsMainController {
  static $inject = ['reportsService'];

  private reportsService: any;

  public reportTitle: string;
  public reportOptions: ReportOption[];
  public selectedOption: ReportOption;

  constructor(reportsService: any) {
    this.reportsService = reportsService;

    this.reportOptions = [
      { id: "", name: "Select ..." },
      { id: "headquartersRevenue", name: "Headquarters Revenue" },
      { id: "branchesRevenue", name: "Branches Revenue" },
      { id: "rentalCarsRevenue", name: "Rental Cars Revenue" },
      { id: "carDriversRevenue", name: "Car Drivers Revenue" },
      { id: "carDriversHighestBookings", name: "Car Drivers (Highest Bookings)" },
      { id: "rentalCarsHighestBookings", name: "Rental Cars (Highest Bookings)" },
      { id: "branchesHighestBookings", name: "Branches (Highest Bookings)" },
      { id: "carDriversHighestKms", name: "Car Drivers (Highest KMs Travelled)" },
      { id: "rentalCarsHighestKms", name: "Rental Cars (Highest KMs Travelled)" },
    ];

    this.selectedOption = { id: "", name: "Select ..." };

    this.updateReportTitle();
  }

  updateReportTitle() {
    this.reportTitle = this.selectedOption.id ? this.selectedOption.name : "Please select a report type first!";
  }
};

export default ReportsMainController;