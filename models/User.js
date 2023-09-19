const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "please enter an email"],
        unique: [true, "Account already connected with this email "],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Minimum length of password should be 6"],
    }
})


const User = mongoose.model('user', userSchema)
module.exports = User;