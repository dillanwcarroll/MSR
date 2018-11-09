const express = require('express')
const app = express()
var bodyParser = require('body-parser');
//Setup
app.set('view engine', 'pug')
app.set('views', __dirname + '\\public\\views')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connect route files
const apiRoutes = require(__dirname + '\\private\\api_routes')
const publicRoutes = require(__dirname + '\\public\\public_routes')

//Use route files
app.use('/api', apiRoutes)
app.use('/', publicRoutes)

//Serve static files
app.use('/', express.static(__dirname + '\\public\\static'))

//Start Server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Running on port ' + PORT))