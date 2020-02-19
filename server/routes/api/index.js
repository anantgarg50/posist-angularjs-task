const router = require('express').Router();

const usersRoutes = require('./users');
const headquartersRoutes = require('./headquarters');
const branchesRoutes = require('./branches');
const carsRoutes = require('./cars');
const driversRoutes = require('./drivers');
const bookingsRoutes = require('./bookings');
const reportsRoutes = require('./reports');

router.use('/users', usersRoutes);
router.use('/headquarters', headquartersRoutes);
router.use('/branches', branchesRoutes);
router.use('/cars', carsRoutes);
router.use('/drivers', driversRoutes);
router.use('/bookings', bookingsRoutes);
router.use('/reports', reportsRoutes);

module.exports = router;