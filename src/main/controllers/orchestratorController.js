const express = require('express')
const {handleText} = require("../services/orchestratorService");
const {clickSendTextDTO} = require('../DataObjects/clicksendTextDTO')
const orchestratorController = express.Router()
const {debuglog} = require('../util/debugCommands')

orchestratorController.get('/', (req, res)=>{
   debuglog("click send controller home");
   res.send("click send controller home");
})


orchestratorController.post('/incoming-message', (req, res) =>{
   res.send().ok;
   let text = clickSendTextDTO(req.body)
   debuglog("REQ PARAMS")
   debuglog("FROM:");
   debuglog(text.from);
   debuglog("TEXT MESSAGE:");
   debuglog(text.message);
   debuglog("TIMESTAMP:");
   debuglog(text.timestamp);
   handleText(text)
});
module.exports = orchestratorController;
