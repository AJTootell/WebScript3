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

function queryDB(query, datacb){

  var
  results,
  sqlCon = mysql.createConnection(config.mysql),
  good;

  sqlCon.on('error',function(err) {
    sqlCon.end();
  });

  sqlCon.query(query, function (err, data) {
    //debug(data);
    if(err) {
      //cb(err);
      console.error('failed to query', err);
      sql.end();
      good = false;
    } else{
      results = data;
    };

      sqlCon.end();
      good = true;
  });
  sqlCon.on('end',function(){datacb(results,good)});
}

module.exports.debugable = debugable;
module.exports.debug = debug;
module.exports.queryDB = queryDB;
