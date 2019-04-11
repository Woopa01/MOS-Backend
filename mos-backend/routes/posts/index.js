const router = require('express').Router();
const ctrl = require('./posts.ctrl');

router.post('/newpost',ctrl.newPosts);
router.get('/getpostslist',ctrl.getPostsList);
router.post('/newcomment',ctrl.newComment);
router.get('/getpostdetail',ctrl.getPostDetail);
router.post('/postVote',ctrl.postVote);

module.exports = router
