const base64url = require('base64-url')
const request = require('request')
const {newContactDTO} = require("../DataObjects/clicksendTextDTO");
const {debuglog} = require("../util/debugCommands");


//region createUrl
function makeHeader() {
    let temp = "";
    temp += process.env.CSAPI_USER;
    temp += ":";
    temp += process.env.CSAPI_KEY;
    return base64url.encode(temp);
}

function createSendSingleOptions(url, message, to) {
    let body = JSON.stringify({
        "messages": [
            {
                "source": "php",
                "from": "+18339201336",
                "body": message,
                "to": to,
                "custom_string": "this is a test"
            }
        ]
    })
    let options = {
        "headers": {
            "Authorization": `Basic ${makeHeader()}==`,
            'content-type': 'application/json'
        },
        "body": body
    }
    return options
}

function createSendMultipleOptions(url, message, list_id) {
    let body = JSON.stringify({
        "messages": [
            {
                "source": "php",
                "from": "+18339201336",
                "body": message,
                "list_id": list_id,
                "custom_string": "this is a test"
            }
        ]
    })
    let options = {
        "headers": {
            "Authorization": `Basic ${makeHeader()}==`,
            'content-type': 'application/json'
        },
        "body": body
    }
    return options
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

//region createUser

function makeCreateOptions(reqBody){
    let body = JSON.stringify(reqBody)
    let options = {
        "headers": {
            "Authorization": `Basic ${makeHeader()}==`,
            'content-type': 'application/json'
        },
        "body": body
    }
    return options
}

async function createClicksendContact(reqBody){
    //get contact list id from reqbody relationship
    //inject into url

    let user = newContactDTO(reqBody)
    let url = "https://rest.clicksend.com/v3/lists/{list_id}/contacts"
    return new Promise(((resolve, reject) => {
        request.post(url, makeCreateOptions(user), (err, res)=>{

        } )
    }))
}

//endregion

//region contactLists
async function getClicksendContacts() {
    let options = createOptions("https://rest.clicksend.com/v3/lists")
    let betterBody;
    return new Promise(async function (resolve, reject) {
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
async function sendText(message, to) {
    let url = "https://rest.clicksend.com/v3/sms/send"
    let options = createSendSingleOptions(url, message, to)
    debuglog("options created")
    debuglog(options)
    return new Promise(function (resolve, reject) {
        request.post(url, options, (err, res) => {
            if (res.body.http_code !== 200) {
                reject(res.body)
            }
            if (err) {
                //console.error(err);
                reject(err)
            } else {
                resolve(res.body);
            }
        })
    })
}

async function sendTextToList(message, relation) {
    let url = "https://rest.clicksend.com/v3/sms/send"
    return new Promise(async function (resolve, reject) {
        await getSpecifiedContactList(relation).then(r => {
            debuglog(r.body)
            let options = createSendMultipleOptions(url, message, r[0].list_id)
            debuglog("options created")
            debuglog(options)
            request.post(url, options, (err, res) => {
                if (res.body.http_code !== 200) {
                    reject(res.body)
                }
                if (err) {
                    //console.error(err);
                    reject(err)
                } else {
                    resolve(res.body);
                }
            })
        }, err => {
            console.log(err)
        })

    })


}
//endregion

//region searchContacts

function searchContactLists(phoneNumber){
    //make url https://rest.clicksend.com/v3/search/contacts-lists
    //make options
    //request
    //get name back and return name
}

//endregion

module.exports = {getClicksendContacts, getSpecifiedContactList, sendText, sendTextToList, createClicksendContact}