const services = require('../services');

async function generateReport(req, res, next) {
  try {
    const { reportType } = req.query;

    let tableData;

    switch (reportType) {
      case "headquartersRevenue":
        tableData = await services.Reports.generateHeadquartersRevenueReport();
        break;
      case "branchesRevenue":
        tableData = await services.Reports.generateBranchesRevenueReport();
        break;
      case "rentalCarsRevenue":
        tableData = await services.Reports.generateRentalCarsRevenueReport();
        break;
      case "carDriversRevenue":
        tableData = await services.Reports.generateCarDriversRevenueReport();
        break;
      case "carDriversHighestBookings":
        tableData = await services.Reports.generateCarDriversHighestBookingsReport();
        break;
      case "rentalCarsHighestBookings":
        tableData = await services.Reports.generateRentalCarsHighestBookingsReport();
        break;
      case "branchesHighestBookings":
        tableData = await services.Reports.generateBranchesHighestBookingsReport();
        break;
      case "carDriversHighestKms":
        tableData = await services.Reports.generateCarDriversHighestKmsReport();
        break;
      case "rentalCarsHighestKms":
        tableData = await services.Reports.generateRentalCarsHighestKmsReport();
        break;
      default:
        throw new Error('Invalid Report Type!');
    }

    res.status(200).json(tableData);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  generateReport
};