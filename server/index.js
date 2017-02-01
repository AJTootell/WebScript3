var
debugging = false,	//run with 'node artifact/server on' to see debugging messages
express = require('express'),
app = express(),
util =  require('./util.js'),
mysql = require('mysql');
//check if there is an additional argument, if it is on the console.log debugs
if(process.argv.length == 3){
  util.debugable(process.argv[2])
}

app.listen(8080);

app.use('/', express.static('webPages', { extensions: ['html'] }));


app.get('/testDB', function(req, res) {

  //connect to sql database
  var sqlC = mysql.createConnection(config.mysql)
  sqlC.on('error', errcb(err) {
    sqlC.end()
  })

  (process.env.DATABASE_URL, function(err, client) {
    if (err) throw err;

    var #query = #sqlConnection.format(#sqlQuerye.g.'Insert into table set ? ;', #objectToReplace?)
#sqlConnection(#query, function(err,data){
if (err){
  #callback(err)
}else if(data == null){
  #callback('empty')
}
else{
  #callback(,data)
  data.forEach(#functionAppliedToEachItemInList(row){
    row.#rowName
  })
}
#sqlConnection.end()
})
    //if connects create array of tables content
    client
    .query('SELECT * FROM layout ORDER BY id ASC')
    .on('row', function(row) {
      results.push(row);
    })
    //when get to end of the table render the page using list of results to populate
    .on('end', function(){
      res.render('index', { list: results });
    });
  });
});
