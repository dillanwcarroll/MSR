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

<<<<<<< HEAD
router.get('/login', (req, res) => {
    res.render('login')
=======
router.get('/portfolio', (req, res) => {
    res.render('portfolio')
>>>>>>> 01f5a2934e859a2124ca713a1c72b5bc434fc769
})