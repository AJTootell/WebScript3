var
util = require(__dirname + '/../util.js')
fs = require('fs'),
http = require('http'),
path = require('path');

/*
trys to get the weatehr data from the json file and if can read it parse is or convert it then refreshes the data
*/

function getWidget(req,res){

  var
  data;
  //util.debug(JSON.parse(data));
  try{
    data = fs.readFileSync(__dirname + '/weather.json');
    JSON.parse(data);
    getWeather(req,res,data);
  }
  catch (e) {
    util.debug(e);
    util.debug("Refreashing weather data");
    refreshWeatherData(function(){getWidget(req,res)});
  }
}
/*
checks the age oof the data, if more than 3 hours off then updates and overwrites the data
if not out dated then convertsto an array of JSONs containg only required infroamtion
*/
function getWeather(req,res,data){

  util.debug("Getting weather data");

  var
  info = JSON.parse(data),
  forecast = [],
  earliestForecast = new Date(info.list[0].dt_txt),
  today = new Date();
  earliestForecast.setHours(earliestForecast.getHours()+3)
  util.debug(earliestForecast)
  util.debug(today)
  util.debug(earliestForecast < today)

  if(earliestForecast < today){
    util.debug("Updating weather data");
    refreshWeatherData(function(){getWidget(req,res)});
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
      //util.debug(weather);
    });

    //util.debug(forecast);
    res.send(JSON.stringify(forecast));
  }
}
/*
calls the weather data from the open weather map servers and saves it to a JSON file once aquired
*/
function refreshWeatherData(cb){
  var
  options = {
    hostname: "api.openweathermap.org",
    path: "/data/2.5/forecast?id=2639996&APPID=0140a1756d7cd125eca1c034c43027b5&units=metric",
    method: 'GET'
  },
  req = http.request(options,function(res) {
    var
    weather = "";
    util.debug(res.statusCode);
    res.setEncoding('utf8');

    res.on('data', function(data) {
      //util.debug(data);
      weather += data;
      util.debug("Weather saved");
    });

    res.on('end', function() {
      fs.writeFileSync(__dirname + '/weather.json', weather, 'utf8')
      util.debug('No more data in response.');
      cb(weather);
    });

  });

  req.end();

}

module.exports.getWidget = getWidget;
