// const express = require('express')

// const app = express()

// module.exports = app

const express = require('express')

const path = require('path')
const { engine }  = require('express-handlebars')


//Inicializamos 
const app = express()

//configuraciones
app.set('port', process.env.port || 3000)
app.set('views', path.join(__dirname,'views'))

app.engine('.hbs',engine({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs'
}))
app.set('view engine','.hbs')

// Rutas 
app.get('/',(req,res)=>{
    res.render('index')
})
app.use(require('./routers/index.routes'))


//Middleware

app.use(express.urlencoded({extend:false}))

//Variables globales


//Archivos stataticos

app.use(express.static(path.join(__dirname,'public')))

module.exports = app