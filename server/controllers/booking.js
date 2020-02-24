const services = require('../services');

async function create(req, res, next) {
  try {
    const user = req.authUser;
    const data = req.body;

    const booking = await services.Booking.create({
      carBooked: data.carBooked,
      pickupAddress: data.pickupAddress,
      startTime: data.startTime,
      branch: data.branch,
      user: user._id
    });

    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
}

async function complete(req, res, next) {
  try {
    const data = req.body;

    const booking = await services.Booking.complete({
      _id: data._id,
      endTime: data.endTime,
      kmsTravelled: data.kmsTravelled
    });

    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
}

async function listCurrentBookings(req, res, next) {
  try {
    const currentBookings = await services.Booking.readCurrentBookings();

    res.status(200).json(currentBookings);
  } catch (error) {
    next(error);
  }
}

async function listEndedBookings(req, res, next) {
  try {
    const endedBookings = await services.Booking.readEndedBookings();

    res.status(200).json(endedBookings);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  complete,
  listCurrentBookings,
  listEndedBookings
};