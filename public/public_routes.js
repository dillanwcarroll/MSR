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

router.get('/portfolio', (req,res)=>{
    dataAccess.getAllPortfolios((results)=>{
        res.render('allPortfolios', {portfolios: results})
    })
})

router.get('/privacy', (req, res) => {
    res.render('privacy')
})

router.get('/portfolio/:id', (req, res) => {
        dataAccess.getPortfolioByID(req.params.id, (result)=>{completeQuery({portfolio: result})})
        dataAccess.getSlidesByID(req.params.id, (result)=>{completeQuery({slides: result})})

        var portfolio
        var slides

        let completeQuery = (result) =>{

            if(result.portfolio != null)portfolio = result.portfolio[0]
            if(result.slides != null)slides = result.slides
            if (portfolio != null && slides != null) {
                res.render('portfolio', {portfolio: portfolio, slides: slides})
            }
        }
})

router.get('/search', (req, res) => {
    const search = require(__dirname + '/aif-search')
    var params = {
        name: req.query.name || '',
        place: req.query.place || '',
        regNum: req.query.regNum || '',
        battalion: req.query.battalion || ''
    }

    var aifResult
    var portfolioResult
    let completeQuery = (result) =>{
        if (result.portfolioResult != undefined) portfolioResult = result.portfolioResult
        if (result.aifResult != undefined) aifResult = result.aifResult
        if (portfolioResult != undefined && aifResult != undefined) {
            res.render('search', {params: params, aifResults: aifResult, portfolioResults: portfolioResult })
        }
    }
    dataAccess.portfolioSearch(params, (results)=>{completeQuery({portfolioResult: results})})
    search.search(params, (err, listings) => {
        if (err) {
            consoel.log(err)
        }else{
            completeQuery({aifResult: listings})
        }
    })
})