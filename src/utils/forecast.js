let tiny = require('tiny-json-http')

const forecast = async (cityName) => {
    const key = process.env.OPEN_WEATHER_MAP_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${key}`
    try {
        const weather = (await tiny.get({ url })).body
        return `Weather: ${weather.weather[0].description}; Tempature: ${weather.main.temp}c; Humidity: ${weather.main.humidity}%`
    } catch (e) {
        if (e.statusCode) {
            throw new Error('404')
        }
        throw new Error('500')
    }
}

module.exports = forecast