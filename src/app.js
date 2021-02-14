const path = require('path')
const express = require('express')
const hbs = require('hbs')
const {forecast} =require('./utils/forecast')
const {calcLatLong} = require('./utils/geocode')

const app = express()

const port = process.env.PORT

//* Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//*  Setup handlebars engine and views loaction
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//* setup static directory to serve
app.use(express.static(publicDirectoryPath))


//* app.com absolete since adding app.use
// app.get('/', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// ! rendered with handler bars using render to render views
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Richard Flores'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Richard Flores'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me',
        name: 'Richard Flores',
        message: 'Plz help me I really really need some help, UGH!',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide and Address'
        })
    }

   
    calcLatLong(req.query.address, (error, { latitude = undefined, longitude = undefined, location = undefined} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        prodicts: [req.query]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Richard Flores',
        errorMessage: 'Help article'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Richard Flores',
        errorMessage: 'Page'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})