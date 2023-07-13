// import mongoose
const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    wishlist:{
        type:Array,
        required:true
    },
    cart:{
        type:Array,
        required:true
    }
})

// create a model for collection
const users = mongoose.model("users",usersSchema)
// export model
module.exports = users