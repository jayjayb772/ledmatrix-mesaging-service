const express = require('express');
const {debuglog} = require('../util/debugCommands');
const orchestratorController = express.Router()

orchestratorController.get('/', (req, res)=>{
    debuglog("Orchestrator controller home")
    res.send("Orchestrator controller home");
})

orchestratorController.post('/incoming-message', (req, res) =>{
    debuglog("message from Orchestrator")
    res.ok;
});

module.exports = orchestratorController;
