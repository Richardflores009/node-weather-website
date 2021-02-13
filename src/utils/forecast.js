const request = require('postman-request')

const forecast = (long,lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=aaef6edd4b8bb8b8a0db6e6f8fe787be&query=${lat},${long}&units=f`
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if(body.error) {
            callback('Unable to find location')
        } else {
            const current = body.current
            callback(undefined,`${current.weather_descriptions[0]}. It is currently ${current.temperature} degreees out. It feels like ${current.feelslike} degrees out.`)
        }
    })
    
}

module.exports = {
    forecast
}