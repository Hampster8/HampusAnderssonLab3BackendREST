const router = require('express').Router();
const verify = require('./verifyToken');
router.get('/', verify, (_, res) => {
    res.redirect('/batcave');
})

module.exports = router;