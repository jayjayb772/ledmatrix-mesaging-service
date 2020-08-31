const express = require('express');

const defaultController = express.Router()


defaultController.get('/', (req, res)=>{
    return "Hello World!";
});

module.exports = defaultController;
