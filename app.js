const express = require('express');
const clickSendController = require('./src/main/controllers/clickSendController')
const defaultController = require('./src/main/controllers/defaultController')
const app = express();
const port = 3000

app.get('/', (req, res) =>{
    return "Hello World!"
})

app.use('/',defaultController);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
