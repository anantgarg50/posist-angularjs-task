const services = require('../services');

async function getProfile(req, res, next) {
  const { id } = req.params;

  try {
    const user = await services.User.read(id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      type: user.type
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProfile
};