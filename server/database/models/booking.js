const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    customer: {
      _id: mongoose.Schema.Types.ObjectId,
      name: String
    },
    carBooked: {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      carRegNumber: String
    },
    pickupAddress: String,
    startTime: Date,
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
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Booking', schema);