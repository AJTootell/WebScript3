var
express = require('express'),
router = express.Router(),
path = require('path');

router.get('/styleSheet', function(req, res) {
  res.sendFile(path.join(__dirname, '../../client/CSS/','styleSheet.css'));
});

router.get('/index', function(req, res) {
  res.sendFile(path.join(__dirname, '../../client/JavaScript','index.js'));
});

module.exports = router;
