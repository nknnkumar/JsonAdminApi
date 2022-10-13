var express = require('express');
var router = express.Router();
let CommonMiddlewareJwtVerify = require("../../common/Jwt/Bs5");
let CommonAdminApi = require("./Routes/AdminApi");

router.use('/AdminApi', CommonMiddlewareJwtVerify.ForKeshavSoftRedirectToLogin, CommonAdminApi);

module.exports = router;