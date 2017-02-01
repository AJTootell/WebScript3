var
debugging = false,	//run with 'node artifact/server on' to see debugging messages
express = require('express'),
app = express(),
util =  require('./util.js'),
mysql = require('mysql');
//check if there is an additional argument, if it is on the console.log debugs
if(process.argv.length == 3){
  util.debugable(process.argv[2])
}

app.get('/', function(req,res){
  res.sendFile("webPages/index.html");
});


app.get('/testDB', function(req, res) {

});

app.listen(8080);
