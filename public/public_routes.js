const express = require('express')
const router = express.Router()
module.exports = router

//routes
router.get('/', (req, res) => {
    res.render('index', { title: 'My School Remembers' })
})