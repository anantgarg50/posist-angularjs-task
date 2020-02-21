const { Branch } = require('../database').models;
const Headquarters = require('./headquarter');

async function create(data) {
  const headquarter = await Headquarters.read(data.headquarter);

  const branch = await new Branch({
    ...data,
    headquarter: {
      _id: headquarter._id,
      name: headquarter.name,
      location: headquarter.location
    }
  }).save();

  await Headquarters.addBranch(headquarter._id, {
    _id: branch._id,
    name: branch.name,
    location: branch.location
  });

  return branch;
}

async function read(id) {
  return Branch.findOne({ _id: id }).exec();
}

async function readAll() {
  return Branch.find().exec();
}

async function addCar(id, car) {
  return Branch.updateOne(
    { _id: id },
    {
      $push: {
        cars: car
      }
    }
  ).exec();
}

module.exports = {
  create,
  read,
  readAll,
  addCar
};