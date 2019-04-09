const router = require('express').Router();

router.use('/user',require('./user/index'));
router.use('/posts',require('./posts/index'));

module.exports = router;