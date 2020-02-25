const {
  Headquarter,
  Branch,
  Car,
  Driver
} = require('../database').models;

async function generateHeadquartersRevenueReport() {
  return Headquarter.aggregate([
    {
      $lookup: {
        from: 'branches',
        localField: "branches._id",
        foreignField: "_id",
        as: "branches"
      }
    },
    {
      $unwind: "$branches"
    },
    {
      $unwind: "$branches.bookings"
    },
    {
      $group: {
        _id: {
          _id: "$id",
          name: "$name",
          location: "$location",
        },
        revenue: {
          $sum: "$branches.bookings.billedAmount"
        }
      }
    },
    {
      $project: {
        _id: 0,
        name: "$_id.name",
        location: "$_id.location",
        revenue: "$revenue"
      }
    },
    {
      $sort: {
        revenue: -1
      }
    }
  ]).exec();
}

async function generateBranchesRevenueReport() {
  return Branch.aggregate([
    {
      $unwind: "$bookings"
    },
    {
      $group: {
        _id: {
          _id: "$id",
          name: "$name",
          location: "$location",
          headquarter: "$headquarter"
        },
        revenue: {
          $sum: "$bookings.billedAmount"
        }
      }
    },
    {
      $project: {
        _id: 0,
        name: "$_id.name",
        location: "$_id.location",
        headquarter: {
          $concat: [
            "$_id.headquarter.name",
            ", ",
            "$_id.headquarter.location"
          ]
        },
        revenue: "$revenue"
      }
    },
    {
      $sort: {
        revenue: -1
      }
    }
  ]).exec();
}

async function generateRentalCarsRevenueReport() {
  return Car.aggregate([
    {
      $unwind: "$bookings"
    },
    {
      $group: {
        _id: {
          _id: "$id",
          carRegNumber: "$carRegNumber",
          manufacturer: "$manufacturer",
          model: "$model",
          operatedBy: "$operatedBy"
        },
        revenue: {
          $sum: "$bookings.billedAmount"
        }
      }
    },
    {
      $project: {
        _id: 0,
        carRegNumber: "$_id.carRegNumber",
        name: {
          $concat: [
            "$_id.manufacturer",
            " ",
            "$_id.model"
          ]
        },
        operatedBy: {
          $concat: [
            "$_id.operatedBy.name",
            ", ",
            "$_id.operatedBy.location"
          ]
        },
        revenue: "$revenue"
      }
    },
    {
      $sort: {
        revenue: -1
      }
    }
  ]).exec();
}

async function generateCarDriversRevenueReport() {
  return Driver.aggregate([
    {
      $unwind: "$bookings"
    },
    {
      $group: {
        _id: {
          _id: "$id",
          name: "$name",
          age: "$age",
        },
        revenue: {
          $sum: "$bookings.billedAmount"
        }
      }
    },
    {
      $project: {
        _id: 0,
        name: "$_id.name",
        age: "$_id.age",
        revenue: "$revenue"
      }
    },
    {
      $sort: {
        revenue: -1
      }
    }
  ]).exec();
}

async function generateCarDriversHighestBookingsReport() {
  return Driver.aggregate([
    {
      $project: {
        _id: 0,
        name: 1,
        age: 1,
        numberOfBookings: {
          $size: "$bookings"
        }
      }
    },
    {
      $sort: {
        numberOfBookings: -1
      }
    }
  ]).exec();
}

async function generateRentalCarsHighestBookingsReport() {
  return Car.aggregate([
    {
      $project: {
        _id: 0,
        carRegNumber: 1,
        name: {
          $concat: [
            "$manufacturer",
            " ",
            "$model"
          ]
        },
        operatedBy: {
          $concat: [
            "$operatedBy.name",
            ", ",
            "$operatedBy.location"
          ]
        },
        numberOfBookings: {
          $size: "$bookings"
        }
      }
    },
    {
      $sort: {
        numberOfBookings: -1
      }
    }
  ]).exec();
}

async function generateBranchesHighestBookingsReport() {
  return Branch.aggregate([
    {
      $project: {
        _id: 0,
        name: 1,
        location: 1,
        headquarter: {
          $concat: [
            "$headquarter.name",
            ", ",
            "$headquarter.location"
          ]
        },
        numberOfBookings: {
          $size: "$bookings"
        }
      }
    },
    {
      $sort: {
        numberOfBookings: -1
      }
    },
    {
      $sort: {
        revenue: -1
      }
    }
  ]).exec();
}

async function generateCarDriversHighestKmsReport() {
  return Driver.aggregate([
    {
      $unwind: "$bookings"
    },
    {
      $group: {
        _id: {
          _id: "$id",
          name: "$name",
          age: "$age"
        },
        kmsTravelled: {
          $sum: "$bookings.kmsTravelled"
        }
      }
    },
    {
      $project: {
        _id: 0,
        name: "$_id.name",
        age: "$_id.age",
        kmsTravelled: "$kmsTravelled"
      }
    },
    {
      $sort: {
        kmsTravelled: -1
      }
    }
  ]).exec();
}

async function generateRentalCarsHighestKmsReport() {
  return Car.aggregate([
    {
      $unwind: "$bookings"
    },
    {
      $group: {
        _id: {
          _id: "$id",
          carRegNumber: "$carRegNumber",
          manufacturer: "$manufacturer",
          model: "$model",
          operatedBy: "$operatedBy"
        },
        kmsTravelled: {
          $sum: "$bookings.kmsTravelled"
        }
      }
    },
    {
      $project: {
        _id: 0,
        carRegNumber: "$_id.carRegNumber",
        name: {
          $concat: [
            "$_id.manufacturer",
            " ",
            "$_id.model"
          ]
        },
        operatedBy: {
          $concat: [
            "$_id.operatedBy.name",
            ", ",
            "$_id.operatedBy.location"
          ]
        },
        kmsTravelled: "$kmsTravelled"
      }
    },
    {
      $sort: {
        kmsTravelled: -1
      }
    }
  ]).exec();
}

module.exports = {
  generateHeadquartersRevenueReport,
  generateBranchesRevenueReport,
  generateRentalCarsRevenueReport,
  generateCarDriversRevenueReport,
  generateCarDriversHighestBookingsReport,
  generateRentalCarsHighestBookingsReport,
  generateBranchesHighestBookingsReport,
  generateCarDriversHighestKmsReport,
  generateRentalCarsHighestKmsReport
}