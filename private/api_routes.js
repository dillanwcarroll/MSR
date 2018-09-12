const express = require('express')
const router = express.Router()
module.exports = router

router.get('/', (req, res) => {
    console.log('api test')
    dataAccess.test((result)=>{
        res.send('<h1>'+result[0]+'</h1>')
    })
})

router.get('/:id', (req, res) => {
    var Portfolio = {}

    dataAccess.getPortfolioByID(req.params.id, (resultP)=>{
        Portfolio.slides = resultP;
    })

    dataAccess.getSlidesByID(req.params.id, (resultS)=>{
        Portfolio.slides = resultS;
        res.render('portfolio')
    })
})



















