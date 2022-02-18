const mongoose = require("mongoose");
// const validator = require("validator");
const Schema = mongoose.Schema

const userAddressSchema = new mongoose.Schema({
   
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },

    city: {
        type: String,
    }, 

    state: {
        type: String,
    },

    pin:{
        type:Number,
    }

})
 
const userAddre =  mongoose.model("userAddressSchema",  userAddressSchema)
module.exports =userAddre