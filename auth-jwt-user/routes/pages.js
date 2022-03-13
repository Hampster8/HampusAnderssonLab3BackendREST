const router = require('express').Router();
const path = require('path') // read and send html page/

router.get('/batcave', (_, res) => {
    res.sendFile(path.resolve('public/batcave.html'));
});

module.exports = router;