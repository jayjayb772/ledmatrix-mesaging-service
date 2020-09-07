const express = require('express');
const {sendMultipleTextsDTO, sendSingleTextDTO} = require("../DataObjects/clicksendTextDTO");
const {debuglog} = require('../util/debugCommands');
const orchestratorController = express.Router()
const {getClicksendContacts, getSpecifiedContactList} = require('../services/clickSendService')

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
})

orchestratorController.post('/send-text-multiple', (req, res) => {
    res.ok;
    let textsInfo = sendMultipleTextsDTO(req.body)
    debuglog(textsInfo)
})


module.exports = orchestratorController;
