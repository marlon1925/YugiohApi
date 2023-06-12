const app = require('./server.js')
require('dotenv').config()

app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`)
})
