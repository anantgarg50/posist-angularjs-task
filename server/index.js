const path = require('path');
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const config = require('./config');
const routes = require('./routes');

const app = express();

const { User } = require('./database/models');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use(logger('dev'));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

passport.use(new GoogleStrategy(
  config.GOOGLE_AUTH_OPTIONS,
  function (accessToken, refreshToken, profile, done) {
    User.findOne({
      email: profile._json.email
    }, function (err, user) {
      if (err) {
        console.error(err);
        return done(err);
      }

      if (!user) {
        User.create({
          name: profile._json.name,
          email: profile._json.email,
          picture: profile._json.picture,
          token: accessToken,
          type: 'user'
        }, function (err) {
          if (err) {
            console.error(err);
            return done(err);
          }

          return done(null, profile);
        });
      } else {
        User.updateOne({
          email: profile._json.email,
        }, {
          $set: {
            token: accessToken
          }
        }, function (err) {
          if (err) {
            console.error(err);
            return done(err);
          }

          return done(null, profile);
        });
      }
    });
  })
);

(async () => {
  try {
    await mongoose.connect(config.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('DB Connected!');
  } catch (error) {
    console.error(error);
  }
})();

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}.`);
});