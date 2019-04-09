const mongoose = require('mongoose');

const Posts = new mongoose.Schema({
    title : String,
    author : {type : String, ref : 'user'},
    imageUrl : [String],
    content : String,
    category : String,
    date : {type : Date, default : Date.now()},
    comment : [{
        author : {type : String, ref : 'user'},
        content : String,
        date : {type : Date, default : Date.now()},    
    }],
    commentCount : {type : Number, default : 0},
    isVoted : {type : Boolean, default : false},
    voteCount : {type : Number, default : 0}
})

module.exports = mongoose.model('posts', Posts);