const base64url = require('base64-url')
const request = require('request')
const {debuglog} = require("../util/debugCommands");


//region createUrl
function makeHeader() {
    let temp = "";
    temp += process.env.CSAPI_USER;
    temp += ":";
    temp += process.env.CSAPI_KEY;
    return base64url.encode(temp);
}

function createOptions(url) {
    let options = {
        headers: {
            Authorization: `Basic ${makeHeader()}==`
        },
        url: url
    }
    return options
}

//endregion

//region filters
function familyFilter(list) {
    return list.list_name === 'Family'
}

function residentFilter(list) {
    return list.list_name === 'Residents'
}

function friendFilter(list) {
    return list.list_name === 'Friends'
}

function determineFilter(lists, relationship) {
    switch (relationship) {
        case 'Family':
            return lists.filter(familyFilter)
        case 'Friends':
            return lists.filter(friendFilter)
        case 'Residents':
            return lists.filter(residentFilter)
        default:
            return "Unknown Relationship"
    }
}

//endregion

//region contactLists
async function getClicksendContacts() {
    let options = createOptions("https://rest.clicksend.com/v3/lists")
    let betterBody;
    return new Promise(function (resolve, reject) {
        request.get(options, (err, res) => {
            if (err) {
                //console.error(err);
                reject(err)
            } else {
                betterBody = JSON.parse(res.body.toString())
                //debuglog(res.statusMessage);
                //debuglog(betterBody.data.data);
                resolve(betterBody.data.data);
            }
        })
    })

}


async function getSpecifiedContactList(relationship) {
    return new Promise(function (resolve, reject) {
        let contactsPromise = getClicksendContacts()
        contactsPromise.then(function (lists) {
            let contacts = determineFilter(lists, relationship)
            resolve(contacts);

        }, function (err) {
            console.log(err);
            reject(err)
        })
    })
}

//endregion

//region getNumbers

//endregion

//region sendTexts

//endregion

module.exports = {getClicksendContacts, getSpecifiedContactList}