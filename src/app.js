const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Miel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Miel'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'search her for any help:',
        title: 'Help',
        name: 'Miel'

    })
})

app.get('/weather', (req, res) => {
    const cityName = req.query.adress
    if (!cityName) {
        return res.send({
            error: 'You must provide an adress!'
        })
    }

    // geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    //     if (error) {
    //         return res.send({ error })
    //     }

    //     forecast(latitude, longitude, (error, forecastData) => {
    //         if (error) {
    //             return res.send({ error })
    //         }

    //         res.send({
    //             forecast: forecastData,
    //             location,
    //             address: req.query.address
    //         })
    //     })
    // })
    geocode(cityName, (error, { lat, long, placeName } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(lat, long, (error, forecastData) => {
            if (error)
                return res.send({
                    error
                })
            res.send({
                location: placeName,
                forecast: forecastData
            })
        })
    })
})

app.get('/prodacts', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide term search'
        })
    }
    console.log(req.query)
    res.send({
        prodacts: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('help-not-found', {
        title: '404',
        name: 'Miel',
        errorMessage: 'Help article not found!'

    })
})


app.get('*', (req, res) => {
    res.render('page-not-found', {
        title: '404',
        name: 'Miel',
        errorMessage: 'Page not found!'


    })
})
app.listen(3000, () => {
    console.log('Server is run at port 3000')
})