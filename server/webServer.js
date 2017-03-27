var
debugging = false;	//run with 'node server/webServer on' to see debugging messages

const
express = require('express'),
app = express(),
index = require('./routes/index.js'),
util =  require('./util.js'),
favicon = require('serve-favicon'),
weather = require('./widgets/weather.js');

//check if there is an additional argument, if it is on the console.log debugs
if(process.argv.length == 3){
  util.debugable(process.argv[2])
}

// view engine setup
app.set('views', './client/views');
app.set('view engine', 'hbs');

app.use(favicon('./client/favicon.ico'));

app.use(express.static('../client'));

app.get('/styleSheet', index);
app.get('/index', index);

app.get('/', util.getHome);
app.post('/insert', util.insertWidget);
app.get('/weather', weather.getWidget);

app.listen(8080);
