const router = require('express').Router();

const controllers = require('../../controllers');

router.post('/create', controllers.Booking.create);
router.post('/list', controllers.Booking.list);

module.exports = router;