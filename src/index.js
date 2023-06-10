const app = require('./server.js')
const connetion = require('./database.js')
require('dotenv').config()

connetion()
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`)
})
