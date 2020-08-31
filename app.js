require('dotenv').config();
const express = require('express');
const clickSendController = require('./src/main/controllers/clickSendController')
const orchestratorController = require('./src/main/controllers/orchestratorController')
const app = express();



app.get('/', (req, res) =>{
    res.send("Hello World!");
})

app.use('/clicksend', clickSendController)
app.use('/orchestrator', orchestratorController)


module.exports = app;