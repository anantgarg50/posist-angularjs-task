const router = require('express').Router();

const controllers = require('../../controllers');

router.get('/profile', controllers.User.getProfile);
router.get('/listBookings', controllers.User.listBookings);

module.exports = router;