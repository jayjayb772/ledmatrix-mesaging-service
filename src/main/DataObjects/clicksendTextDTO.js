function clickSendTextDTO(clickSendTextBody){
    return {
        from: clickSendTextBody.from,
        message: clickSendTextBody.message,
        timestamp: clickSendTextBody.timestamp
    }
}

function sendSingleTextDTO(orchestratorReqBody){
    return {
        to:orchestratorReqBody.to,
        message:orchestratorReqBody.message,
        timestamp:orchestratorReqBody.timestamp
    }
}
function sendMultipleTextsDTO(orchestratorReqBody){
    return {
        relationship:orchestratorReqBody.relationship,
        phoneNumbers:orchestratorReqBody.phoneNumbers,
        message:orchestratorReqBody.message,
        timestamp:orchestratorReqBody.timestamp
    }
}

module.exports = {clickSendTextDTO, sendSingleTextDTO, sendMultipleTextsDTO}