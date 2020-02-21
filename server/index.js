const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const jwt = require('express-jwt');

const config = require('./config');
const routes = require('./routes');
const database = require('./database');
require('./passport');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(jwt({
  secret: config.JWT_SECRET,
  requestProperty: 'authUser'
}).unless({ path: config.UNPROTECTED_ROUTES }));
app.use('/', routes);

app.use(async (err, req, res, next) => {
  console.error(err);

  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({
        message: `${err.name}: ${err.message}`
      });
  } else if (res.headersSent) {
    return next(err)
  } else if (req.xhr) {
    res
      .status(500)
      .json({
        error: err.message
      });
  } else {
    return next(err);
  }
});

database.connect();

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}.`);
});