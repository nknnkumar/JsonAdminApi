let CommonFromTemplateFromCommon = require("../../../../../../../../DataSupply/Fs/Config/Folders/Files/Items/Insert/ToDataFolder/Tally/Transactions/TemplateFromCommon");
let CommonCreateInDataFolder = require("../../../../../../../../DataSupply/Fs/Config/Folders/Files/Create/InDataFolder/CreateJsonFile");
//let CommonPrepareDataForDisplay = require("../../../../DataSupply/Fs/Config/Folders/Files/Insert/BulkInsert/PrepareData/ForDisplay");
let CommonCreateDisplayForFileJson = require("../../../../../../../../DataSupply/Fs/Config/Folders/Files/Create/InConfigFolder/CreateDisplayForFileJson");

//let CommonFromTemplateFromCommon = require("../../../../../DataSupply/Fs/Config/Folders/Files/Items/Insert/ToDataFolder/Tally/Transactions/FromTallyWithTemplateToConfigFile");

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
        let LocalReturnFromDisplay = await CommonCreateDisplayForFileJson.StartFunc({
            inFolderName,
            inFileNameWithExtension,
            inUserPK
        });

        if (LocalReturnFromFileInsert.KTF || LocalReturnFromFileInsert.AlreadyPresent) {
            if (LocalReturnFromDisplay.KTF || LocalReturnFromDisplay.AlreadyPresent) {
                LocalReturnObject.KTF = true;
            };
        };

        return await LocalReturnObject;
    };
};

let FromPowerShell = async ({ inFolderName, inFileName, inBody, inUserPK }) => {
    let LocalReturnData = { KTF: false, KResult: [] };
    let LocalToName;
    let LocalItemData;
    
    if ("envelope" in inBody) {
        if (Object.keys(inBody.envelope).length === 1) {
            try {
                LocalToName = Object.keys(inBody.envelope)[0];
                LocalItemData = inBody.envelope[LocalToName];

                let LocalJsonConfig = {
                    inFolderName: inFolderName,
                    inJsonFileName: `${inFileName}.json`
                };

                if (Array.isArray(LocalItemData)) {
                    let jVarLocalFromInsertFiles = await CommonFuncs.InsertFiles({
                        inFolderName,
                        inFileNameWithExtension: `${inFileName}.json`, inUserPK
                    });

                    let LocalReturnFromItemsInsert;
                    if (jVarLocalFromInsertFiles.KTF) {
                        LocalReturnFromItemsInsert = await CommonFromTemplateFromCommon.BulkInsert({
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
    return await LocalReturnData;
};

module.exports = {
    FromPowerShell
}