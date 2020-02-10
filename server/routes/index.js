const router = require('express').Router();

const dummyRoutes = require('./dummy');

router.use('/dummy', dummyRoutes);

module.exports = router;