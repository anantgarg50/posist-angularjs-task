const { Headquarter } = require('../database').models;

async function create(data) {
  return new Headquarter(data).save();
}

async function read(id) {
  return Headquarter.findOne({ _id: id }).exec();
}

async function readAll() {
  return Headquarter.find().exec();
}

async function addBranch(id, branch) {
  return Headquarter.updateOne(
    { _id: id },
    {
      $push: {
        branches: branch
      }
    }
  ).exec();
}

module.exports = {
  create,
  read,
  readAll,
  addBranch
};