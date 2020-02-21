const router = require('express').Router();

const controllers = require('../../controllers');

router.post('/create', controllers.Car.create);
router.get('/list', controllers.Car.list);

module.exports = router;