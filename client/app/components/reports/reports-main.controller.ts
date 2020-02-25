import { ReportsService } from '../../services/reports-service';

interface ReportOption {
  id: string,
  name: string
};

export class ReportsMainController {
  static $inject = ['$scope', '$timeout', 'reportsService'];

  public reportTitle: string;
  public reportOptions: ReportOption[];
  public selectedOption: ReportOption;
  public tableColumns: string[];
  public tableData: any[];

  private columnConfig: any = {
    headquartersRevenue: {
      colNames: [
        "S.N.",
        "Headquarter Name",
        "Location",
        "Revenue"
      ]
    },
    branchesRevenue: {
      colNames: [
        "S.N.",
        "Branch Name",
        "Location",
        "Headquarter",
        "Revenue"
      ]
    },
    rentalCarsRevenue: {
      colNames: [
        "S.N.",
        "Registration No.",
        "Make/Model",
        "Operated By",
        "Revenue"
      ]
    },
    carDriversRevenue: {
      colNames: ["S.N.", "Driver Name", "Age", "Revenue"]
    },
    carDriversHighestBookings: {
      colNames: [
        "S.N.",
        "Driver Name",
        "Age",
        "No. of Bookings"
      ]
    },
    rentalCarsHighestBookings: {
      colNames: [
        "S.N.",
        "Registration No.",
        "Make/Model",
        "Operated By",
        "No. of Bookings"
      ]
    },
    branchesHighestBookings: {
      colNames: [
        "S.N.",
        "Branch Name",
        "Location",
        "Headquarter",
        "No. of Bookings"
      ]
    },
    carDriversHighestKms: {
      colNames: [
        "S.N.",
        "Driver Name",
        "Age",
        "KMs Driven"
      ]
    },
    rentalCarsHighestKms: {
      colNames: [
        "S.N.",
        "Registration No.",
        "Make/Model",
        "Operated By",
        "KMs Driven"
      ]
    }
  }

  constructor(
    private $scope: ng.IScope,
    private $timeout: ng.ITimeoutService,
    private reportsService: ReportsService
  ) {
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

    this.updateReportType();
  }

  updateReportType() {
    this.reportTitle = this.selectedOption.id ? this.selectedOption.name : "Please select a report type first!";

    if (this.selectedOption.id) {
      this.tableColumns = this.columnConfig[this.selectedOption.id].colNames;

      this.populateReportData(this.selectedOption.id);
    } else {
      this.tableColumns = [];
      this.tableData = [];
    }
  }

  populateReportData(reportType: string) {
    this.$timeout(async () => {
      this.tableData = await this.reportsService.generateReport(reportType);

      this.$scope.$digest();
    });
  }
};

export default ReportsMainController;