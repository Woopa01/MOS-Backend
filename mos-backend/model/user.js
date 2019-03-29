const mongoose = require('mongoose')

const User = new mongoose.Schema({
    id : String,
    password : String,
    name : String,
    imageUrl : String,
    posts : [{type : mongoose.Types.ObjectId, ref : 'posts'}],
    qna : [{type : mongoose.Types.ObjectId, ref : 'qna'}],
})

module.exports = mongoose.model('user',User)