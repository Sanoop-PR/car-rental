const mongoose = require('mongoose')

const DB = process.env.DATABASE

mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(() => {
    console.log("Mongodb Atlas database connected successfully")
}).catch((error) => {
    console.log("Mongodb connection Error:",error)
})