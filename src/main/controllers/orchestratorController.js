const express = require('express');
const {debuglog} = require('../util/debugCommands');
const orchestratorController = express.Router()
const {getClicksendContacts} = require('../services/clickSendService')

orchestratorController.get('/', (req, res)=>{
    debuglog("Orchestrator controller home")
    res.send("Orchestrator controller home");
})

orchestratorController.post('/incoming-message', (req, res) =>{
    debuglog("message from Orchestrator")
    res.ok;
});

orchestratorController.get('/contact-lists', (req, res) =>{
    debuglog('Contact List')
    let lists = getClicksendContacts()
    res.send(lists).ok;
})



module.exports = orchestratorController;
