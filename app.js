const express = require('express')
const app = express()

//Setup
app.set('view engine', 'pug')
app.set('views', __dirname + '\\public\\views')

//Connect route files
const apiRoutes = require(__dirname + '\\api\\api_routes')
const publicRoutes = require(__dirname + '\\public\\public_routes')

//Use route files
app.use('/api', apiRoutes)
app.use('/', publicRoutes)

//Serve static files
app.use('/', express.static(__dirname + '\\public\\static'))

//Start Server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log('Running on port ' + PORT))