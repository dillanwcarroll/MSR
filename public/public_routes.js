var express = require('express')
var multer = require('multer')
const dataAccess = require(__dirname + '/data_access')
var router = express.Router()
// var storage = multer.memoryStorage();
// var upload = multer({storage: storage})
// you can get the buffer from command like req.files[0].buffer

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/static/uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
        //+ '-' + Date.now()
    }
});

var upload = multer({ storage: storage })
//var upload = multer({ storage: storage })

//routes
router.get('/', (req, res) => {
    res.render('index')
})

router.get('/about', (req, res) => {
    res.render('about')
})

router.post('/login', (req, res) => {
    console.log("--------------------");

    dataAccess.studentlogin(req.body, (results) =>{

        resultFound = false;
        if(results.length > 0)
        {
            if (req.body.form_username == results[0].Username && req.body.form_password == results[0].Password)
            {
                console.log("Login is fookin successful!")
                res.render('student_dashboard');
                resultFound = true;
            }
        }
        

        if(!resultFound)
        {
            console.log("Login Failed");
            res.render('index')
        }
    })
})

router.get('/contact', (req, res) => {
    res.render('contact')
})

router.get('/messageSent', (req, res) => {
    res.render('messageSent')
})

router.get('/portfolioSaved', (req, res) => {
    res.render('portfolioSaved')
})

router.get('/addContent', (req, res) => {
    res.render('addContent')
})

router.post('/addContent', upload.single('upload'), (req, res) => {
    res.render('addContent')
    console.log("File upload sucessfully.");
})

router.get('/login', (req, res) => {
    res.render('login')
})


router.get('/teacherlogin', (req, res) => {
    res.render('teacherlogin')
})


router.get('/test', (req, res) => {
    res.render('test')
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

router.get("/basicInfo", (req, res) => {
    res.render("basicInfo");
});

router.get("/student_dashboard", (req, res) => {
    res.render("student_dashboard");
});

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

router.get('/editSlideshow', (req, res) => {
    res.render('editSlideshow')
})

module.exports = router