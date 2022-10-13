//let CommonDashboard = require("../../../../../../../../DataSupply/Fs/Dashboard/FromFolders/WithTableColumns");
let CommonDashboard = require("../../../../../../../../DataSupply/Fs/Dashboard/FromFolders/FromDisplayJson/HigherOrderFuncs/FromTableColumns/FromKeys");

let Toggles = async ({ inDataPk }) => {
    if (inDataPk > 0) {
        return await CommonDashboard.AsTreeWithColumns({ inDataPk });
    };
};

module.exports = {
    Toggles   
};
