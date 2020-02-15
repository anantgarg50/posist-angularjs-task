const router = require('express').Router();

const dummyRoutes = require('./dummy');
const authRoutes = require('./auth');

router.use('/dummy', dummyRoutes);
router.use('/auth', authRoutes);

module.exports = router;