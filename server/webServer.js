var
debugging = false;	//run with 'node server/webServer on' to see debugging messages

const
express = require('express'),
app = express(),
index = require('./routes/index.js'),
//home = require('./routes/home.js'),
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

app.use(express.static('../client'));

app.get('/styleSheet', index);
app.get('/index', index);

app.get('/', function(req, res) {

  util.debug("getting home page");
  var info = [];
  util.queryDB('select * from widget', function(data,good){
    if (good) {
      util.debug("Data: ");
      util.debug(data);
      res.status = 200;
      data.forEach(function(row){
        info.push(row);
      });
      util.debug("Info: ");
      util.debug(info);
      res.render('index', { results: info });
    } else {
      res.status = 500;
    }
  });
});


app.post('/insert', function(req, res) {

  util.debug("inserting");

  var
  name = req.query.name,
  desc = req.query.desc;

  var query = 'insert into widget(wid_name, wid_description) values (' + name + ', ' + desc + ')'

  util.queryDB(query, function(results,good){
    if (good){
      util.debug("Results: ");
      util.debug(results);
      res.status = 200;
    } else {
      res.status = 500;
    }
  });
});

app.listen(8080);
