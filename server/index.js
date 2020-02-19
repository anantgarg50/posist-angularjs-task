const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const config = require('./config');
const routes = require('./routes');
const database = require('./database');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

database.connect();

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}.`);
});