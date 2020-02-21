const services = require('../services');

async function create(req, res, next) {
  try {
    const data = req.body;

    const driver = await services.Driver.create({
      name: data.name,
      age: data.age,
      permanentAddress: data.permanentAddress
    });

    res.status(200).json(driver);
  } catch (error) {
    next(error);
  }
}

async function list(req, res, next) {
  const { allocated } = req.query;

  try {
    const drivers = await services.Driver.readAll(allocated);

    res.status(200).json(drivers);
  } catch (error) {
    next(error);
  }
}


module.exports = {
  create,
  list
};