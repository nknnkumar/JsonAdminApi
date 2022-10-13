let CommonDataSupplyToDataFolderOnly = require("../../../../../DataSupply/Fs/Config/Folders/Files/Items/Insert/ToDataFolder/Tally/Transactions/ToDataFolderOnly");
let CommonCreateInDataFolder = require("../../../../../DataSupply/Fs/Config/Folders/Files/Create/InDataFolder/CreateJsonFile");

class CommonFuncs {
    static InsertFiles = async ({ inFolderName, inFileNameWithExtension, inUserPK }) => {
        let LocalReturnObject = {
            KTF: false,
            KReason: ""
        };

        let LocalReturnFromFileInsert = await CommonCreateInDataFolder.StartFunc({
            inFolderName,
            inFileNameWithExtension,
            inUserPK
        });
        console.log("LocalReturnFromFileInsert : ", LocalReturnFromFileInsert, inFileNameWithExtension);
        if (LocalReturnFromFileInsert.KTF || LocalReturnFromFileInsert.AlreadyPresent) {
            LocalReturnObject.KTF = true;
        };

        return await LocalReturnObject;
    };
};

let LocalGetDate = () => {
    let date = new Date();

    let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    let MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    let yyyy = date.getFullYear();
    let HH = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    return `${dd}-${MM}-${yyyy} ${HH},${mm},${ss}`;
};

let CurrentDateAsItemName = async ({ inFolderName, inFileName, inBody, inUserPK }) => {
    let LocalReturnData = { KTF: false, KResult: [] };
    let LocalToName = LocalGetDate();
    let LocalItemData;
    let LocalKeyNeeded;
    console.log("LocalToName : ", inFolderName, inFileName, LocalItemData);
    if ("envelope" in inBody) {
        console.log("22222222222 : ");
        if (Object.keys(inBody.envelope).length === 1) {
            try {
                console.log("33333333 : ");
                LocalKeyNeeded = Object.keys(inBody.envelope)[0];
                LocalItemData = inBody.envelope[LocalKeyNeeded];
                let LocalReturnFromItemsInsert;
                let LocalJsonConfig = {
                    inFolderName: inFolderName,
                    inJsonFileName: `${inFileName}.json`
                };

                if (Array.isArray(LocalItemData)) {
                    let jVarLocalFromInsertFiles = await CommonFuncs.InsertFiles({
                        inFolderName,
                        inFileNameWithExtension: `${inFileName}.json`, inUserPK
                    });

                    console.log("jVarLocalFromInsertFiles : ", jVarLocalFromInsertFiles);
                    if (jVarLocalFromInsertFiles.KTF) {
                        LocalReturnFromItemsInsert = await CommonDataSupplyToDataFolderOnly.BulkInsert({
                            inJsonConfig: LocalJsonConfig,
                            inToName: LocalToName,
                            inItemData: LocalItemData,
                            inUserPK,
                            inGuid: "voucherguid"
                        });
                        if (LocalReturnFromItemsInsert.KTF) {
                            LocalReturnData.KTF = true;
                        };
                    };

                } else {
                    LocalReturnData.KError = `Input is not an array : envelope.`;
                }
            } catch (error) {
                LocalReturnData.KError = error;
            };
        } else {
            LocalReturnData.KError = `Input is not an array : envelope.`;
        };
    };
    //   console.log(" LocalReturnData------PPPPPPP : ", LocalReturnData);
    return await LocalReturnData;
};

module.exports = {
    CurrentDateAsItemName
}