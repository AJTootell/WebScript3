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
  debug("\nQuery ran: " + query);
  var
  results,
  sqlCon = mysql.createConnection(config.mysql),
  broke;

  sqlCon.on('error',function(err) {
    debug(err);
    sqlCon.end();
  });

  sqlCon.query(query, function (err, data) {
    debug("Querying");
    //debug(data);
    if(err) {
      //cb(err);
      throw err;
      broke = true;
      sqlCon.end();
    } else{
      /*data.forEach(function(row){
      debug("Results: "+JSON.stringify(row));
    });*/
    results = data;
    debug(JSON.stringify(results));
    broke = false;
    sqlCon.end();
  };
});
sqlCon.on('end',function(){datacb(broke,results)});
}

/*
███████ ███████ ██████  ██    ██ ███████ ██████      ███████ ██    ██ ███    ██  ██████ ████████ ██  ██████  ███    ██ ███████
██      ██      ██   ██ ██    ██ ██      ██   ██     ██      ██    ██ ████   ██ ██         ██    ██ ██    ██ ████   ██ ██
███████ █████   ██████  ██    ██ █████   ██████      █████   ██    ██ ██ ██  ██ ██         ██    ██ ██    ██ ██ ██  ██ ███████
-----██ ██      ██   ██  ██  ██  ██      ██   ██     ██      ██    ██ ██  ██ ██ ██         ██    ██ ██    ██ ██  ██ ██      ██
███████ ███████ ██   ██   ████   ███████ ██   ██     ██       ██████  ██   ████  ██████    ██    ██  ██████  ██   ████ ███████
*/

function getLogIn(req,res){

  debug("\nGetting log in page");

  queryDB('select * from layout;', function(err,data){
    if(err){
      res.status = 500;
      return;
    }

    res.status = 200;
    res.render('logIn', {allLayouts: data});
  });
}

function createNewLayout(req,res){

  debug("\nCreating a new layout");

  var
  layName = req.query.layoutName,
  query = 'insert into layout(lay_name, lay_imageBack, lay_imageOrHex) values ("' + layName +'", false, "#aa00aa");';

  queryDB(query,function(err,data){
    if(err){
      res.status = 500;
      return;
    }

    var query = 'select * from layout where lay_name = "'+layName+'";';

    queryDB(query,function(err,data){
      if(err){
        res.status = 500;
        return;
      }
      layoutId = data[0].lay_id;
      res.status = 200;
      debug("Layout added");
      //res.redirect("/dashboard?layout="+layoutId);
      res.send();
    });
  });
}

function getDashboard(req, res) {

  debug("\nGetting layout");
  // mysql.format()
  var layId = req.query.layout;

  debug("Layout Id: " + layId);

  if(layId == '' || layId == undefined || layId == "undefined"){
    debug("Layout: " + layId + " is invalid");
    res.redirect("/");
    res.status = 404;
    return;
  }

  var query = 'select * from layout where lay_id = ' + layId + ';';

  queryDB(query, function(err,data){
    if(err){
      res.status = 500;
      return;
    }
    var thisLayout = data[0];
    queryDB('SELECT * FROM layoutWidget natural join widget WHERE lay_id = ' + layId + ';', function(err, data){
      if(err){
        res.status = 500;
        return;
      }
      var layoutWidget = data;
      queryDB('select * from widget;', function(err, data){
        if(err){
          res.status = 500;
          return;
        }
        var widgets = data;
        queryDB('select * from layout;', function(err, data){
          if(err){
            res.status = 500;
            return;
          }
          var layouts = data;
          res.status = 200;

          res.render('index', {theseWidgets: layoutWidget , allWidgets: widgets , allLayout: layouts, thisLayout: thisLayout });

        });

      });

    });

  });
}

function addWidget(req, res) {

  debug("\nAdding a widget");

  var
  widgetId = req.query.widgetId,
  layoutId = req.query.layoutId;

  debug("Widget id: "+widgetId);
  debug("Layout id:"+layoutId);

  var query = 'insert into layoutWidget(lay_id,wid_id,laywid_x,laywid_y) values ('+layoutId+','+widgetId+',0,0);';

  queryDB(query, function(err, data){
    if(err){
      res.statuscode = 500;
      return;
    }

    res.status = 200;
    debug("Widget added");
    res.redirect("/dashboard?layout="+layoutId);
    res.send();
  });
}

function removeWidget(req,res){

  debug("\nRemoving a widget")
  var
  widgetId = req.query.widgetId,
  layoutId = req.query.layoutId,
  query = 'delete from layoutWidget where laywid_id = '+widgetId+' and lay_id = '+layoutId+';';

  queryDB(query, function(err, data){
    if(err){
      res.statuscode = 500;
      return;
    }

    res.status = 200;
    debug("Widget removed");
    res.redirect("/dashboard?layout="+layoutId);
    res.send();
  });
}

function newWidgetPosition(req,res){

  debug("\nRepositioning a widget");
  var
  xPos = req.query.xPos,
  yPos = req.query.yPos,
  laywidId = req.query.laywid,
  query = 'update layoutWidget set laywid_x = "' + xPos +
  '", laywid_y = "' + yPos +
  '" where laywid_id = ' + laywidId +';';

  queryDB(query,function(err,data){
    if(err){
      res.statuscode = 500;
      return;
    }
    res.statuscode = 200;
  });

}

module.exports.getLogIn = getLogIn;
module.exports.createNewLayout = createNewLayout;
module.exports.getDashboard = getDashboard;
module.exports.addWidget = addWidget;
module.exports.removeWidget = removeWidget;
module.exports.newWidgetPosition = newWidgetPosition;

module.exports.debugable = debugable;
module.exports.debug = debug;
module.exports.queryDB = queryDB;
