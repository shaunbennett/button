var express = require('express');
var router = express.Router();

var timeLeft = 
/* GET home page. */
router.get('/button', function(req, res, next) {
  res.json({ timeLeft: 1000 * 60 });
});

module.exports = router;
