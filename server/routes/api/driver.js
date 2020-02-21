const router = require('express').Router();

const controllers = require('../../controllers');

router.post('/create', controllers.Driver.create);
router.get('/list', controllers.Driver.list);

module.exports = router;