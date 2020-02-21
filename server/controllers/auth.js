const passport = require('passport');

const services = require('../services');

async function register(req, res, next) {
  try {
    const data = req.body;

    const user = await services.User.create({
      name: data.name,
      email: data.email,
      password: data.password
    });

    if (user) {
      res.status(200).json({
        success: true
      });
    } else {
      throw new Error("User registration error!");
    }
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (user) {
      res
        .status(200)
        .json({
          token: user.generateToken()
        });
    } else {
      return next(new Error(info.message));
    }
  })(req, res, next);
}

async function logout(req, res, next) {
  try {
    const data = req.body;

    const headquarter = await services.Headquarter.create({
      name: data.name,
      location: data.location
    });

    res.status(200).json(headquarter);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  logout
};