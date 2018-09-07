const express = require('express')
const router = express.Router()

module.exports = router

//routes
router.get('/', (req, res) => {
    res.render('index')
})

router.get('/search', (req, res) => {
    res.render('search')
})

router.get('/about', (req, res) => {
    res.render('about')
})

router.get('/contact', (req, res) => {
    res.render('contact')
})

router.get('/messageSent', (req, res) => {
    res.render('messageSent', req.query)
})
router.get('/slideshow', (req, res) => {
    res.render('slideshow', req.query)
})