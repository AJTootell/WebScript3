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

function queryDB(query, callback){

  var results = [],
  sqlCon = mysql.createConnection(config.mysql);

  sqlCon.on('error',function(err) {
    sqlCon.end();
  });

  sqlCon.query(query, function (err, data) {
    if(err) {
      cb(err);
      console.error('failed to query', err);
      sql.end();
    } else{
      data.forEach(function(row){
        results.push(row);
      });

      sqlCon.end();
    }
  });
  sqlCon.on('end',function(){callback(results)});
}

module.exports.debugable = debugable;
module.exports.debug = debug;
module.exports.queryDB = queryDB;
