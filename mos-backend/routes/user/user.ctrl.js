const jwt = require('jsonwebtoken');
const User = require('../../model/user');

const getJWT = id => jwt.sign({ id }, process.env.JWT_KEY , { expiresIn : '7d' })

const signup = async function signUp(req,res) {
   try{
    var user = new User({
        id : req.body.id,
        password : req.body.password,
        name : req.body.name,
        imageurl : req.body.imageurl,
        category : req.body.category,
        posts : [],
        qna : []
    })
    await user.save();
    res.status(200).json({ msg : 'success' });
   } catch(e){
       res.status(500).json({ msg : 'failure'});
   }
}

const login = async function signIn(req,res){
    try{
        const user = await User.findOne( {id : req.body.id } );
        if(!user) res.status(403).json({ token : null, msg : 'user not found'});
        res.status(200).json({token : getJWT(user._id), msg : 'success'});
    } catch(e){
        console.log(e);
        res.status(500).json({msg : 'failure'});
    }
}

const getProfile = async function getUserInfo(req,res){
    try{
        const payload = jwt.verify(req.get('token'), process.env.JWT_KEY );
        const user = await User.findById(payload.id);
        if(!user) res.status(404).json({msg : 'failure'});
        else{
            res.status(200).json({
                msg : 'success',
                name : user.name,
                imageurl : user.imageurl,
                category : user.category
            });
        }
    } catch(e) {
        console.log(e);
        res.status(404).json({ msg : 'failure' });
    }
}

const getPosts = async function getMyPosts(req,res){
    try{
        const payload = jwt.verify(req.get('token'), process.env.JWT_KEY);
        const user = await User.findById(payload.id);
        if(!user) res.status(404).json({msg : 'failure'});
        else{
            res.status(200).json({
                msg : 'success',
                posts : user.posts
            });
        }
    } catch(e){
        console.log(e);
        res.status(404).json({ msg : 'failure' });
    }
}

exports.signup = signup;
exports.login = login;
exports.getProfile = getProfile;
exports.getPosts = getPosts;