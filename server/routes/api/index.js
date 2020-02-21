const router = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const headquarterRoutes = require('./headquarter');
const branchRoutes = require('./branch');
const carRoutes = require('./car');
const driverRoutes = require('./driver');
const bookingRoutes = require('./booking');
const reportsRoutes = require('./reports');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/headquarter', headquarterRoutes);
router.use('/branch', branchRoutes);
router.use('/car', carRoutes);
router.use('/driver', driverRoutes);
router.use('/booking', bookingRoutes);
router.use('/reports', reportsRoutes);

module.exports = router;