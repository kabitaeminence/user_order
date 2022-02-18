const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema

const UserOrderSchema = new mongoose.Schema({

    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },

    addressId:{
        type:Schema.Types.ObjectId,
        ref: "userAddressSchema"
    },
    
    OrderName: {
        type: String,
    },

    OrderQuentity: {
        type: Number    
    },
    
    OrderPrice: {
        type: Number
    }
    
})
const order =  mongoose.model("UserOrder", UserOrderSchema)
module.exports = order