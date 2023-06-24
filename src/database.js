//Importacion de Mongoose
const mongoose = require("mongoose");
const MONGODB_URI = 'mongodb+srv://admin:admin@cluster0.vu6o189.mongodb.net/?retryWrites=true&w=majority'

connection = async ()=>{
    try{
        await mongoose.connect(MONGODB_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log("Database is connected")
    }catch (error) {
        console.log(error)
    }
}

module.exports = connection
