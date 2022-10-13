const nodemailer = require("nodemailer");

var transportLive = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: "nknnkumar@live.com",
        pass: "aecwajbiacwtbozl"
    }
});

var mailOptions = {
    from: "nknnkumar@live.com",
    to: 'nknnkumar@yahoo.com',
    subject: "nodejs working ?",
    text: "KeshavSoft",
};

const archiver = require("archiver");
const path = require('path');

const fs = require("fs");

const DataPath = require("../../Kprivate/DataPath.json");
const LocalDataPath = `../../../../${DataPath.Path}`;

exports.DataBackUpWithPassword = ({ inDataPk, callback }) => {
    return new Promise((resolve, reject) => {
        let LocalUserPK = inDataPk;

        if (LocalUserPK > 0) {
            var output = fs.createWriteStream(`${LocalUserPK}.zip`);

            var archive = archiver('zip', {
                zlib: { level: 9 }
            });

            archive.pipe(output);

            archive.on('error', function (err) {
                console.log('error : ', error);
                //inResponse.status(500).send({ error: err.message });
            });

            //on stream closed we can end the request
            archive.on('end', function () {
                mailOptions.attachments = [
                    {
                        filename: 'data.zip',
                        content: fs.createReadStream(`${LocalUserPK}.zip`)
                    }
                ];

                transportLive.sendMail(mailOptions, function (error, response) {
                    if (error) {
                        //   res.send("Email could not sent due to error: " + error);
                        console.log('Error', error);
                        reject({ KError: error });
                    } else {
                        // res.send("Email has been sent successfully");
                        console.log('mail sent');
                        resolve({ KTF: true });
                    }
                });
            });

            var directories = [path.resolve(__dirname, `${LocalDataPath}/${LocalUserPK}`)];

            for (var i in directories) {
                archive.directory(directories[i], directories[i].replace(__dirname, ''));
            }

            archive.finalize();
        };
    });
};
