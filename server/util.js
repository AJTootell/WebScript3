var
debugging,
mysql = require('mysql'),
config = require('./config.json');

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
      sqlCon.end();
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

 debug("getting testing page");
// mysql.format()
  var layId = req.query.layout;
  queryDB('select * from layout where lay_id = ' + layId, function(err,data){
    if(!err){
      debug(data[0]);
      var thisLayout = data[0]
      queryDB('select * from widget join layoutWidget on widget.wid_id where lay_id = ' + layId, function(err, data){
        if (!err) {
          var layoutWidget = data;
          queryDB('select * from widget', function(err, data){
            if(!err){
              var widgets = data;
              queryDB('select * from layout', function(err, data){
                if(!err){
                  var layouts = data;
                  res.status = 200;

                  res.render('index', {theseWidgets: layoutWidget , allWidgets: widgets , allLayout: layouts, thisLayout: thisLayout });
                  res.send(thisLayout);
                } else{
                  res.status = 500;
                }
              });
            } else{
              res.status = 500;
            }
          });
        } else {
          res.status = 500;
        }
      });
    } else {
      res.status = 500;
    }
  });
}

function addWidget(req, res) {

  debug("adding");

  var
  widget = req.query.widget,
  layout = req.query.layout;
  debug(widget);
  debug(layout);

  var query = 'insert into layoutWidget(lay_id,wid_id,laywid_x,laywid_y) values ('+layout+','+widget+',0,0);';

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

module.exports.getHome = getHome;
module.exports.addWidget = addWidget;

module.exports.debugable = debugable;
module.exports.debug = debug;
module.exports.queryDB = queryDB;
