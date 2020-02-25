const router = require('express').Router();

const controllers = require('../../controllers');

router.get('/generate', controllers.Reports.generateReport);

module.exports = router;