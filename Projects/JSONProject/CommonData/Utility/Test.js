const nodemailer = require("nodemailer");

var transportLive = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: "nknnkumar@live.com",
        pass: "12345"
    }
});

var mailOptions = {
    from: "nknnkumar@live.com",
    to: 'batchusatyasri@gmail.com',
    subject: "hai ?",
    text: "KeshavSoft",
};

let LocalDataBackUpWithPassword = () => {
    return new Promise((resolve, reject) => {

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
};

LocalDataBackUpWithPassword();
