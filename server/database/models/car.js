const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    operatedBy: {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      location: String
    },
    drivenBy: {
      _id: mongoose.Schema.Types.ObjectId,
      name: String
    },
    manufacturer: String,
    model: String,
    seatingCapacity: Number,
    ratePerKilometer: Number,
    hourlyRate: Number,
    carRegNumber: String,
    currentlyBooked: {
      type: Boolean,
      default: false
    },
    bookings: [{
      _id: mongoose.Schema.Types.ObjectId,
      customer: {
        _id: mongoose.Schema.Types.ObjectId,
        name: String
      },
      pickupAddress: String,
      startTime: String,
      branch: {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        location: String
      },
      ratePerKilometer: Number,
      driverDetails: {
        _id: mongoose.Schema.Types.ObjectId,
        name: String
      },
      hourlyRate: Number,
      endTime: String,
      kmsTravelled: Number,
      billedAmount: Number
    }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Car', schema);