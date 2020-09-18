const request = require('request')

function makeOptions(text){
    return {
        headers:{
            key:process.env.MSG_ORCH_API_KEY
        },
        body: JSON.stringify(text)
    }
}

function handleText(text){
    let url = "orchestrator url"
    let options = makeOptions(text)
    return new Promise(((resolve, reject) => {
        request.post(url, options, (err, res)=>{
            if(err || res.status !== 200){
                reject(err);
            }
            resolve(res);
        })
    }))
}


module.exports = {handleText}