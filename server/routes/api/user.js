const router = require('express').Router();

const controllers = require('../../controllers');

router.get('/profile/:id', controllers.User.getProfile);

module.exports = router;