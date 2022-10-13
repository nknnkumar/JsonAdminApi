const archiver = require("archiver");
const path = require('path');

const fs = require("fs");

const DataPath = require("../../Kprivate/DataPath.json");
const LocalDataPath = `../../../../${DataPath.Path}`;

archiver.registerFormat('zip-encryptable', require('archiver-zip-encryptable'));

exports.DataBackUpWithPassword = ({ inResponse, inDataPk, callback }) => {
    let LocalUserPK = inDataPk;

    if (LocalUserPK > 0) {
        var output = fs.createWriteStream(`${LocalUserPK}.zip`);

        var archive = archiver('zip-encryptable', {
            zlib: { level: 9 },
            forceLocalTime: true,
            password: 'KeshavSoft'
        });

        archive.pipe(output);

        archive.on('error', function (err) {
            inResponse.status(500).send({ error: err.message });
        });

        //on stream closed we can end the request
        archive.on('end', function () {
            console.log('Archive wrote %d bytes', archive.pointer());
            //console.log('output', output);
            callback("", null);
        });

        //set the archive name
        inResponse.attachment(`${LocalUserPK}.zip`);

        //this is the streaming magic
        archive.pipe(inResponse);

        var directories = [path.resolve(__dirname, `${LocalDataPath}/${LocalUserPK}`)];

        for (var i in directories) {
            archive.directory(directories[i], directories[i].replace(__dirname, ''));
        }

        archive.finalize();
    };
};
