const services = require('../services');

async function create(req, res, next) {
  try {
    const data = req.body;

    const headquarter = await services.Headquarter.create({
      name: data.name,
      location: data.location
    });

    res.status(200).json(headquarter);
  } catch (error) {
    next(error);
  }
}

async function list(req, res, next) {
  try {
    const headquarters = await services.Headquarter.readAll();

    res.status(200).json(headquarters);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  list
};