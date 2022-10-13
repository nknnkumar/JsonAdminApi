let _ = require("lodash");
// let CommonGroupBy = require("../CommonFuncs/GroupByFuncs/GroupBy");
// let CommonFromData = require("../../Fs/Config/Folders/Files/PullData/FromData");
// let CommonGstSale = require("./Common/GstSale");
// let CommonFirmDetails = require("../../Fs/Config/FirmDetailsJson/PullData/FromJson");

let CommonFromAsObject = require("../../../../DataSupply/Fs/Config/Folders/Files/Items/PullData/FromDataFolder/PullFuncs/AsObject");
let CommonGroupBy = require("../../../../DataSupply/Reports/CommonFuncs/GroupByFuncs/GroupBy");

let LocalFuncForInventoryFooter = ({ inData }) => {
    let LocalTotalAmount = _.round(_.sum(_.map(inData, "Amount")), 2).toFixed(2);
    let LocalTotalAmountRounded = _.round(_.sum(_.map(inData, "Amount")), 0).toFixed(0);
    let LocalTotalQty = _.sum(_.map(inData, "Qty"));
    let LocalRoundOff = 0;

    if (LocalTotalAmountRounded - LocalTotalAmount !== 0) {
        LocalRoundOff = _.round(LocalTotalAmountRounded - LocalTotalAmount, 2).toFixed(2);
    }
    return {
        TotalAmount: LocalTotalAmount,
        noof: LocalTotalQty,
        RoundOff: LocalRoundOff,
        RoundedAmount: LocalTotalAmountRounded
    };
};

let ForProductName = async ({ inInvGridData, inDataPk }) => {
    let LocalProductCode;
    let LocalProductName;

    let LocalFromProducts = await CommonFromAsObject.FromFolderAndFileAsObject({
        inFolderName: "Masters", inFileNameWithExtension: "Products.json", inItemName: "ProductNames",
        inDataPK: inDataPk
    });

    if ((LocalFromProducts === undefined) === false) {
        for (const property in inInvGridData) {
            LocalProductCode = inInvGridData[property].ProductCode;

            if (LocalProductCode in LocalFromProducts) {
                LocalProductName = LocalFromProducts[LocalProductCode].ProductName;

                inInvGridData[property].ProductName = LocalProductName;
                inInvGridData[property].TaxPer = LocalFromProducts[LocalProductCode].TaxPer;
                inInvGridData[property].HSN = LocalFromProducts[LocalProductCode].HSN;

                inInvGridData[property].TaxableAmount = inInvGridData[property].Amount * (inInvGridData[property].TaxPer / (100 + inInvGridData[property].TaxPer));

                inInvGridData[property].TaxableAmount = inInvGridData[property].TaxableAmount.toFixed(2);

            };
        };
    };

    return await inInvGridData;
};

let LocalForTax = ({ inData }) => {
    let LocalTaxData = CommonGroupBy.SingleColumnAndMultipleDataRetruned({
        inDataToSort: inData,
        inGroupByColumn: "TaxPer",
        inColumnsToGroupByAsFloat: ["Amount"]
    });

    LocalTaxData = LocalTaxData.map(element => {
        element.Cgst = ((element.Amount * (parseInt(element.TaxPer) / (100 + parseInt(element.TaxPer)))) / 2).toFixed(2);
        element.Sgst = ((element.Amount * (parseInt(element.TaxPer) / (100 + parseInt(element.TaxPer)))) / 2).toFixed(2);

        element.gst = parseFloat(element.Cgst) + parseFloat(element.Sgst);
        element.TaxableAmount = element.Amount - element.Cgst - element.Sgst;

        return element;
    });

    return LocalTaxData;
};

let LocalForTax1 = ({ inData }) => {
    let LocalTaxData = CommonGroupBy.SingleColumnAndMultipleDataRetruned({
        inDataToSort: inData,
        inGroupByColumn: "TaxPer",
        inColumnsToGroupByAsFloat: ["Amount"]
    });

    LocalTaxData = LocalTaxData.map(element => {
        element.Cgst = ((element.Amount * (element.TaxPer / (100 + element.TaxPer))) / 2).toFixed(2);
        element.Sgst = ((element.Amount * (element.TaxPer / (100 + element.TaxPer))) / 2).toFixed(2);

        element.TaxableAmount = element.Amount - element.Cgst - element.Sgst;

        return element;
    });

    return LocalTaxData;
};

let StartFunc = async ({ inData, inItemName, inDataPK }) => {
    let LocalReturnData = [];
    let LocalFromInvGrid;
    let LocalInvGridData;
    let LocalDataPK = inDataPK;
    if (LocalDataPK > 0) {
        LocalReturnData = JSON.parse(JSON.stringify(inData));
        LocalInvGridData = JSON.parse(JSON.stringify(LocalReturnData.InvGrid));

        LocalFromInvGrid = await LocalItemWiseFuncs.InvGridData({
            inItemName,
            inData: LocalInvGridData, inDataPK: LocalDataPK
        });

        //LocalReturnData.FirmHeading = LocalItemWiseFuncs.FirmHeading({ inPK: inDataPk });

        LocalReturnData.InvGrid = LocalFromInvGrid;
        LocalReturnData.TaxData = LocalForTax({ inData: LocalFromInvGrid });

        LocalReturnData.TotalRow = LocalFuncForInventoryFooter({ inData: LocalFromInvGrid });
        //      LocalReturnData.TaxData = LocalItemWiseFuncs.InvGridDataTax({ inItemName, inData: LocalFromInvGrid });
    };

    return { KTF: true, KMessage: "", DataFromServer: LocalReturnData };
};

class LocalItemWiseFuncs {
    static InvGridData = async ({ inItemName, inData, inDataPK }) => {
        //let LocalReturnData = inData;
        let LocalReturnData;
        let LocalTax;
        let LocalDataPK = inDataPK;

        LocalReturnData = await ForProductName({ inInvGridData: inData, inDataPk: LocalDataPK })
        //  LocalReturnData = await CommonGstSale.ForGridAccount({ inInvGridData: inData, inDataPk })

        //  LocalReturnData = await CommonGstSale.ForProductHsn({ inInvGridData: LocalReturnData, inDataPk })

        LocalReturnData = Object.values(LocalReturnData).map(element => {
            return element;
        });


        return await LocalReturnData;
    }
};

module.exports = { StartFunc }