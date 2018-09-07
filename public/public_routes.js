const express = require('express')
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
    res.render('messageSent', req.query)
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/portfolio', (req, res) => {
    res.render('portfolio')
})

router.get('/search', (req, res) => {

    const search = require(__dirname + '/aif-search')

    var listings = search.search(req.query.term, (err,listings)=>{
        console.log(listings)
        res.render('search', {listings : listings})
    })
})