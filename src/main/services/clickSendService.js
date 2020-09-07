const base64url = require('base64-url')
const request = require('request')
const {debuglog} = require("../util/debugCommands");


//region createUrl
function makeHeader(){
    let temp = "";
    temp+=process.env.CSAPI_USER;
    temp+=":";
    temp+=process.env.CSAPI_KEY;
    return base64url.encode(temp);
}

function createOptions(url){
    let options = {
        headers: {
            Authorization: `Basic ${makeHeader()}==`
        },
        url:url
    }
    return options
}
//endregion

function getClicksendContacts(){
    let options = createOptions("https://rest.clicksend.com/v3/lists")

    request.get(options,(err, res, body) => {
        if (err) {
            console.error(err);
            return;
        }
        let betterBody = JSON.parse(res.body.toString())
        debuglog(res.statusMessage);
        debuglog(betterBody.data.data);
        return betterBody.data
    });
}



module.exports = {getClicksendContacts}