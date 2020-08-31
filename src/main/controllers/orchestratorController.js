const express = require('express');

const orchestratorController = express.Router()

orchestratorController.get('/', (req, res)=>{
    res.send("Orchestrator controller home");
})

orchestratorController.post('/incoming-message', (req, res) =>{
    console.log(req);
    res.ok;
});

module.exports = orchestratorController;
