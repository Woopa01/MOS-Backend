const jwt = require('jsonwebtoken');
const User = require('../../model/user');

const getJWT = id => jwt.sign({ id }, process.env.JWT_KEY , { expiresIn : '7d' })

const signup = async function signup(req,res) {
   try{
    var user = new User({
        id : req.body.id,
        password : req.body.password,
        name : req.body.username,
        imageUrl : req.body.imageurl,
        posts : [],
        qna : []
    })
    await user.save();
    res.status(200).json({ msg : 'success' });
   } catch(e){
       res.status(500).json({ msg : 'failure'});
   }
}

const login = async function login(req,res){
    try{
        const user = await User.findOne( {id : req.body.id } );
        if(!user) res.status(403).json({ token : null, msg : 'user not found'});
        res.status(200).json({token : getJWT(user._id), msg : 'success'});
    } catch(e){
        console.log(e);
        res.status(500).json({msg : 'failure'});
    }
}

exports.signup = signup;
exports.login = login;