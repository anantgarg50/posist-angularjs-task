const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: String,
    location: String,
    branches: [{
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      location: String
    }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Headquarter', schema);