//Importacion de Mongoose
const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb://0.0.0.0:27017/YuGiOh'

connection = async()=>{

    try{
         
        await mongoose.connect(MONGODB_URI,{
            //Advertncias de funciones 
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log('Database is connected')
    }catch (error){
          console.log(error)
    }
}

module.exports=connection

