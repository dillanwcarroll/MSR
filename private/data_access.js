const Connection = require('tedious').Connection;

var config = {
    userName: 'MsrUser',
    password: 'MsrPass1',
    server: 'msrsql.database.windows.net',
    // If you are on Microsoft Azure, you need this:
    options: { encrypt: true, database: 'MsrDatabase', useColumnNames: true, rowCollectionOnDone: true }
};
var connection = new Connection(config);
connection.on('connect', function (err) {
    // If no error, then good to proceed.  
    console.log("Connected");
});

var Request = require('tedious').Request;

let test = (callback) => {
    request = new Request("SELECT * FROM Portfolio", function (err, rowCount, rows) {
        if (err) {
            console.log(err)
        }
        else {
            console.log('request created')
        }
    })
    request.on('error', function (err) {
        console.log(err);
    });
    request.on('done', function (rowCount, more, rows) {
        console.log(rowCount)
        console.log(rows);
        callback(rows)
    })
    connection.execSqlBatch(request);
};


module.exports = {
    test: test
}