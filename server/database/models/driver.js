const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    permanentAddress: String,
    assignedCar: {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      carRegNumber: String,
      operatedBy: {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        location: String
      }
    },
    bookings: [{
      _id: mongoose.Schema.Types.ObjectId,
      customerName: String,
      carBooked: {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        carRegNumber: String
      },
      pickupAddress: String,
      startTime: String,
      branch: {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        location: String
      },
      ratePerKilometer: Number,
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

module.exports = mongoose.model('Driver', schema);