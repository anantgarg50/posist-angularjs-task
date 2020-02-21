const { Driver } = require('../database').models;

async function create(data) {
  return new Driver(data).save();
}

async function read(id) {
  return Driver.findOne({ _id: id }).exec();
}

async function readAll(allocated) {
  let options = {};

  if (allocated !== undefined) {
    options.assignedCar = {
      $exists: Number(allocated)
    };
  }

  return Driver.find(options).exec();
}

async function assignCar(id, car) {
  return Driver.updateOne(
    { _id: id },
    {
      $set: {
        assignedCar: car
      }
    }
  ).exec();
}

module.exports = {
  create,
  read,
  readAll,
  assignCar
};
