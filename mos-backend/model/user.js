const mongoose = require('mongoose')

const User = new mongoose.Schema({
    id : String,
    password : String,
    name : String,
    imageurl : String,
    category : [String],
    posts : [{type : mongoose.Schema.Types.ObjectId , ref : 'posts'}],
    qna : [{type : mongoose.Schema.Types.ObjectId , ref : 'qna'}],
})

module.exports = mongoose.model('user',User)