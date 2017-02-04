express = require('express'),
app = express.Router(),
util =  require('../util.js'),
mysql = require('mysql'),
config = require('../config.json');

app.get('/', function(req, res) {
  var results = [];

  sqlCon = mysql.createConnection(config.mysql)

  sqlCon.on('error',function(err) {
    console.error(err);
    sqlCon.end();
  });

  sqlCon.query('select * from widget', function (err, data) {
    if(err) {
      cb(err);
      console.error('failed to get all dis stuff', err);
      sql.end();
      return;
    } else{
      data.forEach(function(row){
        results.push(row);
      });
      sqlCon.end();
    }
  });
  res.render('index', { list: 'results' });

});

module.exports = app;
