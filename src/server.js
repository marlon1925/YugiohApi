const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');

const app = express();
require('./config/passport')

// Configuraciones
app.set('port', process.env.port || 3000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));


// Middleware
app.use(express.json());
app.set('view engine', '.hbs');
//En donde se espefica con que vamos a trabajar Middleware
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))


app.use(session({ 
  secret: 'secret',
  resave:true,
  saveUninitialized:true
}));
app.use(passport.initialize())
app.use(passport.session())



// Rutas
app.get('/', (req, res) => {
  res.render('index');
});
app.use(require('./routers/index.routes'));
app.use(require('./routers/portafolio.routes'))
app.use(require('./routers/user.routes'))


// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
