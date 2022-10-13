const nodemailer = require("nodemailer");

var transportLive = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "batchusatya24@outlook.com",
    pass: "Nanna@123",
  },
});

var transportLive1 = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "batchusatya24@gmail.com",
    pass: "satya@02",
  },
});

var mailOptions = {
  from: "batchusatya24@outlook.com",
  to: "batchusatyasri@gmail.com",
  subject: "from satyasri?",
  text: "KeshavSoft trainee",
};

// const archiver = require("archiver");
// const path = require("path");

const fs = require("fs");

// const DataPath = require("../../Kprivate/DataPath.json");
// const LocalDataPath = `../../../../${DataPath.Path}`;

let DataBackUpWithPassword = ({ inDataPk }) => {
  return new Promise((resolve, reject) => {
    let LocalUserPK = inDataPk;

    if (LocalUserPK > 0) {
      // var output = fs.createWriteStream(`${LocalUserPK}.zip`);

      // var archive = archiver('zip', {
      //     zlib: { level: 9 }
      // });

      // archive.pipe(output);

      //   mailOptions.attachments = [
      //     {
      //       filename: "data.zip",
      //       content: fs.createReadStream(`${LocalUserPK}.zip`),
      //     },
      //   ];

      transportLive.sendMail(mailOptions, function (error, response) {
        if (error) {
          //   res.send("Email could not sent due to error: " + error);
          console.log("Error", error);
          reject({ KError: error });
        } else {
          // res.send("Email has been sent successfully");
          console.log("mail sent");
          resolve({ KTF: true });
        }
      });
    }
  });
};

DataBackUpWithPassword({ inDataPk: 16 })
  .then((PromiseData) => {
    console.log(PromiseData);
  })
  .catch((PromiseError) => {
    console.log(PromiseError);
  });