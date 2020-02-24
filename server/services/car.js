const { Car } = require('../database').models;
const Branch = require('./branch');
const Driver = require('./driver');

async function create(data) {
  const branch = await Branch.read(data.operatedBy);
  const driver = await Driver.read(data.drivenBy);

  const car = await new Car({
    ...data,
    operatedBy: {
      _id: branch._id,
      name: branch.name,
      location: branch.location
    },
    drivenBy: {
      _id: driver._id,
      name: driver.name
    },
  }).save();

  await Branch.addCar(branch._id, {
    _id: car._id,
    name: `${car.manufacturer} ${car.model}`,
    carRegNumber: car.carRegNumber,
    drivenBy: car.drivenBy
  });

  await Driver.assignCar(driver._id, {
    _id: car._id,
    name: `${car.manufacturer} ${car.model}`,
    carRegNumber: car.carRegNumber,
    operatedBy: car.operatedBy
  });

  return car;
}

async function read(id) {
  return Car.findOne({ _id: id }).exec();
}

async function readAll() {
  return Car.find().exec();
}

async function readAvailableCars(id) {
  return Car.find(
    { 'operatedBy._id': id, currentlyBooked: false },
    { manufacturer: 1, model: 1 }
  ).exec();
}

async function addBooking(id, booking) {
  return Car.updateOne(
    { _id: id },
    {
      $push: {
        bookings: booking
      }
    }
  ).exec();
}

async function completeBooking(bookingId, bookingUpdate) {
  return Car.updateOne(
    { 'bookings._id': bookingId },
    {
      $set: {
        'bookings.$.endTime': bookingUpdate.endTime,
        'bookings.$.kmsTravelled': bookingUpdate.kmsTravelled,
        'bookings.$.billedAmount': bookingUpdate.billedAmount
      }
    }
  ).exec();
}

async function updateCurrentlyBookedStatus(id, currentlyBooked) {
  return Car.updateOne(
    { _id: id },
    {
      $set: {
        currentlyBooked
      }
    }
  ).exec();
}

module.exports = {
  create,
  read,
  readAll,
  readAvailableCars,
  addBooking,
  completeBooking,
  updateCurrentlyBookedStatus
};