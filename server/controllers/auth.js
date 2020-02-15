const { User } = require('../database/models');

function googleAuthSuccess(req, res) {
  User.findOne({
    email: req.user._json.email
  }, function (err, user) {
    if (err) {
      console.error(err);
    }

    if (user) {
      res.writeHead(302, {
        'Location': `http://localhost:5000/pages/success.html?token=${user.token}`
      });
    }

    res.end();
  });
}

function googleAuthFailure(req, res) {
  res.end();
}

function logout(req, res) {
  User.updateOne({
    token: req.body.token
  }, {
    $set: {
      token: ''
    }
  }, function (err) {
    if (err) {
      console.error(err);
    }
  });

  res.status(200).json({ message: 'logout success!' });
}

module.exports = {
  googleAuthSuccess,
  googleAuthFailure,
  logout
};
