const express = require('express')
const cors = require('cors')
require('./db/mongoose');
const weatherRouter = require('./routers/weather');
const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors())
app.use(weatherRouter)

app.listen(port, () => {
    console.log('Server connected, port: ' + port)
})

// https://api.openweathermap.org/data/2.5/weather?q=jerusalem&appid=
// mongodb+srv://ariyeb:Ariyeb321@cluster0-jzjfj.mongodb.net/weather-service?retryWrites=true&w=majority