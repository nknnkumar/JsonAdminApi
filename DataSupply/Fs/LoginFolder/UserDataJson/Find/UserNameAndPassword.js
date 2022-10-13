let CommonFromFile = require("../PullData/FromFile");
let CommonFirmDetailsJson = require("../../../Config/FirmDetailsJson/PullData/FromJson");

let StartFunc = async ({ inUserName, inPassWord }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {}, kPK: 0 };
    let LocalFromCheck = await CommonFromFile.StartFunc();
    if (LocalFromCheck.KTF) {
        if ("data" in LocalFromCheck.JsonData) {
            Object.entries(LocalFromCheck.JsonData.data).forEach(
                ([key, value]) => {
                    if (value.UserName === inUserName && value.PassWord === inPassWord) {
                        LocalReturnData.kPK = parseInt(key);
                    }
                }
            );

            LocalReturnData.KTF = true;
        };
    } else {
        LocalReturnData.KReason = "Json file not found";
    };

    return await LocalReturnData;
};

let ForUserAndPasswordReturnFirmDetails = async ({ inUserName, inPassWord }) => {
    let LocalReturnData = { KTF: false, DirPath: "", CreatedLog: {}, kPK: 0 };
    let LocalFromCheck = await CommonFromFile.StartFunc();
    if (LocalFromCheck.KTF) {
        if ("data" in LocalFromCheck.JsonData) {
            Object.entries(LocalFromCheck.JsonData.data).forEach(
                ([key, value]) => {
                    if (value.UserName === inUserName && value.PassWord === inPassWord) {
                        LocalReturnData.kPK = parseInt(key);
                    }
                }
            );

            if (LocalReturnData.kPK > 0) {
                LocalReturnData.RedirectPage = await CommonFirmDetailsJson.RedirectPage({ inDataPk: LocalReturnData.kPK });
            }

            LocalReturnData.KTF = true;
        };
    } else {
        LocalReturnData.KReason = "Json file not found";
    };

    return await LocalReturnData;
};

module.exports = { StartFunc, ForUserAndPasswordReturnFirmDetails };