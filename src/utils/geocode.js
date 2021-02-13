const request = require('postman-request')

const calcLatLong = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=64d69ffc5754f5505dd2c7a5d1c5a780&query=${encodeURIComponent(address)}&limit=1`

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (body.data === undefined || body.data.length === 0) {
            callback('Unable to find the cordinates. Try another search')
           
        } else {
            const lat = body.data[0].longitude
            const long = body.data[0].latitude
            const placeName = body.data[0].name
            callback(undefined, {
                latitude: lat,
                longitude: long,
                location: placeName
            })
        }
    })
}

module.exports = {calcLatLong}