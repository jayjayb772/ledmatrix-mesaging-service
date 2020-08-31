require('dotenv').config();
const express = require('express');
const clickSendController = require('./src/main/controllers/clickSendController')
const orchestratorController = require('./src/main/controllers/orchestratorController')
const app = express();
const {debuglog} = require('./src/main/util/debugCommands');
const ENV = process.env.ENV;



app.get('/', (req, res) =>{
    debuglog("HOME")
    res.send("Hello World!");
})

app.use('/clicksend', clickSendController)
app.use('/orchestrator', orchestratorController)


module.exports = app;