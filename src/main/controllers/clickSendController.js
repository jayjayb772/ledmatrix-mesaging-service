const express = require('express');

const clickSendController = express.Router()

clickSendController.get('/', (req, res)=>{
   res.send("click send controller home");
})


clickSendController.post('/incoming-message', (req, res) =>{
   console.log(req);
   res.ok;
});

module.exports = clickSendController;
