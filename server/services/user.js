const { User } = require('../database').models;

async function create(data) {
  const user = new User({
    name: data.name,
    email: data.email
  });

  user.setPassword(data.password);

  return user.save();
}

async function read(id) {
  return User.findOne({ _id: id }).exec();
}

async function readBookings(id) {
  return User.findOne({ _id: id }, { bookings: 1 }).exec();
}

async function addBooking(id, booking) {
  return User.updateOne(
    { _id: id },
    {
      $push: {
        bookings: booking
      }
    }
  ).exec();
}

async function completeBooking(bookingId, bookingUpdate) {
  return User.updateOne(
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

module.exports = {
  create,
  read,
  readBookings,
  addBooking,
  completeBooking
};