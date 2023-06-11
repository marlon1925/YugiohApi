// npm install mongoose --save

const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb://0.0.0.0:27017/consumo_API'


connection = async ()=>{
    try{
        await mongoose.connect(MONGODB_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log("Database is connected")
    }catch(error){
        console.log(error)
    }
}

module.exports = connection



