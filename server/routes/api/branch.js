const router = require('express').Router();

const controllers = require('../../controllers');

router.post('/create', controllers.Branch.create);
router.get('/list', controllers.Branch.list);

module.exports = router;