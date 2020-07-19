const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/aac3bb8544153997fb8618444b36394d/" + latitude + ',' + longitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to the weather services!", undefined)
        } else if (response.body.error) {
            callback("Unable to find location!", undefined)
        } else {
            body = response.body
            info = {
                daily_summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipitation: body.currently.precipProbability,
                humidity: body.currently.humidity,
            }
            callback(undefined, info)
        }
    })

}

module.exports = forecast