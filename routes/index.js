var express = require('express');
var router = express.Router();

var finishTime;
reset();

/* GET home page. */
router.get('/button', function(req, res, next) {
  res.json({ finishTime: finishTime });
});

router.get('/reset', function(req, res, next) {
  reset();
  res.json({ finishTime: finishTime });
});

function reset() {
  finishTime = new Date();
  finishTime.setMilliseconds(finishTime.getMilliseconds() + (1000 * 60 * 60));
}

module.exports = router;
