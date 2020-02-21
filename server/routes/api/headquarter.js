const router = require('express').Router();

const controllers = require('../../controllers');

router.post('/create', controllers.Headquarter.create);
router.get('/list', controllers.Headquarter.list);

module.exports = router;