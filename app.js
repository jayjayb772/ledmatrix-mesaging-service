require('dotenv').config();
const express = require('express');
const orchestratorController  = require('./src/main/controllers/orchestratorController')
const clickSendController= require('./src/main/controllers/clicksendController')
const app = express();
const {debuglog} = require('./src/main/util/debugCommands');
const bodyParser = require('body-parser');
const {getClicksendContacts} = require("./src/main/services/clickSendService");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const options = {
    definition: {
        openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
        info: {
            title: 'Messaging Service', // Title (required)
            version: '1.0.0', // Version (required)
        },
    },
    // Path to the API docs
    apis: ['./src/main/controllers/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

/**
 * @swagger
 *
 * /:
 *   get:
 *     description: base url
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: login
 */
app.get('/', (req, res) =>{
    debuglog("HOME")
    res.send("Hello World!");
})

app.use('/clicksend', clickSendController)
app.use('/orchestrator', orchestratorController)


module.exports = app;