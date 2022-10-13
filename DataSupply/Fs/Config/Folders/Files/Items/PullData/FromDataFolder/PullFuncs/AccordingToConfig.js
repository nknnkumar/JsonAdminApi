let CommonPullData = require("../../../../PullData/FromData");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inItemName, inDataPK, inColumns }) => {
    let LocalDataPK = inDataPK;

    if (LocalDataPK > 0) {
        let LocalReturnData;

        let LocalDataFromJSON = await CommonPullData.AsJsonAsyncFromFolderAndFile({
            inFolderName, inFileNameWithExtension,
            inUserPK: LocalDataPK
        });

        if (LocalDataFromJSON !== undefined) {
            if (inItemName in LocalDataFromJSON) {
                let LocalUserDataWithItemName = Object.values(LocalDataFromJSON[inItemName]).sort((a, b) => (a[inColumns[0]] > b[inColumns[0]]) ? 1 : ((b[inColumns[0]] > a[inColumns[0]]) ? -1 : 0));

                LocalReturnData = LocalUserDataWithItemName.map(element => {
                    LocalLoopObject = {};
                    LocalLoopArray = [];

                    for (var i in inColumns) {
                        LocalLoopArray.push(element[inColumns[i]]);
                        LocalLoopObject[inColumns[i]] = element[inColumns[i]];
                    };

                    return LocalLoopArray;
                });
            };

        };

        return await LocalReturnData;
    };
};

module.exports = {
    StartFunc
};