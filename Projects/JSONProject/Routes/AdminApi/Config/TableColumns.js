var express = require('express');
var router = express.Router();

// router.use('/ShowData', require('./TableColumns/ShowData'));
// router.use('/Update', require('./TableColumns/Update'));

router.use('/UpdateKeys', require('./TableColumns/UpdateKeys'));

module.exports = router;