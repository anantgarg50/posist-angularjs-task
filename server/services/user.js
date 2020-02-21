const { User } = require('../database').models;

async function create(data) {
  const user = new User({
    name: data.name,
    email: data.email
  });

  user.setPassword(data.password);

  return user.save();
}

async function read(id) {
  return User.findOne({ _id: id }).exec();
}

module.exports = {
  create,
  read
};