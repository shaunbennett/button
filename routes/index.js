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
  finishTime.setTime(finishTime.getTime() + (1000 * 60));
}

module.exports = router;
