const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()

//routes
const IndexRoutes = require('./routes/index')

//settings
app.set('port',process.env.PORT || 3000)
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routes
app.use(IndexRoutes)

//static
app.use(express.static(path.join(__dirname,'public')))

//404 handler
app.use((req,res,next)=>{
    res.status(404).render('404')
})

//starting the server
/* app.listen(app.get('port'),()=>{
    console.log(`server on port ${app.get('port')}`);
}) */
module.exports = app