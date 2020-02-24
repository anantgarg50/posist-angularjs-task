const router = require('express').Router();

const controllers = require('../../controllers');

router.post('/create', controllers.Booking.create);
router.post('/complete', controllers.Booking.complete);
router.get('/listCurrentBookings', controllers.Booking.listCurrentBookings);
router.get('/listEndedBookings', controllers.Booking.listEndedBookings);

module.exports = router;