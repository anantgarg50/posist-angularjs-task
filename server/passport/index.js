var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var { User } = require('../database').models;

passport.use(new LocalStrategy(
  {
    usernameField: 'email'
  },
  function (username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, {
          message: 'User not found!'
        });
      }

      if (!user.checkPassword(password)) {
        return done(null, false, {
          message: 'Wrong Password!'
        });
      }

      return done(null, user);
    });
  }
));