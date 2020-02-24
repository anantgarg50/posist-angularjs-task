const services = require('../services');

async function getProfile(req, res, next) {
  const user = req.authUser;

  try {
    const userProfile = await services.User.read(user._id);

    res.status(200).json({
      _id: userProfile._id,
      name: userProfile.name,
      email: userProfile.email,
      role: userProfile.role
    });
  } catch (error) {
    next(error);
  }
}

async function listBookings(req, res, next) {
  const user = req.authUser;

  try {
    const data = await services.User.readBookings(user._id);

    res.status(200).json(data.bookings);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProfile,
  listBookings
};