const express = require('express');

const clickSendController = express.Router()

clickSendController.use(function timeLog (req, res, next) {
   console.log('Time: ', Date.now())
   next()
})

clickSendController.post('/incoming-message', (req, res) =>{
   console.log(req);
   res.ok;
});

module.exports = clickSendController;
