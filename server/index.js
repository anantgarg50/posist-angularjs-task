const express = require('express');

const config = require('./config');
const routes = require('./routes');

const app = express();

app.use('/', routes);

app.listen(config.PORT);