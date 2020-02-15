import { ReportsService } from '../../services/reports-service';

interface ReportOption {
  id: string,
  name: string
};

export class ReportsMainController {
  static $inject = ['reportsService'];

  public reportTitle: string;
  public reportOptions: ReportOption[];
  public selectedOption: ReportOption;
  public tableColumns: string[];
  public tableData: any[];
  public rowCells: string[];

  private columnConfig: any = {
    headquartersRevenue: {
      colNames: [
        "S.N.",
        "Headquarter Name",
        "Location",
        "Revenue"
      ],
      rowCells: [
        "{{$index + 1 + '.'}}",
        "{{data.name}}",
        "{{data.location}}",
        "{{data.revenue}}"
      ]
    },
    branchesRevenue: {
      colNames: [
        "S.N.",
        "Branch Name",
        "Location",
        "Headquarter",
        "Revenue"
      ],
      rowCells: [
        "{{$index + 1 + '.'}}",
        "{{data.driverName}}",
        "{{data.driverAge}}",
        "{{data.numberOfBookings}}"
      ]
    },
    rentalCarsRevenue: {
      colNames: [
        "S.N.",
        "Registration No.",
        "Make/Model",
        "Operated By",
        "Revenue"
      ],
      rowCells: [
        "{{$index + 1 + '.'}}",
        "{{data.driverName}}",
        "{{data.driverAge}}",
        "{{data.numberOfBookings}}"
      ]
    },
    carDriversRevenue: {
      colNames: ["S.N.", "Driver Name", "Age", "Revenue"],
      rowCells: [
        "{{$index + 1 + '.'}}",
        "{{data.driverName}}",
        "{{data.driverAge}}",
        "{{data.numberOfBookings}}"
      ]
    },
    carDriversHighestBookings: {
      colNames: [
        "S.N.",
        "Driver Name",
        "Age",
        "No. of Bookings"
      ],
      rowCells: [
        "{{$index + 1 + '.'}}",
        "{{data.driverName}}",
        "{{data.driverAge}}",
        "{{data.numberOfBookings}}"
      ]
    },
    rentalCarsHighestBookings: {
      colNames: [
        "S.N.",
        "Registration No.",
        "Make/Model",
        "Operated By",
        "No. of Bookings"
      ],
      rowCells: [
        "{{$index + 1 + '.'}}",
        "{{data.driverName}}",
        "{{data.driverAge}}",
        "{{data.numberOfBookings}}"
      ]
    },
    branchesHighestBookings: {
      colNames: [
        "S.N.",
        "Branch Name",
        "Location",
        "Headquarter",
        "No. of Bookings"
      ],
      rowCells: [
        "{{$index + 1 + '.'}}",
        "{{data.driverName}}",
        "{{data.driverAge}}",
        "{{data.numberOfBookings}}"
      ]
    },
    carDriversHighestKms: {
      colNames: [
        "S.N.",
        "Driver Name",
        "Age",
        "KMs Driven"
      ],
      rowCells: [
        "{{$index + 1 + '.'}}",
        "{{data.driverName}}",
        "{{data.driverAge}}",
        "{{data.numberOfBookings}}"
      ]
    },
    rentalCarsHighestKms: {
      colNames: [
        "S.N.",
        "Registration No.",
        "Make/Model",
        "Operated By",
        "KMs Driven"
      ],
      rowCells: [
        "{{$index + 1 + '.'}}",
        "{{data.driverName}}",
        "{{data.driverAge}}",
        "{{data.numberOfBookings}}"
      ]
    }
  }

  constructor(private reportsService: any) {
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
      this.rowCells = this.columnConfig[this.selectedOption.id].rowCells;
      this.populateReportData(this.selectedOption.id);
    }
  }

  populateReportData(reportType: string) {
    switch (reportType) {
      case "headquartersRevenue":
        this.tableData = this.reportsService.generateHeadquartersRevenueReport();
        break;
      case "branchesRevenue":
        this.tableData = this.reportsService.generateBranchesRevenueReport();
        break;
      case "rentalCarsRevenue":
        this.tableData = this.reportsService.generateRentalCarsRevenueReport();
        break;
      case "carDriversRevenue":
        this.tableData = this.reportsService.generateCarDriversRevenueReport();
        break;
      case "carDriversHighestBookings":
        this.tableData = this.reportsService.generateCarDriversHighestBookingsReport();
        break;
      case "rentalCarsHighestBookings":
        this.tableData = this.reportsService.generateRentalCarsHighestBookingsReport();
        break;
      case "branchesHighestBookings":
        this.tableData = this.reportsService.generateBranchesHighestBookingsReport();
        break;
      case "carDriversHighestKms":
        this.tableData = this.reportsService.generateCarDriversHighestKmsReport();
        break;
      case "rentalCarsHighestKms":
        this.tableData = this.reportsService.generateRentalCarsHighestKmsReport();
        break;
      default:
        break;
    }
  }
};

export default ReportsMainController;