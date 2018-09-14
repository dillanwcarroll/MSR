const Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config = {
    userName: 'thaAIDSTAR',
    password: 'Password1_',
    server: 'aidansserver.database.windows.net',
    // If you are on Microsoft Azure, you need this:
    options: { encrypt: true, database: 'msr-data', useColumnNames: true, rowCollectionOnDone: true }
};

var connectToServer = function (request) {
    var connection = new Connection(config);
    connection.on('connect', function (err) {
        // If no error, then good to proceed.  
        console.log("Connected");
        connection.execSqlBatch(request)
    });
    connection.on('end', function () {
        console.log("Connection Closed");
    });
    return connection
}

let DatabaseRequest = (query, callback) => {
    request = new Request(query, function (err, rowCount, rows) {
        if (err) {
            console.log(err)
        }
        else {
            console.log('Request Created')
        }
    })
    request.on('error', function (err) {
        console.log(err);
    });
    request.on('done', function (rowCount, more, rows) {
        //Remove metadata
        rows.forEach(row => {
            for (const property in row) {
                if (row.hasOwnProperty(property)) {
                    row[property] = row[property].value
                }
            }
        });
        callback(rows)
        console.log('Data Acquired')
    })
    request.on('requestCompleted', function () {
        this.connection.close()
    })
    connectToServer(request);
};

let getPortfolioByID = (id, callback) => {
    DatabaseRequest("SELECT * FROM Portfolio WHERE PortfolioID = '" + id + "'", callback)
};

let getSlidesByID = (id, callback) => {
    DatabaseRequest("SELECT * FROM Slide INNER JOIN Media ON Slide.MediaID = Media.MediaID WHERE PortfolioID = '" + id + "'", callback)
};

let getMediaByID = (id, callback) => {
    DatabaseRequest("SELECT * FROM Media WHERE MediaID = '" + id + "'", callback)
};

let profileSearch = (params, callback) => {
    //console.log('params: ' + JSON.stringify(params))
    var query = 'SELECT PortfolioID,Name,Address,Regiment,Battalion FROM Portfolio WHERE 1=1'
        query += params.name != "" ? ` AND UPPER(Name) LIKE '%${params.name.toUpperCase()}%'` : ''
        query += params.place != "" ? ` AND UPPER(Address) LIKE '%${params.place.toUpperCase()}%'` : ''
        query += params.regNum != "" ? ` AND UPPER(Regiment) LIKE '${params.regNum.toUpperCase()}'` : ''
        query += params.battalion != "" ? ` AND UPPER(Battalion) LIKE '%${params.battalion.toUpperCase()}%'` : ''
    //console.log('QUERY: "' + query + '"')
    DatabaseRequest(query, callback)
}

module.exports = {
    getPortfolioByID: getPortfolioByID,
    getSlidesByID: getSlidesByID,
    getMediaByID: getMediaByID,
    profileSearch: profileSearch
}