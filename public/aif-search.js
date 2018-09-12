const request = require('request')
const cheerio = require('cheerio')
const CircularJSON = require('circular-json')
const baseplace = 'https://www.aif.adfa.edu.au'

let search = function(params, callback) {
    var url = baseplace+`/search?type=search&name=${params.name}&regNum=${params.regNum}&place=${params.place}&townOnly=y`
    console.log('searching AIF for: ' + params + ' @ ' + url)
    var listings = []
    request(url, (err, res, body) => {
        if(err){
            return callback(err, null)
        } else {
            var $ = cheerio.load(body)
            $('tr').each((index, element) => {
                if ($('tr').length-1 != index) {

                    var regNum = element.childNodes[1].firstChild
                    var name = element.childNodes[2].firstChild
                    var place = element.childNodes[3].firstChild
                    var battalion = element.childNodes[4].firstChild
                    var href = ''

                    if (regNum !== null) regNum = regNum
                    if (name !== null) name = name
                    if (place !== null) place = place
                    if (battalion !== null) battalion = battalion.firstChild

                    if (regNum !== null) regNum = regNum.data
                    if (name !== null) {
                        href = baseplace + name.attribs.href
                        name = name.firstChild.data
                    }
                    if (place !== null) place = place.data
                    if (battalion !== null) battalion = battalion.data                
                    
                    listings.push({
                        regNum : regNum,
                        name : name,
                        place : place,
                        battalion : battalion,
                        href: href
                    })
                }
            })
            console.log(listings)
            return callback(null, listings)
        }
    })
} 

module.exports = {
    search : search
}