const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const config = require('../../config');

const schema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true
    },
    hash: String,
    salt: String,
    role: {
      type: Number,
      default: 2
    }
  },
  {
    timestamps: true
  }
);

schema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(
      password,
      this.salt,
      1000, 64,
      'sha512'
    )
    .toString('hex');
}

schema.methods.checkPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(
      password,
      this.salt,
      1000, 64,
      'sha512'
    )
    .toString('hex');

  return this.hash === hash;
};

schema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      role: this.role,
      expiresIn: "7d"
    },
    config.JWT_SECRET
  );
};

module.exports = mongoose.model('User', schema);