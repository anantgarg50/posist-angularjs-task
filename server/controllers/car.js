const services = require('../services');

async function create(req, res, next) {
  try {
    const data = req.body;

    const car = await services.Car.create({
      manufacturer: data.manufacturer,
      model: data.model,
      seatingCapacity: data.seatingCapacity,
      ratePerKilometer: data.ratePerKilometer,
      hourlyRate: data.hourlyRate,
      carRegNumber: data.carRegNumber,
      operatedBy: data.operatedBy,
      drivenBy: data.drivenBy
    });

    res.status(200).json(car);
  } catch (error) {
    next(error);
  }
}

async function list(req, res, next) {
  try {
    const cars = await services.Car.readAll();

    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  list
};