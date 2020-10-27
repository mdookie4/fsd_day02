//load libraries
const express = require('express')


//configure the environment
const PORT = parseInt(process.argv[2] || process.env.APP_PORT) || 3000

//create an instance of express
const app = express()

//configure handlebars
app.engine('hbs',
    handlebars({defaultLayout: 'default.hbs'})
)
app.set('view engine', 'hbs')

//logging calls
app.use(
    (req,resp,next) => {
        console.info(`${new Date()}: ${req.method} ${req.originalUrl}`)
    }
)

//load landing page
app.get('/', 
    (req,resp) => {
        resp.status(200)
        resp.type('text/html')
        resp.sendFile(__dirname + '/static')
    }
)

var dice1_pic;
var dice2_pic;

//load dice roll result page
app.get('/result.html',
    (req,resp) => {
        resp.status(200)
        resp.type('text/html')
        dice1_pic = toString(Math.floor((Math.random()*6)+1))+".png"
        //dice2_pic = toString(Math.floor((Math.random()*6)+1))+".png"
        resp.render('result',
            {
                dice1: dice1_pic
               //dice2: dice2_pic
            }
        )
    }
)

