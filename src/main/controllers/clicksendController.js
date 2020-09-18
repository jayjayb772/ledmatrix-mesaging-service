const express = require('express');
const {createClicksendContact} = require("../services/clickSendService");
const {sendMultipleTextsDTO, sendSingleTextDTO} = require("../DataObjects/clicksendTextDTO");
const {debuglog} = require('../util/debugCommands');
const clicksendController = express.Router()
const {getClicksendContacts, getSpecifiedContactList, sendText, sendTextToList} = require('../services/clickSendService')

clicksendController.get('/', (req, res) => {
    debuglog("Orchestrator controller home")
    res.send("Orchestrator controller home");
})

/**
 * @swagger
 *
 * /orchestrator/contact-lists:
 *   get:
 *     description: gets all contact lists
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: send a text
 */
clicksendController.get('/contact-lists', (req, res) => {
    debuglog('Contact List')
    let getContactsPromise = getClicksendContacts()
    getContactsPromise.then(function (lists) {
        debuglog(lists)
        res.send(lists);
    }, function (err) {
        console.log(err)
    })
})

/**
 * @swagger
 *
 * /orchestrator/contact-lists/{relationship}:
 *   get:
 *     description: gets relationship list
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: relationship
 *         description: relation for list search.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: send a text
 */
clicksendController.get('/contact-lists/:relationship', (req, res) => {
    let relationship = req.params.relationship
    debuglog(`${relationship} Contact List`)
    getSpecifiedContactList(relationship).then(r => {
        res.send(r).ok;
    }, err => {
        console.log(err);
    })
})

/**
 * @swagger
 *
 * /orchestrator/send-text-single:
 *   post:
 *     description: send multiple texts
 *     consumes:
 *         - application/json
 *     parameters:
 *         - in: body
 *           name: body
 *           description: body
 *           schema:
 *              type: object
 *              required:
 *                  - userName
 *              properties:
 *                  to:
 *                      type: string
 *                  message:
 *                      type: string
 *     responses:
 *       200:
 *         description: send a text
 */
clicksendController.post('/send-text-single', (req, res) => {
    res.ok;
    let textInfo = sendSingleTextDTO(req.body)
    debuglog(textInfo)
    sendText(textInfo.message, textInfo.to).then(r=>{
        debuglog("GOOD")
        res.send("").ok;
    }, err =>{
        console.log(err)
        res.send(err).status(err.http_status)
    })

})

/**
 * @swagger
 *
 * /orchestrator/send-text-multiple:
 *   post:
 *     description: send multiple texts
 *     consumes:
 *         - application/json
 *     parameters:
 *         - in: body
 *           name: body
 *           description: message and relation
 *           schema:
 *              type: object
 *              required:
 *                  - userName
 *              properties:
 *                  relationship:
 *                      type: string
 *                  message:
 *                      type: string
 *     responses:
 *       200:
 *         description: send a text
 */
clicksendController.post('/send-text-multiple', (req, res) => {
    res.ok;
    let textInfo = sendMultipleTextsDTO(req.body)
    debuglog(textInfo)
    sendTextToList(textInfo.message, textInfo.relationship).then(r=>{
        debuglog(r)
        res.send("").ok;
    }, err =>{
        console.log(err)
        res.send(err).status(err.http_status)
    })
})


clicksendController.post('/new-contact', (req, res)=>{
    createClicksendContact(req.body).then(r => {
        debuglog(r)
    })
})

module.exports = clicksendController;
