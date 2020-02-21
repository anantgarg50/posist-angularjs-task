const mongoose = require('mongoose');

const models = require('./models');
const config = require('../config');

async function connect() {
  try {
    await mongoose.connect(config.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log('DB Connected!');
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  models,
  connect
};
