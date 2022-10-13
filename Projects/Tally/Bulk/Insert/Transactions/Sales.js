let CommonCreateInData = require("../../../../DataSupply/Fs/Files/CreateInData");
let CommonToDisplayFolder = require("../../../../DataSupply/Fs/Config/Folders/Files/Insert/ToDisplayFolder");
//let CommonFromTallyWithTemplate = require("../../../../DataSupply/Fs/Config/Folders/Files/Items/Insert/ToDataFolder/FromTallyWithTemplate");
let CommonFromTallyWithTemplate = require("../../../../DataSupply/Fs/Config/Folders/Files/Items/Insert/ToDataFolder/Tally/Transactions/FromTallyWithTemplate");

let LocalGetDate = () => {
    let date = new Date();

    let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    let MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    let yyyy = date.getFullYear();
    let HH = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    return `${dd}-${MM}-${yyyy}-${HH}-${mm}-${ss}`;
};

let FromPowerShell = async ({ inFolderName, inBody, inUserPK }) => {
    let LocalReturnData = { KTF: false, KResult: [] };
    let LocalItemName = LocalGetDate();
    let LocalArrayToInsert;
    let LocalKeyNeeded = "sales";
    console.log("imported");
    if ("envelope" in inBody) {
        if (LocalKeyNeeded in inBody.envelope) {
            try {
                let LocalJsonConfig = {
                    inFolderName: inFolderName,
                    inJsonFileName: ""
                };

                if (Array.isArray(inBody.envelope[LocalKeyNeeded])) {
                    LocalArrayToInsert = inBody.envelope[LocalKeyNeeded];

                    let LocalFileNameWithExtension = `Sales.json`;
                    let LocalReturnFromItemsInsert;

                    let LocalReturnFromFileInsert = await CommonCreateInData.FileWithExtensionAsync({
                        inFolderName: LocalJsonConfig.inFolderName,
                        inFileNameWithExtension: LocalFileNameWithExtension,
                        inUserPK
                    });

                    let LocalReturnFromConfigInsert = await CommonToDisplayFolder.CreateConfigFolder({
                        inFolderName,
                        inFileNameWithExtension: LocalFileNameWithExtension,
                        inUserPK
                    });

                    if (LocalReturnFromFileInsert.KTF || LocalReturnFromFileInsert.AlreadyPresent) {
                        if (LocalReturnFromConfigInsert.KTF || LocalReturnFromConfigInsert.AlreadyPresent) {
                            LocalJsonConfig.inJsonFileName = LocalFileNameWithExtension;

                            LocalReturnFromItemsInsert = await CommonFromTallyWithTemplate.BulkInsert({
                                inJsonConfig: LocalJsonConfig,
                                inToName: LocalItemName,
                                inItemData: LocalArrayToInsert,
                                inUserPK,
                                inGuid: "voucherguid"
                            });

                            if (LocalReturnFromItemsInsert.KTF) {
                                LocalReturnData.KTF = true;
                            };
                        };
                    };

                }else{
                    LocalReturnData.KError = `Input is not an array : envelope.`;    
                }
            } catch (error) {
                LocalReturnData.KError = error;
            };
        };
    };

    return await LocalReturnData;
};

module.exports = {
    FromPowerShell
}