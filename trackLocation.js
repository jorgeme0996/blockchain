const request = require('request');

const URL = "https://www.ipapi.co";

exports.trackIp = async (ip) => {
    const urlToRequest = `${URL}/${ip}/json`;
    return new Promise((resolve, reject)=>{
        request({
            url: urlToRequest,
            json: true
        }, (err, response, body) => {
            if(!err && response.statusCode == 200) {
                resolve(body) 
            } else {
                reject(err)
            }
        })
    })
}