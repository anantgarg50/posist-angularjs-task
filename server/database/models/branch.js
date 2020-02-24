const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: String,
    location: String,
    headquarter: {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      location: String
    },
    cars: [{
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      carRegNumber: String,
      drivenBy: {
        _id: mongoose.Schema.Types.ObjectId,
        name: String
      }
    }],
    bookings: [{
      _id: mongoose.Schema.Types.ObjectId,
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
      startTime: String,
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

module.exports = mongoose.model('Branch', schema);