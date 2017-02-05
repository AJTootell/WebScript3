var
debugging = false,	//run with 'node server/webServer on' to see debugging messages
express = require('express'),
app = express(),
home = require('./routes/home'),
util =  require('./util.js');

//check if there is an additional argument, if it is on the console.log debugs
if(process.argv.length == 3){
  util.debugable(process.argv[2])
}

// view engine setup
app.set('views', './client/views');
app.set('view engine', 'hbs');

app.use('/', home);

app.listen(8080);
