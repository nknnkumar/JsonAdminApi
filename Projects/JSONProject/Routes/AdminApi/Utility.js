var express = require('express');
var router = express.Router();

router.use('/Backup', require('./Utility/Backup'));
router.use('/Json', require('./Utility/Json'));

module.exports = router;
