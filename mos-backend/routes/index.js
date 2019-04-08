const router = require('express').Router();

router.use('/user',require('./user/index'));

module.exports = router;