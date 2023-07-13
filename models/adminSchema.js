const mongoose = require("mongoose");

const adminsSchema = mongoose.Schema({
    admin_name:{
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
    comments:{
        type:Array,
        required:true
    },
    cart:{
        type:Array,
        required:true
    }
})

// create a model for collection
const admins = mongoose.model("admins",adminsSchema)
// export model
module.exports = admins