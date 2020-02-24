const services = require('../services');

async function create(req, res, next) {
  try {
    const data = req.body;

    const branch = await services.Branch.create({
      name: data.name,
      location: data.location,
      headquarter: data.headquarter
    });

    res.status(200).json(branch);
  } catch (error) {
    next(error);
  }
}

async function list(req, res, next) {
  try {
    const branches = await services.Branch.readAll();

    res.status(200).json(branches);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  list
};