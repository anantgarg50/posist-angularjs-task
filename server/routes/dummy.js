const router = require('express').Router();

router.get('/', (req, res) => {
  res.send("Dummy GET");
});

router.post('/', (req, res) => {
  res.json({
    message: 'Dummy POST'
  });
});

module.exports = router;