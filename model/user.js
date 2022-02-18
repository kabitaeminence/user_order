const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,    
    },

    email: {
        type: String,    
        unique: [true, "Email id already present"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new error("invalide Email")
            }
        }

    },
    password: {
        type: String,
        unique: true
    }
    
})
const User =  mongoose.model("User", userSchema)
module.exports = User