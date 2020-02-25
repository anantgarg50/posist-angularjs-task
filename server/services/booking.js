const UTILS = require('../utils');

const { Booking } = require('../database').models;

const User = require('./user');
const Branch = require('./branch');
const Car = require('./car');
const Driver = require('./driver');

async function create(data) {
  const car = await Car.read(data.carBooked);
  const branch = await Branch.read(data.branch);
  const user = await User.read(data.user);

  const booking = await new Booking({
    customer: {
      _id: user._id,
      name: user.name
    },
    carBooked: {
      _id: car._id,
      name: `${car.manufacturer} ${car.model}`,
      carRegNumber: car.carRegNumber
    },
    pickupAddress: data.pickupAddress,
    startTime: data.startTime,
    branch: {
      _id: branch._id,
      name: branch.name,
      location: branch.location
    },
    ratePerKilometer: car.ratePerKilometer,
    driverDetails: car.drivenBy,
    hourlyRate: car.hourlyRate,
  }).save()

  await Branch.addBooking(branch._id, {
    _id: booking._id,
    customer: booking.customer,
    carBooked: booking.carBooked,
    pickupAddress: booking.pickupAddress,
    startTime: booking.startTime,
    ratePerKilometer: booking.ratePerKilometer,
    driverDetails: booking.driverDetails,
    hourlyRate: booking.hourlyRate
  });

  await Car.addBooking(car._id, {
    _id: booking._id,
    customer: booking.customer,
    pickupAddress: booking.pickupAddress,
    startTime: booking.startTime,
    branch: booking.branch,
    ratePerKilometer: booking.ratePerKilometer,
    driverDetails: booking.driverDetails,
    hourlyRate: booking.hourlyRate
  });
  await Car.updateCurrentlyBookedStatus(car._id, true);

  await Driver.addBooking(booking.driverDetails._id, {
    _id: booking._id,
    customer: booking.customer,
    carBooked: booking.carBooked,
    pickupAddress: booking.pickupAddress,
    startTime: booking.startTime,
    branch: booking.branch,
    ratePerKilometer: booking.ratePerKilometer,
    hourlyRate: booking.hourlyRate
  });

  await User.addBooking(user._id, {
    _id: booking._id,
    carBooked: booking.carBooked,
    pickupAddress: booking.pickupAddress,
    startTime: booking.startTime,
    branch: booking.branch,
    ratePerKilometer: booking.ratePerKilometer,
    driverDetails: booking.driverDetails,
    hourlyRate: booking.hourlyRate
  });

  return booking;
}

async function complete(data) {
  let booking = await read(data._id);

  const billedAmount = UTILS.calculateBillAmount(
    booking.startTime,
    data.endTime,
    booking.ratePerKilometer,
    booking.hourlyRate,
    data.kmsTravelled
  );

  await Booking.updateOne(
    { _id: booking._id },
    {
      $set: {
        endTime: data.endTime,
        kmsTravelled: data.kmsTravelled,
        billedAmount
      }
    }
  ).exec();

  booking = await read(data._id);

  await User.completeBooking(booking._id, {
    endTime: booking.endTime,
    kmsTravelled: booking.kmsTravelled,
    billedAmount: booking.billedAmount
  });

  await Branch.completeBooking(booking._id, {
    endTime: booking.endTime,
    kmsTravelled: booking.kmsTravelled,
    billedAmount: booking.billedAmount
  });

  await Car.completeBooking(booking._id, {
    endTime: booking.endTime,
    kmsTravelled: booking.kmsTravelled,
    billedAmount: booking.billedAmount
  });
  await Car.updateCurrentlyBookedStatus(booking.carBooked._id, false);

  await Driver.completeBooking(booking._id, {
    endTime: booking.endTime,
    kmsTravelled: booking.kmsTravelled,
    billedAmount: booking.billedAmount
  });

  return booking;
}

async function read(id) {
  return Booking.findOne({ _id: id }).exec();
}

async function readCurrentBookings() {
  return Booking.find({
    endTime: {
      $exists: 0
    }
  }).exec();
}

async function readEndedBookings() {
  return Booking.find({
    endTime: {
      $exists: 1
    }
  }).exec();
}

async function readAll() {
  return Booking.find().exec();
}

module.exports = {
  create,
  complete,
  read,
  readAll,
  readCurrentBookings,
  readEndedBookings
};
