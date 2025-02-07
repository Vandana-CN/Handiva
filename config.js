var mysql      = require('mysql');
var connection = mysql.createPool({
  connectionLimit: 5,
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'emarket'

});
connection.getConnection(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database", err);
}
});
module.exports = connection; 