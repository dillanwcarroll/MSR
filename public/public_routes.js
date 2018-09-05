const express = require('express')
const router = express.Router()
module.exports = router

//routes
router.get('/', (req, res) => {
    res.render('index', { title: 'My School Remembers' })
})

router.get('/search', (req, res) => {
    res.render('search', {title: 'My School Remembers'})
})


router.get('/login', (req, res) => {
    res.render('login', {title: 'My School Remembers'})
})