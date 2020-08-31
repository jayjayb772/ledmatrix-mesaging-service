const express = require('express');

const clickSendController = express.Router()
const {debuglog} = require('../util/debugCommands');

clickSendController.get('/', (req, res)=>{
   debuglog("click send controller home");
   res.send("click send controller home");
})


clickSendController.post('/incoming-message', (req, res) =>{
   let body = req.toJSON();
   debuglog(body);
   // let from = body.from;
   // debuglog("FROM:");
   // debuglog(body.from);
   // let message = body.message;
   // debuglog("TEXT MESSAGE:");
   // debuglog(body.message);
   // let timestamp = body.timestamp;
   // debuglog("TIMESTAMP:");
   // debuglog(body.timestamp);



   res.send();
});

module.exports = clickSendController;
