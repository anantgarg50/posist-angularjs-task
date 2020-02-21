const router = require('express').Router();

const controllers = require('../../controllers');

router.post('/register', controllers.Auth.register);
router.post('/login', controllers.Auth.login);
router.get('/logout', controllers.Auth.logout);

module.exports = router;