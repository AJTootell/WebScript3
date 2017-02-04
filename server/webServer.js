var
debugging = false,	//run with 'node artifact/server on' to see debugging messages
express = require('express'),
app = express(),
util =  require('./util.js'),
mysql = require('mysql'),
config = require('./config.json');
//check if there is an additional argument, if it is on the console.log debugs
if(process.argv.length == 3){
  util.debugable(process.argv[2])
}

app.use('/', express.static('webPages', { extensions: ['html'] }));


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
      res.render('index', { list: results });
      sql.end();
    }
  });

});

app.listen(8080);
