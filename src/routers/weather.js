const express = require('express');
const Weather = require('../models/weather')
const forecast = require('../utils/forecast')

const router = new express.Router();

router.get('/weather/:city', async (req, res) => {
    const city = req.params.city
    try {
        const weather = await forecast(city)
        const weatherDocumant = new Weather({ city: city, weather })
        await weatherDocumant.save()
        res.send({ weatherDocumant })
    } catch (e) {
        if (e.message === "404") {
            res.status(404).send({ error: "city not found" })
        } else if (e.message === "500") {
            res.status(500).send({ error: "connection problem" })
        } else {
            res.status(400).send({ error: e.message })
        }
    }
})

router.get('/weather-history/:city', async (req, res) => {
    const city = req.params.city
    try {
        const weather_history = await Weather.find({ city })
        if (weather_history.length !== 0) {
            res.send(weather_history)
        } else {
            res.send({ message: "no search history on " + city })
        }
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})

router.post('/actual-temp/:city', async (req, res) => {
    const city = req.params.city
    const actual_temp = req.query.actual_temp

    try {
        const weather = await forecast(city)
        const weatherDocumant = new Weather({ city: city, weather, actual_temp })
        await weatherDocumant.save()
        res.send(weatherDocumant)
    } catch (e) {
        if (e.message === "404") {
            res.status(404).send({ error: "city not found" })
        } else if (e.message === "500") {
            res.status(500).send({ error: "connection problem" })
        } else {
            res.status(400).send({ error: e.message })
        }
    }
})

module.exports = router