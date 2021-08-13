var mongoose = require('mongoose')

const wishListSchema = mongoose.Schema({
    title: String, 
    description: String, 
    image: String
})

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,   
    token: String, 
    wishList : [wishListSchema]  
})

var userModel = mongoose.model('users', userSchema)

module.exports = userModel;