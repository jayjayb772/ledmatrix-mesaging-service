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
        message:orchestratorReqBody.message
    }
}
function sendMultipleTextsDTO(orchestratorReqBody){
    return {
        relationship:orchestratorReqBody.relationship,
        message:orchestratorReqBody.message
    }
}

function newContactDTO(reqBody){
    return {
        phone_number:reqBody.phone_number,
        first_name:reqBody.first_name,
        last_name: (reqBody.last_name !== "") ? reqBody.last_name : reqBody.relationship,
        custom_1:reqBody.relationship
    }
}

module.exports = {clickSendTextDTO, sendSingleTextDTO, sendMultipleTextsDTO, newContactDTO}