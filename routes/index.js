var express = require('express');
var router = express.Router();

var finishTime;
var cache = {};
var clickReset = 10 * 1000;
reset();

/* GET home page. */
router.get('/button', function(req, res, next) {
  var uwId = req.query['uwId'];
  var obj = { finishTime: finishTime };
  if (uwId && cache[uwId]) {
    obj.secondsClicked = cache[uwId].secondsClicked;
    var diff = (new Date().getTime()) - cache[uwId].lastClick.getTime();
    obj.canClick = diff >= clickReset;
  }
  res.json(obj);
});

router.get('/reset', function(req, res, next) {
  reset();
  res.json({ finishTime: finishTime });
});

router.get('/click', function (req, res, next) {
  var uwId = req.query.uwId;
  var secondsLeft = Math.ceil((finishTime.getTime() - (new Date().getTime())) / 1000);

  if (uwId && cache[uwId]) {
    var diff = (new Date().getTime()) - cache[uwId].lastClick.getTime();
    var canClick = diff >= clickReset;
    if (!canClick) {
      res.json({ finishTime: finishTime });
      return;
    }
  }

  cacheData = {
    lastClick: new Date(),
    secondsClicked: secondsLeft
  };
  cache[uwId] = cacheData;

  reset();
  res.json({
    finishTime: finishTime,
    secondsClicked: secondsLeft,
    canClick: false
  });
});

function reset() {
  finishTime = new Date();
  finishTime.setTime(finishTime.getTime() + (1000 * 60));
}

module.exports = router;
