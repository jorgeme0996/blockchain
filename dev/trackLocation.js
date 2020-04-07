const request = require('request');

const URL = "https://www.ipapi.co/";

const trackIp = (ip) => {
    const urlToRequest = `${URL}/ip/json`;
    request({
        url: urlToRequest,
        json: true
    }, (err, response, body)=> {
        if(!err && response.statusCode == 200) {
            return {status: true, body }
        } else {
            return {statu: false, error: err }
        } 

    })
}

module.exports = trackIp;