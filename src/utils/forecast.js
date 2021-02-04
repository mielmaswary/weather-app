const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c6414994611454b499685a1598e99844&query=${lat},${long}&units=m`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to server', undefined)
        } else if (body.error) {
            callback('Catn find locaition', undefined)
        } else {
            callback(undefined, `Weather is: ${body.current.weather_descriptions[0]} The temperturs are: ${body.current.temperature}. It feels like ${body.current.feelslike}, And humidity is ${body.current.humidity} precent.`)
        }

    })
}



module.exports = forecast