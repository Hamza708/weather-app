const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')






const data = express()
const port = process.env.PORT || 3000


const pathname = path.join(__dirname, '../public')
const ppath = path.join(__dirname, '../views/partials')

data.set('view engine', 'hbs')
data.use(express.static(pathname))
hbs.registerPartials(ppath)

data.get('', (req, res) => {
    res.render('index', {
        title : 'WEATHER',
        name : 'app'
    }) 
})


data.get('/weather',(req, res) => {
    
    if(!req.query.address) {
        return res.send({
             error : 'enter a valid address'
        })
    }

    geocode(req.query.address, (error, data) => {

        if(error)
        {
            return res.send({error})
        }
    
        forecast(data.longitude ,data.latitude, (error, data) => {
            
            if(error)
        {
            return res.send({error})
        }

        res.send({
           
            location:data.location,
            weather: data.weather,
            time: data.time,
            icon: data.icon,
            wdesc: data.wdesc,
            wspeed: data.wspeed,
            precip: data.precip,
            feelslike: data.feelslike,
            humidity: data.humidity

        })

        })
    
    })

})


// data.get('*', (req, res) => {

//     res.render('', {
//         title : '404',
//         name : 'app'
//     }) 
// })


data.listen(port, () =>{
    console.log("running on" + port)
})