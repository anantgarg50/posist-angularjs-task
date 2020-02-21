const { Booking } = require('../database').models;

async function create(data) {
  return new Booking(data).save();
}

async function read(id) {
  return Booking.findOne({ _id: id }).exec();
}

async function readAll() {
  return Booking.find().exec();
}

async function update(id, data) {

}

module.exports = {
  create,
  read,
  readAll,
  update
};