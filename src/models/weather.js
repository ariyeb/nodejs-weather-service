const mongoose = require('mongoose')

const weatherSchema = new mongoose.Schema({
    city: {
        type: String,
    },
    weather: {
        type: String,
    },
    actual_temp: {
        type: String,
        default: "not entered"
    }
}, {
    timestamps: true
})

const Weather = mongoose.model('Weather', weatherSchema)

module.exports = Weather