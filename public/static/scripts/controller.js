var Connection = require('tedious').Connection;

var config = {  
    userName: 'thaAIDSTAR',  
    password: 'Sonic123',  
    server: 'aidansserver.database.windows.net',  
    // If you are on Microsoft Azure, you need this:
    options: {encrypt: true, database: 'ChallengeData'}     
};  
var connection = new Connection(config);  
connection.on('connect', function(err) {  
    // If no error, then good to proceed.  
    console.log("Connected");  
    executeStatement();  
});  

var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  

exports.thing = function executeStatement() {  
    request = new Request("SELECT * FROM Client", function(err) {  
    if (err) {  
        console.log(err);}  
    });  
    var result = "";  
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === null) {  
            console.log('NULL');  
          } else {  
            result+= column.value + " ";  
          }  
        });  
        document.getElementById("baseInfo").innerHTML = result
        result ="";  
    });  
    connection.execSql(request);  
}