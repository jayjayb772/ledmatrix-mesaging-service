const express = require('express');

const clickSendController = express.Router()
const {debuglog} = require('../util/debugCommands');

clickSendController.get('/', (req, res)=>{
   debuglog("click send controller home");
   res.send("click send controller home");
})


clickSendController.post('/incoming-message', (req, res) =>{
   debuglog("REQ PARAMS")
   let from = req.params.from;
   debuglog("FROM:");
   debuglog(req.params.from);
   let message = req.params.message;
   debuglog("TEXT MESSAGE:");
   debuglog(req.params.message);
   let timestamp = req.params.timestamp;
   debuglog("TIMESTAMP:");
   debuglog(req.params.timestamp);



   res.send();
});

module.exports = clickSendController;
