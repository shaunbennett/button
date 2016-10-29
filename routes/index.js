var express = require('express');
var router = express.Router();

var finishTime;
var cache = {};
var clickReset = 10 * 1000;
reset();

/* GET home page. */
router.get('/button', function(req, res, next) {
  var uwId = req.params['uwId'];
  var obj = { finishTime: finishTime };
  if (uwId && cache[uwId]) {
    obj.secondsClicked = cache[uwId].secondsClicked;
    var diff = (new Date.now().getTime()) - cache[uwId].lastClick.getTime();
    obj.canClick = diff >= clickReset;
  }
  res.json(obj);
});

router.get('/reset', function(req, res, next) {
  reset();
  res.json({ finishTime: finishTime });
});

router.get('/click', function (req, res, next) {
  var uwId = req.params.uwId;
  var seconds = req.params.clickSeconds;
  cacheData = {
    lastClick: Date.now(),
    secondsClicked: seconds
  };
  cache[uwId] = cacheData;

  res.json({ finishTime: finishTime });
});

function reset() {
  finishTime = new Date();
  finishTime.setTime(finishTime.getTime() + (1000 * 60));
}

module.exports = router;
