const router = require('express').Router();
const passport = require('passport');

const controllers = require('../controllers');

router.get('/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ]
}));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/auth/google/failure'
}), controllers.Auth.googleAuthSuccess);

router.get('/google/failure', controllers.Auth.googleAuthFailure);

router.post('/logout', controllers.Auth.logout);

module.exports = router;