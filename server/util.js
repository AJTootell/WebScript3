var
debugging,
mysql = require('mysql'),
config = require('./config.json'),
fs = require('fs')
http = require('http');

//turn on debugging
function debugable(state){
  if(state == 'on'){
    debugging = true;
    debug('Debugging turned on');
  }
}

//if debugging has been turned on will log else will do nothing
function debug(text){
  if(debugging == true){
    console.log(text);
  }
}

//open connection to sql database, run given query and run callback with err, data
function queryDB(query, datacb){

  var
  results,
  sqlCon = mysql.createConnection(config.mysql),
  broke;

  sqlCon.on('error',function(err) {
    sqlCon.end();
  });

  sqlCon.query(query, function (err, data) {
    //debug(data);
    if(err) {
      //cb(err);
      console.error('failed to query', err);
      sql.end();
      broke = true;
    } else{
      results = data;
    };

      sqlCon.end();
      broke = false;
  });
  sqlCon.on('end',function(){datacb(broke,results)});
}

function getHome(req, res) {

 debug("getting home page");
 queryDB('select * from widget', function(err, data){
   if (!err) {

     debug("Data: ");
     debug(data);

     res.render('index', { results: data });
   } else {
     res.status = 500;
   }
 });
}

function insertWidget(req, res) {

  debug("inserting");

  var
  name = req.query.name,
  desc = req.query.desc;

  var query = 'insert into widget(wid_name, wid_description) values (' + name + ', ' + desc + ')'

  queryDB(query, function(err, data){
    if (!err){
      debug("Results: ");
      debug(data);

      res.status = 200;

      getHome(req, res)
    } else {
      res.status = 500;
    }
  });
}

function getWeather(req,res){

  var
  data = fs.readFileSync('server/weather.json'),
  info = JSON.parse(data),
  forecast = [],
  earliestForecast = new Date(info.list[0].dt_txt),
  today = new Date();
  if(today.getTime() <= earliestForecast){
    refreshWeatherData(/*getweather(req,res)*/);
  }else{
    info.list.forEach(function (row){
      var weather = {
        temp: row.main.temp,
        seaLevel: row.main.sea_level,
        description: row.weather[0].description,
        clouds: row.clouds.all,
        windSpeed: row.wind.speed,
        dateTime: row.dt_txt
      }

      forecast.push(weather);
      //debug(weather);
    });

    debug(forecast);
    res.send(JSON.stringify(forecast));
  }
}

function refreshWeatherData(cb){
  var url = "http://api.openweathermap.org/data/2.5/weather?id=2639996&APPID=0140a1756d7cd125eca1c034c43027b5&units=metric";
  //var forecast;

  http.get(url,function() {
    fs.writeFileSync('server/weather.json', JSON.stringify(xhr.responseText), 'utf8', function(err) {
      if (err) throw err;
      debug("Weather saved");
      if(cb != undefined)
        cb();
    });
  });

}

module.exports.getHome = getHome;
module.exports.insertWidget = insertWidget;
module.exports.getWeather = getWeather;

module.exports.debugable = debugable;
module.exports.debug = debug;
module.exports.queryDB = queryDB;
