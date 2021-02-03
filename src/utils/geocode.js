const request = require('request')

const geocode = (cityName, callback) => {
    const cityNameEncode = encodeURIComponent(cityName)
    const mapBoxAccessToken = 'pk.eyJ1IjoibWllbG1hcyIsImEiOiJja2tjYmtwcWgwZm12Mm5vY254MWt2cXIxIn0.bMAHlYrA0lHKmRtAlbhEYA'
    const geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityNameEncode}.json?access_token=${mapBoxAccessToken}&limit=1`

    request({ url: geoCodeUrl, json: true }, (error, respons) => {
        console.log(respons.body)
        if (error) {
            callback('unable to connect', undefined)
        } else if (respons.body.features.length === 0) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, {
                placeName: respons.body.features[0].place_name,
                long: respons.body.features[0].center[0],
                lat: respons.body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode