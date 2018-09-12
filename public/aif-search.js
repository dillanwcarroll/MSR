const request = require('request')
const cheerio = require('cheerio')
const CircularJSON = require('circular-json')
const baseAddress = 'https://www.aif.adfa.edu.au'

let search = function(term, callback) {
    var url = baseAddress+'/search?type=search&name=&regNum=&place='+term
    console.log('searching AIF for: ' + term + ' @ ' + url)
    var listings = []
    request(url, (err, res, body) => {
        if(err){
            return callback(err, null)
        } else {
            var $ = cheerio.load(body)
            $('tr').each((index, element) => {
                if ($('tr').length-1 != index) {

                    var regimentNum = element.childNodes[1].firstChild
                    var name = element.childNodes[2].firstChild
                    var address = element.childNodes[3].firstChild
                    var battalion = element.childNodes[4].firstChild
                    var href = ''

                    if (regimentNum !== null) regimentNum = regimentNum
                    if (name !== null) name = name
                    if (address !== null) address = address
                    if (battalion !== null) battalion = battalion.firstChild

                    if (regimentNum !== null) regimentNum = regimentNum.data
                    if (name !== null) {
                        href = baseAddress + name.attribs.href
                        name = name.firstChild.data
                    }
                    if (address !== null) address = address.data
                    if (battalion !== null) battalion = battalion.data                
                    
                    listings.push({
                        regimentNum : regimentNum,
                        name : name,
                        address : address,
                        battalion : battalion,
                        href: href
                    })
                }
            })
            return callback(null, listings)
        }
    })
} 

module.exports = {
    search : search
}