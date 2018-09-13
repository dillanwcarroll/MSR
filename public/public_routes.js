const express = require('express')
const dataAccess = require(__dirname + '/data_access')
const router = express.Router()


module.exports = router

//routes
router.get('/', (req, res) => {
    res.render('index')
})

router.get('/about', (req, res) => {
    res.render('about')
})

router.get('/contact', (req, res) => {
    res.render('contact')
})

router.get('/messageSent', (req, res) => {
    res.render('messageSent')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/slideshow', (req, res) => {
    res.render('slideshow')
})

router.get('/portfolio/:id', (req, res) => {
    dataAccess.getSlidesByID(req.params.id, (resultS)=>{
        var slides = resultS;

        res.render('portfolio', {slides : slides})
    })
})

router.get('/privacy', (req, res) => {
    res.render('privacy')
})

router.get('/search', (req, res) => {
    const search = require(__dirname + '/aif-search')
    var params = {
        name: req.query.name || '',
        place: req.query.place || '',
        regNum: req.query.regNum || '',
        battalion: req.query.battalion || ''
    }
    var listings = search.search(params, (err, listings) => {
        res.render('search', { listings: listings, params: params })
    })
})