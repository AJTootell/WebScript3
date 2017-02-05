var
debugging = false,	//run with 'node server/webServer on' to see debugging messages
express = require('express'),
app = express(),
routes = require('./routes'),
util =  require('./util.js'),
favicon = require('serve-favicon');

//check if there is an additional argument, if it is on the console.log debugs
if(process.argv.length == 3){
  util.debugable(process.argv[2])
}

// view engine setup
app.set('views', './client/views');
app.set('view engine', 'hbs');

app.use(favicon('./client/favicon.ico'));

app.use(express.static('./routes'));

app.use('/', routes);

app.listen(8080);
