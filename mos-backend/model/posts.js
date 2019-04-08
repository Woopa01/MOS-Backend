const mongoose = require('mongoose');

const Posts = new mongoose.Schema({
    title : String,
    author : {type : mongoose.Schema.Types.ObjectId, ref : 'user'},
    imageUrl : [String],
    content : String,
    date : {type : Date, default : Date.now()},
    comment : [{
        author : {type : mongoose.Schema.Types.ObjectId, ref : 'user'},
        content : String,
        date : {type : Date, default : Date.now()},    
    }],
    commentCount : {type : Number, default : 0},
    isVoted : Boolean,
    voteCount : {type : Number, default : 0}
})

module.exports = mongoose.model('posts', Posts);