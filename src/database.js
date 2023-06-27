const mongoose = require ('mongoose')


console.log(process.env.DBUSER)

connection = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log("Database is connected")
    }catch (error) {
        console.log(error)
    }
}

module.exports = connection