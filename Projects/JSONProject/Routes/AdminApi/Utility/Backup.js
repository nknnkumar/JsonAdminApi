let express = require('express');
let router = express.Router();
let Repos = require("../../../Repository/AdminApi/Utility/Backup");

router.get('/', function (req, res, next) {
    let LocalDataPk = req.KeshavSoft.DataPk;

    Repos.Backup({
        inResponse: res,
        inDataPk: LocalDataPk, callback: () => {
        }
    });
});

router.get('/ToMail', function (req, res, next) {
    let LocalDataPk = req.KeshavSoft.DataPk;

    Repos.BackupToMail({
        inDataPk: LocalDataPk
    }).then(PromiseData => {
        console.log("succ : ", PromiseData);
        res.end(JSON.stringify(PromiseData));
        //return PromiseData;
    }).catch(PromiseError => {
        console.log("PromiseError : ", PromiseError);
        res.end(JSON.stringify(PromiseError));
    });
});

module.exports = router;
