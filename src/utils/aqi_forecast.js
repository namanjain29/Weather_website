const request = require('request')


const aqi_forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openaq.org/v1/latest?coordinates=' + latitude + ',' + longitude + '&radius=10000&limit=1'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to the weather services!", undefined)
        } else if (response.body.error) {
            callback("Unable to find location!", undefined)
        } else {
            body = response.body
            callback(undefined, body)
        }
    })

}

module.exports = aqi_forecast