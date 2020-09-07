const express = require('express');
const {sendMultipleTextsDTO, sendSingleTextDTO} = require("../DataObjects/clicksendTextDTO");
const {debuglog} = require('../util/debugCommands');
const orchestratorController = express.Router()
const {getClicksendContacts, getSpecifiedContactList, sendText, sendTextToList} = require('../services/clickSendService')

orchestratorController.get('/', (req, res) => {
    debuglog("Orchestrator controller home")
    res.send("Orchestrator controller home");
})

orchestratorController.get('/contact-lists', (req, res) => {
    debuglog('Contact List')
    let getContactsPromise = getClicksendContacts()
    getContactsPromise.then(function (lists) {
        debuglog(lists)
        res.send(lists);
    }, function (err) {
        console.log(err)
    })
})


orchestratorController.get('/contact-lists/:relationship', (req, res) => {
    let relationship = req.params.relationship
    debuglog(`${relationship} Contact List`)
    getSpecifiedContactList(relationship).then(r => {
        res.send(r).ok;
    }, err => {
        console.log(err);
    })
})

orchestratorController.post('/incoming-message', (req, res) => {
    debuglog("message from Orchestrator")
    res.ok;
});

orchestratorController.post('/send-text-single', (req, res) => {
    res.ok;
    let textInfo = sendSingleTextDTO(req.body)
    debuglog(textInfo)
    sendText(textInfo.message, textInfo.to).then(r=>{
        debuglog("GOOD")
        res.send("").ok;
    }, err =>{
        console.log(err)
        res.send(err).status(err.http_status)
    })

})

orchestratorController.post('/send-text-multiple', (req, res) => {
    res.ok;
    let textInfo = sendMultipleTextsDTO(req.body)
    debuglog(textInfo)
    sendTextToList(textInfo.message, textInfo.relationship).then(r=>{
        debuglog(r)
        res.send("").ok;
    }, err =>{
        console.log(err)
        res.send(err).status(err.http_status)
    })
})


module.exports = orchestratorController;
