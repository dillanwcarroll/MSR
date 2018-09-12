const express = require('express')
//const dataAccess = require(__dirname + '/data_access')
const router = express.Router()
module.exports = router

router.get('/', (req, res) => {
    console.log('api test')
    dataAccess.test((result)=>{
        res.send('<h1>'+result[0]+'</h1>')
    })
})