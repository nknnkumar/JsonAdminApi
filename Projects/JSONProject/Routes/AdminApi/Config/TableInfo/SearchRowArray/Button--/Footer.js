
let express = require('express');
let router = express.Router();
let Repos = require("../../../../../../../JSONProject/Repository/AdminApi/Config/TableInfo/SearchRowArray/Button/Footer");
let Middleware = require("../../../../../../Middlewares/ForRoutes/AdminApi/Config/TableInfo/SearchRowArray/Button/Footer");

router.post('/PullData',Middleware.PullData, function (req, res, next) {
  let LocalFolderName = req.body.FolderName;
  let LocalFileName = req.body.FileName;
  let LocalItemName = req.body.ItemName;
  let LocalScreenName = req.body.ScreenName;

  LocalDataPK = req.KeshavSoft.DataPk;

  Repos.PullData({
    inFolderName: LocalFolderName,
    inFileNameWithExtension: LocalFileName,
    inItemName: LocalItemName,
    inScreenName: LocalScreenName,
    inDataPK: LocalDataPK,
  }).then(PromiseData => {
    res.json(PromiseData);
  });
});

router.post('/WithApi',Middleware.PullData, function (req, res, next) {
  console.log("ttttttttttttttttttt.........");
  let LocalFolderName = req.body.FolderName;
  let LocalFileName = req.body.FileName;
  let LocalItemName = req.body.ItemName;
  let LocalScreenName = req.body.ScreenName;

  LocalDataPK = req.KeshavSoft.DataPk;

  Repos.WithApi({
    inFolderName: LocalFolderName,
    inFileNameWithExtension: LocalFileName,
    inItemName: LocalItemName,
    inScreenName: LocalScreenName,
    inDataPK: LocalDataPK,
  }).then(PromiseData => {
    res.json(PromiseData);
  });
});

router.post('/UpdateData', function (req, res, next) {
  let LocalFolderName;
  let LocalFileName;
  let LocalItemName;
  let LocalScreenName;
  let LocalDataPK;
  let LocalDataToUpdate;

  if (("FolderName" in req.body) === false) res.json("Need to send FolderName");

  LocalFolderName = req.body.FolderName;

  if (("FileName" in req.body) === false) res.json("Need to send FileName");

  LocalFileName = req.body.FileName;

  if (("ItemName" in req.body) === false) res.json("Need to send ItemName");

  LocalItemName = req.body.ItemName;

  if (("ScreenName" in req.body) === false) res.json("Need to send ScreenName");

  LocalScreenName = req.body.ScreenName;

  if (("KeshavSoft" in req) === false) res.json("Need to send KeshavSoft");

  if (("DataPk" in req.KeshavSoft) === false) res.json("Need to send KeshavSoft");

  LocalDataPK = req.KeshavSoft.DataPk;

  if (("inDataToUpdate" in req.body) === false) res.json("Need to send inDataToUpdate");

  LocalDataToUpdate = req.body.inDataToUpdate;

  Repos.UpdateData({
    inFolderName: LocalFolderName,
    inFileNameWithExtension: LocalFileName,
    inItemName: LocalItemName,
    inScreenName: LocalScreenName,
    inDataPK: LocalDataPK,
    inDataToUpdate: LocalDataToUpdate
  }).then(PromiseData => {
    res.json(PromiseData);
  });
});




module.exports = router;