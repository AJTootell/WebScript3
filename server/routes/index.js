express = require('express'),
app = express.Router(),
util =  require('../util.js'),
mysql = require('mysql'),
config = require('../config.json');

//render the home page using data from widget table in database
app.get('/', function(req, res) {

  util.debug("getting home page");

  util.queryDB('select * from widget', function(results){
    util.debug(results);
    res.render('index', { results: results });
  });

});

//insert new values into the widget table using form on home page
app.post('/insert', function(req, res) {

  var query = 'insert into widget(wid_name, wid_description) values (' + name + ', ' + description + ')'

  util.queryDB(query, function(results){
    util.debug(results);
  });
});

module.exports = app;
