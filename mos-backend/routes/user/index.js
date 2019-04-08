const router = require('express').Router();
const ctrl = require('./user.ctrl');

router.post('/signup',ctrl.signup);
router.post('/login',ctrl.login);
router.get('/getprofile',ctrl.getProfile);
router.get('/getposts',ctrl.getPosts);

module.exports = router;