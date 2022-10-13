let CommonPullData = require("../../../PullData/FromDisplayJson/PullFromDisplayJson");

let StartFunc = async ({ inFolderName, inFileNameWithExtension, inItemName, inDataPK }) => {
    let LocalDataPK = inDataPK;
    let LocalReturnObject = { KTF: false, ScreensWithColumnCount: {} };

    if (LocalDataPK > 0) {
        let LocalData = await CommonPullData.FromItemName({
            inFolderName, inFileNameWithExtension, inItemName,
            inDataPk: LocalDataPK
        });

        Object.entries(LocalData).forEach(
            ([key, value]) => {
                LocalReturnObject.ScreensWithColumnCount[key] = {
                    ScreenName: key,
                    ColumnCount: 0
                };

                if ("TableColumns" in value) {
                    LocalReturnObject.ScreensWithColumnCount[key].ColumnCount = value.TableColumns.length
                };
            }
        );

        LocalReturnObject.KTF = true;

        return await LocalReturnObject;
    };

    return await LocalReturnObject;
};

let LocalMockFunc = async () => {
    let LocalData = await StartFunc({
        inDataPK: 1022,
        inFolderName: "Masters",
        inItemName: "Products",
        inFileNameWithExtension: "Products.json"
    });
};

// LocalMockFunc().then(P => {
// });

module.exports = {
    StartFunc
};