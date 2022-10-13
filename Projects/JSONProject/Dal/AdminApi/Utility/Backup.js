let CommonBackup = require("../../../CommonData/Utility/Backup");
let CommonBackupToMail = require("../../../CommonData/Utility/BackupToMail");

let Backup = ({ inResponse, inDataPk, callback }) => {
        let LocalReturnData = CommonBackup.DataBackUpWithPassword({ inResponse, inDataPk, callback });

        callback(LocalReturnData, null);
};

let BackupToMail = async ({ inDataPk }) => {
        return new Promise((resolve, reject) => {
                CommonBackupToMail.DataBackUpWithPassword({ inDataPk }).then(PromiseData => {
                        resolve(PromiseData);
                }).catch(PromiseError => {
                        reject(PromiseError);
                });
        });
};

module.exports = {
        Backup,
        BackupToMail
};