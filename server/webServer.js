var
debugging = false;	//run with 'node server/webServer.js on' or 'npm run debug' to see server-side debugging messages

const
express = require('express'),
app = express(),
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

//allow use of favicon
app.use(favicon('./client/favicon.ico'));

app.use(express.static('../client'));

//get client side style sheet and javascript file
app.get('/styleSheet',  function(req, res) {
  res.sendFile(path.join(__dirname, '../client/CSS/','styleSheet.css'));
});
app.get('/index', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/JavaScript','index.js'));
});

//redirect calls to server to appropriate frunctions in util or widget folder
app.get('/', util.getLogIn);
app.get('/dashboard', util.getDashboard);
app.post('/createNewLayout', util.createNewLayout);
app.post('/addWidget', util.addWidget);
app.post('/removeWidget', util.removeWidget);
app.post('/newWidgetPosition', util.newWidgetPosition);
app.get('/weather', weather.getWidget);

app.listen(8080);
