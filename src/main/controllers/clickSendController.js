const express = require('express');

const clickSendController = express.Router()
const {debuglog} = require('../util/debugCommands');

clickSendController.get('/', (req, res)=>{
   debuglog("click send controller home");
   res.send("click send controller home");
})


clickSendController.post('/incoming-message', (req, res) =>{
   debuglog(req.from);
   let body = req.body;
   //let from = req.body.from;
   debuglog("FROM:");
   //debuglog(req.body.from);
   //let message = req.body.message;
   debuglog("TEXT MESSAGE:");
   //debuglog(req.body.message);
   //let timestamp = req.body.timestamp;
   debuglog("TIMESTAMP:");
   //debuglog(req.body.timestamp);



   res.ok;
});

module.exports = clickSendController;
