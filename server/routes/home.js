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
  sqlCon.on('end', function(){
    console.log('rendering');
    console.log(results);
    res.render('index', { results: results });
  });

  sqlCon.query('select * from widget', function (err, data) {
    if(err) {
      cb(err);
      console.error('failed to get all dis stuff', err);
      sql.end();
    } else{
      console.log("data: ");
      console.log(data);
      data.forEach(function(row){
        console.log("row: ");
        console.log(row);
        results.push(row);
        console.log("results during: ");
        console.log(results)
      });

      sqlCon.end();
    }
  });
});

module.exports = app;
