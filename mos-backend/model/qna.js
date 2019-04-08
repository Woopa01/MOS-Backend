const mongoose = require('mongoose');

const Qna = new mongoose.Schema({
    title: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    content: String,
    comment: [{
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
      content: String,
      date : {type : Date , default : Date.now}
    }],
    date : {type : Date, default : Date.now}
  });

  

  module.exports = mongoose.model('qna',Qna);