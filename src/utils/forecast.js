const request = require('request')


const forecast = (Li, Lo, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=47bab9e942a8e3bb4167a0e0cf8dbc8b&query=' + Li + ',' + Lo + '&units=m'


request({ url:url, json:true }, (error,response) => {
 
    if(error)
    {
        callback('unable to connect', undefined)
    }
    else if(response.body.error)
    {
        callback('unable to find location', undefined)
    }
    else
    {
        callback(undefined,{
            location: response.body.location.name,
            weather: response.body.current.temperature,
            time: response.body.current.observation_time,
            icon: response.body.current.weather_icons[0],
            wdesc: response.body.current.weather_descriptions[0],
            wspeed:response.body.current.wind_speed,
            precip: response.body.current.precip,
            feelslike: response.body.current.feelslike,
            humidity: response.body.current.humidity

        })
    }


} )

}

module.exports = forecast

