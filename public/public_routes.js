const express = require('express')
const router = express.Router()
var bodyParser = require('bodyParser')
module.exports = router

//routes
router.get('/', (req, res) => {
    res.render('index', { title: 'My School Remembers' })
})

router.get('/search', (req, res) => {
    res.render('search', {title: 'My School Remembers'})
})

router.get('/about', (req, res) => {
    res.render('about', {title: 'My School Remembers'})
})

router.get('/contact', (req, res) => {
    res.render('contact', {title: 'My School Remembers'})
})

router.get('/messageSent', (req, res) => {
    console.log(req.params[0])
    res.render('messageSent', {title: 'My School Remembers'})
})