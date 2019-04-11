const jwt = require('jsonwebtoken');
const User = require('../../model/user');
const Posts = require('../../model/posts');

const newPosts = async function newPostsWithJWT(req,res){
    try{
        const payload = jwt.verify(req.get('token'),process.env.JWT_KEY);
        const user = await User.findById(payload.id);
        var post = new Posts({
            title : req.body.title,
            author : user.name,
            content : req.body.content,
            category : req.body.category,
            imageurl : req.body.imageurl,
            date : Date.now(),
            comment : [],
            commentCount : 0,
            isVoted : false,
            voteCount : 0
        })
        const userposts = user.update({ $push : { posts : post } });
        await post.save();
        res.status(200).json({msg : 'success'});
    } catch(e) {
        console.log(e);
        res.status(500).json({msg : 'failure'});
    }
}

const getPostsList = async function getPostsList(req,res){
    try{
        const posts = await Posts.find();
        res.status(200).json({
            msg : 'success',
            posts : posts
        });
    } catch(e) {
        console.log(e);
        res.status(500).json({msg : 'failure'});
    }
}

const newComment = async function newCommentWithID(req,res){
    try {
        const payload = jwt.verify(req.get('token'),process.env.JWT_KEY);
        const user = await User.findById(payload.id);
        const post = await Posts.findByIdAndUpdate(req.body.id, { $push : { 
            comment : { 
                author : user.name,
                content : req.body.content,
                date : Date.now()
            }
        },
        $inc : {commentCount : 1}
    }
    );
        res.status(200).json({msg : 'success'});
    } catch(e) {
        console.log(e);
        res.status(500).json({msg : 'failure'});
    }
}

const getPostDetail = async function getPostDetailWithID(req,res){
    try {
        const post = await Posts.findById(req.params.id);
        res.status(200).json({
            title : post.title,
            author : post.author,
            content : post.content,
            category : post.category,
            imageurl : post.imageurl,
            date : post.date,
            comment : post.comment,
            commentCount : post.commentCount,
            voteCount : post.voteCount,
            isVoted : post.isVoted
        });
    } catch(e) {
        console.log(e);
        res.status(500).json({msg : failure})
    }
}

const postVote = async function postVoteWithToken(req,res){
    try {
        const payload = jwt.verify(req.get('token'),process.env.JWT_KEY);
        const post = await Posts.findById(req.body.id);
        const user = await User.findByIdAndUpdate(payload.id,{
            $addToSet : { votePosts : post.id }
        });
        res.status(200).json({ msg : "success" });
    } catch(e) {
        console.log(e);
        res.status(500).json({msg : "success"});
    }
} 

exports.newPosts = newPosts;
exports.getPostsList = getPostsList;
exports.newComment = newComment;
exports.getPostDetail = getPostDetail;
exports.postVote = postVote;