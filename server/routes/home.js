var
express = require('express'),
router = express.Router(),
util =  require('../util.js');

//render the home page using data from widget table in database
router.use('/', function(req, res) {

  util.debug("getting home page");

  util.queryDB('select * from widget', function(results){
    util.debug(results);
    res.render('index', { results: results });
  });

});

//insert new values into the widget table using form on home page
router.post('/insert', function(req, res) {

  util.debug("inserting");

  var
  name = req.query.name,
  desc = req.query.desc;

  util.debug("inserting");
  var query = 'insert into widget(wid_name, wid_description) values (' + name + ', ' + desc + ')'

  util.queryDB(query, function(results){
    util.debug(results);
    res.sendStatus(200);
  });
});

module.exports = router;
