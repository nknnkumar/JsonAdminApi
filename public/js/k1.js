class KeshavSoftLocalFuncs {
    constructor({ inProjectName }) {
        this.Config = {
            RouteStart: {
                Start: "JSONProject",
                SubRoute: "API",
                HtmlPath: "",
                UserCheckRoute: "JSONUser",
                AdminSubRoute: "AdminApi",
            },
            ClientSide: {
                UrlForIp_Old: "https://api.ipify.org/",
                UrlForIp: "http://httpbin.org/ip",
            }
        };
    };

    VerticalCommonFuncsClass = class {
        PullCardDataAttributes = {
            JsonConfigAndItemConfig: ({ inHtmlCard }) => {
                let jVarLocalReturnData = {};
                let jVarLocalDataset = inHtmlCard.dataset;

                if (jVarLocalDataset.hasOwnProperty("pk")) {
                    jVarLocalReturnData.pk = jVarLocalDataset.pk;
                };

                if (jVarLocalDataset.hasOwnProperty("insertkey")) {
                    jVarLocalReturnData.insertkey = jVarLocalDataset.insertkey;
                };

                jVarLocalReturnData.JsonConfig = JSON.parse(inHtmlCard.dataset.jsonconfig);
                jVarLocalReturnData.ItemConfig = JSON.parse(inHtmlCard.dataset.itemconfig);

                return jVarLocalReturnData;
            }
        }

        PreparePostData = {
            ForSave: ({ jVarHtmlCardBody }) => {
                let jVarLocalHtmlNamesArray = jVarHtmlCardBody.querySelectorAll("[name]");

                let jVarLocalFetchBodydata = {};

                jVarLocalHtmlNamesArray.forEach((LoopItem) => {
                    jVarLocalFetchBodydata[LoopItem.name] = LoopItem.value;

                    switch (LoopItem.tagName) {
                        case "INPUT":
                            jVarLocalFetchBodydata[LoopItem.name] = this.PreparePostData.CommonFuncs.ByTagName.ForTagInput({ inLoopItem: LoopItem });

                            break;

                        default:
                            switch (LoopItem.type) {
                                case "checkbox":
                                    jVarLocalFetchBodydata[LoopItem.name] = LoopItem.checked;
                                    break;
                                default:
                                    jVarLocalFetchBodydata[LoopItem.name] = LoopItem.value;
                                    break;
                            };
                            break;
                    };
                });

                return jVarLocalFetchBodydata;
            },
            CommonFuncs: {
                ByTagName: {
                    ForTagInput: ({ inLoopItem }) => {
                        let jVarLocalValue = inLoopItem.value;
                        let jVarLocalKeshavSoftStuffed;

                        if (inLoopItem.dataset.hasOwnProperty("keshavsoft")) {
                            jVarLocalKeshavSoftStuffed = JSON.parse(inLoopItem.dataset.keshavsoft);

                            if (inLoopItem.list !== null) {
                                if (jVarLocalKeshavSoftStuffed.DataListReverse) {
                                    jVarLocalValue = this.PreparePostData.CommonFuncs.ByTagName.collectionContains({ collection: inLoopItem.list.options, searchText: inLoopItem.value });
                                };
                            };

                        };
                        return jVarLocalValue;
                    },
                    collectionContains: ({ collection, searchText }) => {
                        for (var i = 0; i < collection.length; i++) {
                            if (collection[i].value.indexOf(searchText) > -1) {
                                return collection[i].text;
                            }
                        }
                        return "";
                    }
                }
            }
        }
    };

    VerticalCommonFuncs = new this.VerticalCommonFuncsClass();

    DataListFuns = {
        ReverseFunc: ({ inParentDiv }) => {
            try {
                // let jVarLocalDataListForReverse = inParentDiv.querySelectorAll("input[list][data-datalistreverse='true']");
                let jVarLocalDataListForReverse = inParentDiv.querySelectorAll("input[list][data-keshavsoft]");

                let jVarLocalDataListValue;

                jVarLocalDataListForReverse.forEach((LoopItem) => {
                    if (JSON.parse(LoopItem.dataset.keshavsoft).DataListReverse) {
                        jVarLocalDataListValue = this.DataListFuns.collectionContains({
                            collection: LoopItem.list.options,
                            searchText: LoopItem.dataset.ksdatalistvalue
                        });

                        LoopItem.value = jVarLocalDataListValue;
                    };
                });

            } catch (error) {
                console.log("error : ", error);
            };

        },
        collectionContains: ({ collection, searchText }) => {
            for (var i = 0; i < collection.length; i++) {
                if (collection[i].text === searchText) {
                    return collection[i].value;
                }
            }
            return "";
        }
    };

    AppendToDOM = {
        SetFocusFuncs: {
            TableFooterSaveFocus: ({ inHtmlParent }) => {
                let jVarLocalKCont1 = inHtmlParent;

                let jVarLocalElementsToFocus = jVarLocalKCont1.querySelector(".card .card-body table tfoot input");

                if (jVarLocalElementsToFocus !== undefined && jVarLocalElementsToFocus !== null) {
                    jVarLocalElementsToFocus.focus();
                };
            },
            VerticalCreateSubTableFocus: ({ inHtmlParent }) => {
                let jVarLocalKCont1 = inHtmlParent;

                let jVarLocalElementsToFocus = jVarLocalKCont1.querySelector(".card .card-body table tfoot input");

                if (jVarLocalElementsToFocus !== undefined && jVarLocalElementsToFocus !== null) {
                    jVarLocalElementsToFocus.focus();
                };
            },
            TableShow: ({ inHtmlParent }) => {
                let jVarLocalKCont1 = inHtmlParent;

                let jVarLocalElementsToFocus = jVarLocalKCont1.querySelector(".card .card-header input");

                if (jVarLocalElementsToFocus !== undefined && jVarLocalElementsToFocus !== null) {
                    jVarLocalElementsToFocus.focus();
                };
            },
            VerticalCreate: ({ inHtmlParent }) => {
                let jVarLocalKCont1 = inHtmlParent;
                let jVarLocalElementsToFocus = jVarLocalKCont1.querySelectorAll("input[data-dataattribute]");

                if (jVarLocalElementsToFocus.length > 0) {
                    jVarLocalElementsToFocus[0].focus();
                    return true;
                };
            }
        },
        SetFocusWithGlobalPresentViewData: ({ inHtmlParent }) => {
            let jVarLocalElementsToFocus;
            let jVarLocalKCont1 = inHtmlParent;
            let shouldSkip = false;

            jVarGlobalPresentViewData.forEach(element => {
                if (shouldSkip) {
                    return;
                }

                if (element.HTMLControlType === "Vertical") {
                    shouldSkip = this.AppendToDOM.SetFocusCommonFuncs.ControlTypeVertical({ inKCont1: jVarLocalKCont1, inelement: element.KData.TableInfo.TableRowOptions.DefaultFocus });

                    if (shouldSkip) {
                        return;
                    }
                };

                if (element.HTMLControlType === "Table") {
                    if (element.KData.TableInfo.FooterType.CreateNewRow.Style === "") {
                        jVarLocalElementsToFocus = jVarLocalKCont1.querySelector(".card .card-body table tfoot input");

                        if (!(jVarLocalElementsToFocus === undefined || jVarLocalElementsToFocus === null)) {
                            jVarLocalElementsToFocus.focus();
                            // return false;
                        };
                    } else {
                        jVarLocalElementsToFocus = jVarLocalKCont1.querySelector(".card .card-header input");

                        if (jVarLocalElementsToFocus !== undefined && jVarLocalElementsToFocus !== null) {
                            jVarLocalElementsToFocus.focus();
                            // return false;
                        };
                    };
                };
            });
        },
        RequiredHtml: ({ inData, inHtmlParent }) => {
            try {
                let jVarLocalHTMLContent;

                jVarLocalHTMLContent = Handlebars.compile(document.getElementById("Global/Common").innerText)(inData);
                inHtmlParent.innerHTML = jVarLocalHTMLContent;
                this.DataListFuns.ReverseFunc({ inParentDiv: inHtmlParent });
                // this.AppendToDOM.SetFocusWithGlobalPresentViewData({ inHtmlParent });

            } catch (error) {
                console.log("erro - BuildFromArrayDataCommon : ", error);
            }
        }
    };

    ApiFuncs = {
        Subtable: {
            Body: {
                Row: {
                    Update: async ({ inEvent }) => {
                        let jVarLocalCurrentTarget = inEvent.currentTarget;
                        let jVarLocalKCont1 = document.getElementById("KCont1");
                        let jVarClosestTr = jVarLocalCurrentTarget.closest("tr");

                        let jVarLocalRoute = this.Config.RouteStart.Start;
                        let jVarLocalSubRoute = this.Config.RouteStart.SubRoute;
                        let JsonPK = jVarClosestTr.dataset.pk;

                        let jVarLocalBody = this.ApiFuncs.Table.CommonFuncs.PrepareAsConfigs({ inCurrentTarget: jVarLocalCurrentTarget });

                        jVarLocalBody.SubTableRowPK = JsonPK;

                        //  let jVarLocalFetchUrl = `/${jVarLocalRoute}/${jVarLocalSubRoute}/Data/FromFolder/FromFile/ScreensFromDisplayJson/Vertical/HtmlCreate/Update`;
                        let jVarLocalFetchUrl = `/${jVarLocalRoute}/${jVarLocalSubRoute}/Data/FromFolder/FromFile/ScreensFromDisplayJson/SubTable/Body/Row/Update`;

                        //POST  http://localhost:4116/JsonProject/Api/Data/FromFolder/FromFile/ScreensFromDisplayJson/SubTable/Body/Row/Update

                        let jVarLocalFetchPostData = this.VerticalCommonFuncs.PreparePostData.ForSave({ jVarHtmlCardBody: jVarClosestTr });
                        jVarLocalBody.inDataToUpdate = jVarLocalFetchPostData;
                        let jVarLocalFetchHeaderObject = {
                            method: "post",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(jVarLocalBody)
                        };

                        let ReponseData = await fetch(jVarLocalFetchUrl, jVarLocalFetchHeaderObject);
                        let PromiseData = await ReponseData.json();

                    },
                    Edit: {
                        ButtonClick: ({ inEvent }) => {
                            let jVarLocalCurrentTarget = inEvent.currentTarget;
                            let jVarLocalClosestTd = jVarLocalCurrentTarget.closest("td");
                            jVarLocalClosestTd.classList.remove("ButtonClass");

                            let jVarLocalKTableId = jVarLocalCurrentTarget.closest("table");

                            let jVarLocalTableBodyRow = jVarLocalCurrentTarget.closest("tr");
                            let jVarLocalTableFooterRow = jVarLocalKTableId.querySelector("tfoot tr");
                            let jVarLocalTableFooterUpdate = jVarLocalTableFooterRow.querySelector("td.UpdateSubTableClass");

                            jVarLocalTableBodyRow.querySelectorAll("td.ButtonClass").forEach((element, LoopIndex) => {
                                element.parentNode.removeChild(element);
                            });

                            jVarLocalTableBodyRow.querySelectorAll("[class^='KCol']").forEach((element, LoopIndex) => {
                                if (element.querySelector("input") === null) {
                                    let jVarLocalOldValue = element.innerHTML.trim();
                                    let jVarLoopLocalClassList = element.classList[0];
                                    let jVarLoopLocalFind = jVarLocalTableFooterRow.querySelector(`[class*='${jVarLoopLocalClassList}']`);
                                    element.innerHTML = jVarLoopLocalFind.innerHTML;

                                    switch (element.querySelector("input").type) {
                                        case "number":
                                            element.querySelector("input").value = jVarLocalOldValue.replace(/,/g, "");
                                            break;
                                        default:
                                            element.querySelector("input").value = jVarLocalOldValue;
                                            break;
                                    };
                                };
                            });

                            jVarLocalClosestTd.innerHTML = jVarLocalTableFooterUpdate.innerHTML;
                        }
                    },
                    CommonFuncs: {
                        Update: {
                            PrepareBody: ({ inCurrentTarget }) => {
                                let jVarLocalReturnObject = { KTF: false, ReturnData: {} };

                                let jVarClosestTable = inCurrentTarget.closest("table");

                                if ("insertkey" in jVarClosestTable.dataset) {
                                    jVarLocalReturnObject.ReturnData.SubTableKey = jVarClosestTable.dataset.insertkey;
                                };

                                if ("pk" in jVarClosestTable.dataset) {
                                    jVarLocalReturnObject.ReturnData.RowPK = jVarClosestTable.dataset.pk;
                                };

                                return jVarLocalReturnObject;
                            }
                        }
                    }
                }
            }
        },
        Table: {
            CommonFuncs: {
                PrepareJsonAndItemConfigInsertKey: ({ inCurrentTarget }) => {
                    let jVarLocalCard = inCurrentTarget.closest("div.card");
                    let jVarLocalCardDataset = jVarLocalCard.dataset;

                    let jVarLocalJsonConfig = JSON.parse(jVarLocalCardDataset.jsonconfig);
                    let jVarLocalItemConfig = JSON.parse(jVarLocalCardDataset.itemconfig);

                    let jVarLocalReturnData = {
                        FolderName: jVarLocalJsonConfig.inFolderName,
                        FileName: jVarLocalJsonConfig.inJsonFileName,
                        ItemName: jVarLocalItemConfig.inItemName,
                        ScreenName: jVarLocalItemConfig.inScreenName,
                        InsertKey: jVarLocalCardDataset.insertkey,
                        MainRowPK: jVarLocalCardDataset.pk
                    };

                    return jVarLocalReturnData;
                },
                PrepareAsConfigs: ({ inCurrentTarget }) => {
                    let jVarLocalCard = inCurrentTarget.closest("div.card");
                    let jVarLocalCardDataset = jVarLocalCard.dataset;

                    let jVarLocalJsonConfig = JSON.parse(jVarLocalCardDataset.jsonconfig);
                    let jVarLocalItemConfig = JSON.parse(jVarLocalCardDataset.itemconfig);

                    let jVarLocalReturnData = {
                        JsonConfig: jVarLocalJsonConfig,
                        ItemConfig: jVarLocalItemConfig,
                        InsertKey: jVarLocalCardDataset.insertkey,
                        MainRowPK: jVarLocalCardDataset.pk
                    };

                    return jVarLocalReturnData;
                }
            },
            Footer: {
                KeyPress: {
                    EnterToServer: async ({ inEvent }) => {
                        if (inEvent.keyCode === 13) {
                            let jVarLocalRoute = this.Config.RouteStart.Start;
                            let jVarLocalSubRoute = this.Config.RouteStart.SubRoute;

                            let jVarLocalinEvent = inEvent.currentTarget;
                            let jVarLocalHtmlCard = jVarLocalinEvent.closest(".card");
                            let LocalClosestTableFooter = jVarLocalinEvent.closest("tr");

                            let LocalFooterInputElements;
                            let LocalDataFromServer;

                            let jVarLocalJsonConfig = jVarLocalHtmlCard.dataset.jsonconfig;
                            let jVarLocalItemConfig = jVarLocalHtmlCard.dataset.itemconfig;
                            let jVarLocalInsertKey = jVarLocalHtmlCard.dataset.insertkey;

                            let LocalObjectToPost = {};
                            LocalObjectToPost.DataToSearch = {};
                            LocalObjectToPost.DataToSearch[jVarLocalinEvent.name] = jVarLocalinEvent.value;
                            LocalObjectToPost.JsonConfig = JSON.parse(jVarLocalJsonConfig);
                            LocalObjectToPost.ItemConfig = JSON.parse(jVarLocalItemConfig);
                            LocalObjectToPost.insertkey = jVarLocalInsertKey;

                            let jVarLocalFetchUrl = `/${jVarLocalRoute}/${jVarLocalSubRoute}/Data/FromFolder/FromFile/ScreensFromDisplayJson/Tabular/Footer/KeyPress/EnterToServer`;

                            let response = await fetch(jVarLocalFetchUrl, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(LocalObjectToPost)
                            });

                            let FetchData = await response.json()

                            if (FetchData.KTF) {
                                LocalDataFromServer = FetchData.DataFromServer[0];
                                //loop the inputs on screen to fill data from server if any found

                                if (LocalClosestTableFooter === null) {
                                    LocalFooterInputElements = jVarLocalHtmlCard.querySelectorAll("[data-dataattribute]");
                                } else {
                                    LocalFooterInputElements = LocalClosestTableFooter.querySelectorAll("td [data-dataattribute]");
                                };

                                LocalFooterInputElements.forEach((LoopItem) => {
                                    if (LocalDataFromServer.hasOwnProperty(LoopItem.name)) {
                                        LoopItem.value = LocalDataFromServer[LoopItem.name];
                                    };
                                });
                            } else {
                                Swal.fire(FetchData.KReason);
                            }
                        }
                    }
                },
                Common: {
                    CheckBeforeSave: ({ inJVarTableFooter }) => {
                        let jVarLocalRetTf = true;

                        let jVarLocalDataSetObject;
                        let jVarLocalHtmlNamesArray = inJVarTableFooter.querySelectorAll("[name]");

                        jVarLocalHtmlNamesArray.forEach((LoopItem) => {
                            if (LoopItem.dataset.hasOwnProperty("keshavsoft")) {
                                jVarLocalDataSetObject = JSON.parse(LoopItem.dataset.keshavsoft);
                                if (jVarLocalDataSetObject.Validate) {
                                    if (LoopItem.classList.contains("is-invalid")) {
                                        LoopItem.classList.remove("is-invalid");
                                    };

                                    switch (jVarLocalDataSetObject.Type) {
                                        case "NotEmpty":
                                            if (LoopItem.value === "") {
                                                LoopItem.classList.add("is-invalid");
                                                LoopItem.focus();
                                                jVarLocalRetTf = false;
                                            };

                                            break;

                                        default:
                                            break;
                                    }
                                };
                            }
                        });

                        return jVarLocalRetTf;
                    },
                    jFPrepareDataFromFooterRow: ({ inTableID }) => {
                        let jvarLocalReturnArray = [];
                        let jvarLocalObject = {};
                        let jVarLocalFindOption;

                        inTableID.forEach((loopItem) => {
                            jvarLocalObject = {};
                            jvarLocalObject.name = loopItem.name;

                            if (loopItem.list === null) {
                                jvarLocalObject.value = loopItem.value;
                            } else {
                                jVarLocalFindOption = loopItem.list.querySelector(`option[value='${loopItem.value}']`);

                                if (jVarLocalFindOption !== null) {
                                    jvarLocalObject.value = jVarLocalFindOption.innerText;
                                }
                            };

                            jvarLocalReturnArray.push(jvarLocalObject);
                        });

                        return jvarLocalReturnArray;
                    },
                    SaveAndShowOnScreen: ({ inJVarParentElementToBeRetained, inDataToShow }) => {
                        inJVarParentElementToBeRetained.innerHTML = "";
                        let jVarLocalHTMLContent;
                        let jVarLocalDivToAppend = document.createElement("div");
                        jVarGlobalPresentViewData[0].KData.TableInfo.FooterType.CreateNewRow.Style = "";

                        jVarLocalHTMLContent = Handlebars.compile(jVarGlobalHBSData.Global.Common)(jVarGlobalPresentViewData);
                        jVarLocalDivToAppend.innerHTML = jVarLocalHTMLContent;

                        inJVarParentElementToBeRetained.appendChild(JVarGlobalAPICalls.HTMLPrepare.jFBS4Alerts.PrimaryClosableRet({ inJVarDataToDisplay: inDataToShow }));

                        inJVarParentElementToBeRetained.appendChild(jVarLocalDivToAppend);
                        inJVarParentElementToBeRetained.querySelectorAll("input[data-dataattribute]")[0].focus();
                    }
                },
                SaveFuncs: {
                    StartFunc: (inEvent) => {
                        inEvent.preventDefault();
                        let jVarLocalCurrentTarget = inEvent.currentTarget;
                        let jVarClosestCard = jVarLocalCurrentTarget.closest(".CardForItems");
                        let jVarLocalKCont1 = document.getElementById("KCont1");

                        let jVarLocalRoute = this.Config.RouteStart.Start;
                        let jVarLocalSubRoute = this.Config.RouteStart.SubRoute;
                        let jVarLocalHtmlCard = inEvent.currentTarget.closest(".card");
                        let jVarLocalHtmlCardBody = jVarLocalHtmlCard.querySelector(".card-body");
                        let jVarLocalTableFooterCreateRow = jVarLocalCurrentTarget.closest("[data-footertype='CreateNewRow']");

                        let jVarLocalPK = jVarLocalHtmlCard.dataset.pk;
                        let jVarLocalJsonConfig = jVarLocalHtmlCard.dataset.jsonconfig;
                        let jVarLocalItemConfig = jVarLocalHtmlCard.dataset.itemconfig;
                        let jVarLocalInsertKey = jVarLocalHtmlCard.dataset.insertkey;

                        let jVarLocalJsonConfigAndItemConfig = this.ApiFuncs.Table.Vertical.CommonFuncs.PullCardDataAttributes.JsonConfigAndItemConfig({ inHtmlCard: jVarLocalHtmlCard });

                        if (this.ApiFuncs.Table.Footer.Common.CheckBeforeSave({ inJVarTableFooter: jVarLocalTableFooterCreateRow })) {
                            let jVarLocalFetchPostData = this.VerticalCommonFuncs.PreparePostData.ForSave({ jVarHtmlCardBody: jVarLocalHtmlCardBody });
                            jVarLocalJsonConfigAndItemConfig.inDataToSave = jVarLocalFetchPostData;

                            let jVarLocalFetchUrl = `/${jVarLocalRoute}/${jVarLocalSubRoute}/Data/FromFolder/FromFile/ScreensFromDisplayJson/Tabular/Footer/Save`;

                            fetch(jVarLocalFetchUrl, {
                                method: "post",
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(jVarLocalJsonConfigAndItemConfig)
                            })
                                .then(response => response.json())
                                .then(dataFromApi => {
                                    if (dataFromApi.KTF === true) {
                                        if (dataFromApi.hasOwnProperty("DataFromServer")) {
                                            let jVarLocalElementToFocus;

                                            jVarGlobalPresentViewData = KeshavSoftCrud.BuildFromArray(dataFromApi.DataFromServer);

                                            jVarGlobalKeshavSoftLocalFuncsObject.AppendToDOM.RequiredHtml({
                                                inData: jVarGlobalPresentViewData,
                                                inHtmlParent: jVarLocalKCont1
                                            });

                                            jVarGlobalKeshavSoftLocalFuncsObject.AppendToDOM.SetFocusFuncs.TableFooterSaveFocus({ inHtmlParent: jVarLocalKCont1 });

                                        } else {

                                        };
                                    } else {
                                        Swal.fire(dataFromApi.KReason);
                                    }
                                });
                        };

                    }
                }
            },
            Card: {
                Config: {
                    PullJsonAndItemConfig: async (inJVarKThis) => {
                        let jVarLocalCard = inJVarKThis.closest(".card");
                        let jVarLocalDataset = jVarLocalCard.dataset;
                        let jVarLocalJsonConfig = JSON.parse(jVarLocalDataset.jsonconfig);
                        let jVarLocalItemConfig = JSON.parse(jVarLocalDataset.itemconfig);

                        let jVarLocalScreenName = jVarLocalItemConfig.inScreenName;
                        let jVarLocalItemName = jVarLocalItemConfig.inItemName;
                        let jVarLocalFileName = jVarLocalJsonConfig.inJsonFileName;
                        let jVarLocalFolderName = jVarLocalJsonConfig.inFolderName;

                        return {
                            inFolderName: jVarLocalFolderName,
                            inFileName: jVarLocalFileName,
                            inItemName: jVarLocalItemName,
                            inScreenName: jVarLocalScreenName
                        };
                    },
                    PullJsonAndItemConfig1: async (inJVarKThis) => {
                        let jVarLocalCard = inJVarKThis.closest(".card");
                        let jVarLocalDataset = jVarLocalCard.dataset;
                        let jVarLocalJsonConfig = JSON.parse(jVarLocalDataset.jsonconfig);
                        let jVarLocalItemConfig = JSON.parse(jVarLocalDataset.itemconfig);

                        let jVarLocalScreenName = jVarLocalItemConfig.inScreenName;
                        let jVarLocalItemName = jVarLocalItemConfig.inItemName;
                        let jVarLocalFileName = jVarLocalJsonConfig.inJsonFileName;
                        let jVarLocalFolderName = jVarLocalJsonConfig.inFolderName;

                        return {
                            inFolderName: jVarLocalFolderName,
                            inFileName: jVarLocalFileName,
                            inItemName: jVarLocalItemName,
                            inScreenName: jVarLocalScreenName
                        };
                    }
                },
                Header: {
                    AddButtonClick: async (inEvent) => {
                        let jVarLocalCurrentTarget = inEvent.currentTarget;
                        let jVarClosestCardBodyForItems = document.getElementById("KCont1");

                        let jVarLocalRoute = jVarGlobalClientObject.Config.RouteStart.Start;
                        let jVarLocalSubRoute = jVarGlobalClientObject.Config.RouteStart.SubRoute;
                        let jVarLocalBodyData = await this.ApiFuncs.Table.Card.Config.PullJsonAndItemConfig(jVarLocalCurrentTarget);

                        let jVarLocalFetchUrl = `/${jVarLocalRoute}/${jVarLocalSubRoute}/Data/FromFolder/FromFile/ScreensFromDisplayJson/Vertical/HtmlCreate/Fromjson`;

                        let response = await fetch(jVarLocalFetchUrl, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(jVarLocalBodyData)
                        });

                        let FetchData = await response.json()

                        if (FetchData.KTF) {

                            jVarGlobalPresentViewData = KeshavSoftCrud.BuildFromArray(FetchData.DataFromServer);

                            jVarGlobalKeshavSoftLocalFuncsObject.AppendToDOM.RequiredHtml({
                                inData: jVarGlobalPresentViewData,
                                inHtmlParent: jVarClosestCardBodyForItems
                            });

                            jVarGlobalKeshavSoftLocalFuncsObject.AppendToDOM.SetFocusFuncs.VerticalCreate({ inHtmlParent: jVarClosestCardBodyForItems });

                            return await true;
                        };
                    },
                    CommonFuncs: {
                        uuid: (mask = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') => {
                            return `${mask}`.replace(/[xy]/g, function (c) {
                                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                                return v.toString(16);
                            });
                        },
                        ToLocalStorage: ({ inData }) => {
                            let jVarLocalUUID = "";
                        }
                    }
                }
            },
            Body: {
                Row: {
                    ShowClick: ({ inEvent }) => {
                        let jVarLocalCurrentTarget = inEvent.currentTarget;
                        let jVarLocalKCont1 = document.getElementById("KCont1");

                        let jVarClosestCard = jVarLocalCurrentTarget.closest(".CardForItems");
                        let jVarClosestTr = jVarLocalCurrentTarget.closest("tr");

                        let jVarLocalRoute = this.Config.RouteStart.Start;
                        let jVarLocalSubRoute = this.Config.RouteStart.SubRoute;
                        let JsonPK = jVarClosestTr.dataset.pk;
                        let jVarLocalItemConfig = jVarGlobalClientObject.Api.UserData.CommonFuncs.PrepareJsonAndItemConfig({ inCurrentTarget: jVarLocalCurrentTarget });

                        let jVarLocalFolderName = jVarLocalItemConfig.FolderName;
                        let jVarLocalFileName = jVarLocalItemConfig.FileName;
                        let jVarLocalItemName = jVarLocalItemConfig.ItemName;
                        let jVarLocalScreenName = jVarLocalItemConfig.ScreenName;

                        let jVarLocalFetchUrl = `/${jVarLocalRoute}/${jVarLocalSubRoute}/Data/FromFolder/FromFile/ScreensFromDisplayJson/Tabular/Row/Show/FromParams/${jVarLocalFolderName}/${jVarLocalFileName}/${jVarLocalScreenName}/${jVarLocalItemName}/${JsonPK}`;

                        fetch(jVarLocalFetchUrl)
                            .then(response => {
                                if (!response.ok) { throw new Error(response.statusText) };

                                return response.json();
                            }).then((FetchData) => {
                                if (FetchData.KTF) {
                                    jVarGlobalPresentViewData = KeshavSoftCrud.BuildFromArray(FetchData.DataFromServer);

                                    jVarGlobalKeshavSoftLocalFuncsObject.AppendToDOM.RequiredHtml({
                                        inData: jVarGlobalPresentViewData,
                                        inHtmlParent: jVarLocalKCont1
                                    });
                                };
                            });
                    },
                    DeleteNew: ({ inEvent }) => {
                        let jVarLocalCurrentTarget = inEvent.currentTarget;
                        let jVarLocalKCont1 = document.getElementById("KCont1");

                        let jVarClosestCard = jVarLocalCurrentTarget.closest(".CardForItems");
                        let jVarClosestTr = jVarLocalCurrentTarget.closest("tr");

                        let jVarLocalRoute = this.Config.RouteStart.Start;
                        let jVarLocalSubRoute = this.Config.RouteStart.SubRoute;
                        let JsonPK = jVarClosestTr.dataset.pk;

                        let jVarLocalBody = this.ApiFuncs.Table.CommonFuncs.PrepareJsonAndItemConfigInsertKey({ inCurrentTarget: jVarLocalCurrentTarget });
                        jVarLocalBody.RowPK = JsonPK;

                        let jVarLocalFetchUrl = `/${jVarLocalRoute}/${jVarLocalSubRoute}/Data/FromFolder/FromFile/ScreensFromDisplayJson/Tabular/Row/Delete/FromRowPK`;

                        let jVarLocalFetchHeaderObject = {
                            method: "post",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(jVarLocalBody)
                        };

                        fetch(jVarLocalFetchUrl, jVarLocalFetchHeaderObject).then(response => {
                            if (!response.ok) { throw new Error(response.statusText) };

                            return response.json();
                        }).then((FetchData) => {
                            if (FetchData.KTF) {
                                jVarGlobalPresentViewData = KeshavSoftCrud.BuildFromArray(FetchData.DataFromServer);

                                jVarGlobalKeshavSoftLocalFuncsObject.AppendToDOM.RequiredHtml({
                                    inData: jVarGlobalPresentViewData,
                                    inHtmlParent: jVarLocalKCont1
                                });

                                Swal.fire("Deleted!");
                            };
                        });
                    },
                    Update: async ({ inEvent }) => {
                        let jVarLocalCurrentTarget = inEvent.currentTarget;
                        let jVarLocalKCont1 = document.getElementById("KCont1");

                        let jVarClosestCard = jVarLocalCurrentTarget.closest(".CardForItems");
                        let jVarClosestTr = jVarLocalCurrentTarget.closest("tr");

                        let jVarLocalRoute = this.Config.RouteStart.Start;
                        let jVarLocalSubRoute = this.Config.RouteStart.SubRoute;
                        let JsonPK = jVarClosestTr.dataset.pk;

                        let jVarLocalBody = this.ApiFuncs.Table.CommonFuncs.PrepareAsConfigs({ inCurrentTarget: jVarLocalCurrentTarget });
                        jVarLocalBody.pk = JsonPK;

                        let jVarLocalFetchUrl = `/${jVarLocalRoute}/${jVarLocalSubRoute}/Data/FromFolder/FromFile/ScreensFromDisplayJson/Vertical/HtmlCreate/Update`;

                        let jVarLocalFetchPostData = this.VerticalCommonFuncs.PreparePostData.ForSave({ jVarHtmlCardBody: jVarClosestTr });
                        jVarLocalBody.inDataToUpdate = jVarLocalFetchPostData;

                        let jVarLocalFetchHeaderObject = {
                            method: "post",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(jVarLocalBody)
                        };

                        let ReponseData = await fetch(jVarLocalFetchUrl, jVarLocalFetchHeaderObject);
                        let PromiseData = await ReponseData.json();
                    },
                    Edit: {
                        ButtonClick: ({ inEvent }) => {
                            let jVarLocalCurrentTarget = inEvent.currentTarget;

                            let jVarLocalKTableId = jVarLocalCurrentTarget.closest("table");

                            let jVarLocalTableBodyRow = jVarLocalCurrentTarget.closest("tr");
                            let jVarLocalTableFooterRow = jVarLocalKTableId.querySelector("tfoot tr");

                            let jVarLocalClonedRow = jVarLocalTableFooterRow.cloneNode(true);

                            let jVarLocalClonedRowTds = jVarLocalClonedRow.querySelectorAll("[class^='KCol']");
                            jVarLocalClonedRow.querySelector("td.SaveClass").style.display = "none";
                            jVarLocalClonedRow.querySelector("td.UpdateClass").style.display = "";

                            let jVarLocalValuesArray = [];

                            jVarLocalClonedRowTds.forEach(element => {
                                let jVarLoopLocalClassList = element.classList[0];
                                let jVarLoopLocalFind = jVarLocalTableBodyRow.querySelector(`[class*='${jVarLoopLocalClassList}']`);
                                jVarLocalValuesArray.push(jVarLoopLocalFind.innerHTML.trim());
                            });

                            jVarLocalTableBodyRow.innerHTML = jVarLocalClonedRow.innerHTML;

                            jVarLocalTableBodyRow.querySelectorAll("[class^='KCol']").forEach((element, LoopIndex) => {
                                element.querySelector("input").value = jVarLocalValuesArray[LoopIndex];
                            });


                        }
                    }

                }
            },
            Vertical: {
                SaveFuncs: {
                    StartFunc: (inEvent) => {
                        let jVarLocalCurrentTarget = inEvent.currentTarget;
                        let jVarLocalKCont1 = document.getElementById("KCont1");

                        let jVarLocalHtmlCard = jVarLocalCurrentTarget.closest(".KTableDivClass");
                        let jVarLocalHtmlCardBody = jVarLocalHtmlCard.querySelector(".KCardBody");
                        let jVarClosestKTableDivClass = jVarLocalCurrentTarget.closest(".KTableDivClass");
                        let jVarLocalKCardBody = jVarClosestKTableDivClass.querySelector(".KCardBody");

                        if (this.ApiFuncs.Table.Vertical.SaveFuncs.CommonFuncs.CheckBeforeSave(jVarLocalHtmlCardBody)) {
                            let jVarLocalFetchPostData = this.VerticalCommonFuncs.PreparePostData.ForSave({ jVarHtmlCardBody: jVarLocalHtmlCardBody });

                            this.ApiFuncs.Table.Vertical.SaveFuncs.CommonFuncs.SaveOnlyFetch({
                                inHtmlCard: jVarLocalHtmlCard,
                                inCardBodyForItems: jVarLocalKCardBody,
                                inFetchPostData: jVarLocalFetchPostData,
                                inKCont1: jVarLocalKCont1
                            }).then(PromiseData => {
                            });
                        };
                    },
                    CommonFuncs: {
                        CheckBeforeSave: (jVarHtmlCardBody) => {
                            let jVarLocalRetTf = true;

                            let jVarLocalDataSetObject;
                            let jVarLocalHtmlNamesArray = jVarHtmlCardBody.querySelectorAll("[name]");

                            jVarLocalHtmlNamesArray.forEach((LoopItem) => {
                                if (LoopItem.dataset.hasOwnProperty("keshavsoft")) {
                                    jVarLocalDataSetObject = JSON.parse(LoopItem.dataset.keshavsoft);
                                    if (jVarLocalDataSetObject.Validate) {
                                        if (LoopItem.classList.contains("is-invalid")) {
                                            LoopItem.classList.remove("is-invalid");
                                        };

                                        switch (jVarLocalDataSetObject.Type) {
                                            case "NotEmpty":
                                                if (LoopItem.value === "") {
                                                    LoopItem.classList.add("is-invalid");
                                                    LoopItem.focus();
                                                    jVarLocalRetTf = false;
                                                };

                                                break;

                                            default:
                                                break;
                                        }
                                    };
                                }
                            });

                            return jVarLocalRetTf;

                        },
                        PullIpAddressThenSaveOnly: ({ inHtmlCard, inFetchPostData, inCardBodyForItems, inKCont1 }) => {
                            return new Promise((resolve, reject) => {
                                fetch(this.Config.ClientSide.UrlForIp).then(response => response.text()).then((FetchIpData) => {
                                    inFetchPostData.ClientIP = JSON.parse(FetchIpData).origin;

                                    this.ApiFuncs.Table.Vertical.SaveFuncs.CommonFuncs.SaveOnlyFetch({ inHtmlCard, inFetchPostData, inCardBodyForItems, inKCont1 }).then((PromiseData) => {
                                        resolve(PromiseData);
                                    }).catch((PromiseError) => {
                                        resolve(PromiseError);
                                    });
                                }).catch((FetchIpError) => {
                                    this.ApiFuncs.Table.Vertical.SaveFuncs.CommonFuncs.SaveOnlyFetch({ inHtmlCard, inFetchPostData, inCardBodyForItems, inKCont1 }).then((PromiseData) => {
                                        resolve(PromiseData);
                                    }).catch((PromiseError) => {
                                        resolve(PromiseError);
                                    });
                                });
                            });
                        },
                        SaveOnlyFetch: ({ inHtmlCard, inFetchPostData, inCardBodyForItems, inKCont1 }) => {
                            return new Promise((resolve, reject) => {
                                let jVarLocalRoute = this.Config.RouteStart.Start;
                                let jVarLocalSubRoute = this.Config.RouteStart.SubRoute;
                                let jVarLocalJsonConfigAndItemConfig = this.ApiFuncs.Table.Vertical.CommonFuncs.PullCardDataAttributes.JsonConfigAndItemConfig({ inHtmlCard });

                                jVarLocalJsonConfigAndItemConfig.inDataToSave = inFetchPostData;

                                let jVarLocalFetchUrl = `/${jVarLocalRoute}/${jVarLocalSubRoute}/Data/FromFolder/FromFile/ScreensFromDisplayJson/Vertical/HtmlCreate/Save`;

                                fetch(jVarLocalFetchUrl, {
                                    method: "post",
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(jVarLocalJsonConfigAndItemConfig)
                                }).then(response => response.json())
                                    .then(dataFromApi => {
                                        if (dataFromApi.KTF === false) {
                                            inHtmlCard.classList.remove("border-success");
                                            inHtmlCard.classList.add("border-danger");
                                            let jVarLocalShowFailure = inHtmlCard.querySelector("#ShowFailure");
                                            jVarLocalShowFailure.classList.remove("visually-hidden");
                                        } else {
                                            let jVarLocalKSHtmlFindRow = document.getElementById("KSHtmlFindRow");
                                            if (jVarLocalKSHtmlFindRow !== null) {
                                                jVarLocalKSHtmlFindRow.dataset.pk = dataFromApi.kPK;
                                            };
                                            if (this.ApiFuncs.Table.Vertical.SaveFuncs.CommonFuncs.PostSave({ inDataFromSave: dataFromApi, inCardBodyForItems, inHtmlCard, inKCont1 })) {
                                                resolve(dataFromApi);
                                            };
                                        };
                                    });
                            });
                        },
                        PostSave: ({ inDataFromSave, inCardBodyForItems, inHtmlCard, inKCont1 }) => {
                            if (inDataFromSave.KTF) {
                                if (inDataFromSave.hasOwnProperty("DataFromServer")) {
                                    jVarGlobalPresentViewData = KeshavSoftCrud.BuildFromArray(inDataFromSave.DataFromServer);
                                    jVarGlobalKeshavSoftLocalFuncsObject.AppendToDOM.RequiredHtml({
                                        inData: jVarGlobalPresentViewData,
                                        inHtmlParent: inKCont1
                                    });
                                } else {
                                    let jVarLocalShowFailure = inHtmlCard.querySelector(".WarningAlertColumn");
                                    jVarLocalShowFailure.classList.remove("visually-hidden");

                                    if ("KReason" in inDataFromSave) {
                                        jVarLocalShowFailure.querySelector("p").innerHTML = inDataFromSave.KReason;
                                    };
                                };
                            };
                        }
                    }
                },
                CommonFuncs: {
                    PullCardDataAttributes: {
                        JsonConfigAndItemConfig: ({ inHtmlCard }) => {
                            let jVarLocalReturnData = {};
                            let jVarLocalDataset = inHtmlCard.dataset;

                            if (Object.keys(inHtmlCard.dataset).length > 0) {
                                if (jVarLocalDataset.hasOwnProperty("pk")) {
                                    jVarLocalReturnData.pk = jVarLocalDataset.pk;
                                };

                                if (jVarLocalDataset.hasOwnProperty("insertkey")) {
                                    jVarLocalReturnData.insertkey = jVarLocalDataset.insertkey;
                                };

                                jVarLocalReturnData.JsonConfig = JSON.parse(inHtmlCard.dataset.jsonconfig);
                                jVarLocalReturnData.ItemConfig = JSON.parse(inHtmlCard.dataset.itemconfig);
                            };

                            return jVarLocalReturnData;
                        }
                    }
                },
                Footer: {
                    Update: {
                        StartFunc: async ({ inEvent }) => {
                            let jVarLocalRoute = this.Config.RouteStart.Start;
                            let jVarLocalSubRoute = this.Config.RouteStart.SubRoute;

                            let jVarLocalCurrentTarget = inEvent.currentTarget;
                            let jVarLocalKCont1 = document.getElementById("KCont1");

                            let jVarLocalHtmlCard = jVarLocalCurrentTarget.closest(".KTableDivClass");
                            let jVarLocalHtmlCardBody = jVarLocalHtmlCard.querySelector(".KCardBody");
                            let jVarClosestKTableDivClass = jVarLocalCurrentTarget.closest(".KTableDivClass");
                            let jVarLocalKCardBody = jVarClosestKTableDivClass.querySelector(".KCardBody");

                            if (this.ApiFuncs.Table.Vertical.SaveFuncs.CommonFuncs.CheckBeforeSave(jVarLocalHtmlCardBody)) {
                                let jVarLocalFetchPostData = this.VerticalCommonFuncs.PreparePostData.ForSave({ jVarHtmlCardBody: jVarLocalHtmlCardBody });

                                let jVarLocalJsonConfigAndItemConfig = this.ApiFuncs.Table.Vertical.CommonFuncs.PullCardDataAttributes.JsonConfigAndItemConfig({ inHtmlCard: jVarLocalHtmlCard });

                                jVarLocalJsonConfigAndItemConfig.inDataToUpdate = jVarLocalFetchPostData;

                                let jVarLocalFetchUrl = `/${jVarLocalRoute}/${jVarLocalSubRoute}/Data/FromFolder/FromFile/ScreensFromDisplayJson/Vertical/HtmlCreate/Update`;
                                let jVarLocalFetchHeaders = {
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(jVarLocalJsonConfigAndItemConfig)
                                };

                                let ReponseData = await fetch(jVarLocalFetchUrl, jVarLocalFetchHeaders);
                                let PromiseData = await ReponseData.json();

                                if (PromiseData.KTF) {
                                    if ("DataFromServer" in PromiseData) {
                                        jVarGlobalPresentViewData = KeshavSoftCrud.BuildFromArray(PromiseData.DataFromServer);
                                        jVarGlobalKeshavSoftLocalFuncsObject.AppendToDOM.RequiredHtml({
                                            inData: jVarGlobalPresentViewData,
                                            inHtmlParent: jVarLocalKCont1
                                        });
                                    } else {
                                        jVarLocalHtmlCard.classList.remove("border-success");
                                        jVarLocalHtmlCard.classList.add("border-danger");

                                        let jVarLocalShowFailure = jVarLocalHtmlCard.querySelector(".WarningAlertColumn");
                                        jVarLocalShowFailure.classList.remove("visually-hidden");

                                        if ("KReason" in PromiseData) {
                                            jVarLocalShowFailure.querySelector("p").innerHTML = PromiseData.KReason;
                                        };
                                    };
                                };
                            };
                        }
                    }
                }
            }
        },
        Vertical: {
            KeyPress: {
                EnterToServer: async ({ inEvent }) => {
                    if (inEvent.keyCode === 13) {
                        let jVarLocalRoute = this.Config.RouteStart.Start;
                        let jVarLocalSubRoute = this.Config.RouteStart.SubRoute;

                        let jVarLocalinEvent = inEvent.currentTarget;
                        let jVarLocalCurrentValue = jVarLocalinEvent.value;
                        let jVarLocalCurrentName = jVarLocalinEvent.name;

                        let jVarLocalHtmlCard = jVarLocalinEvent.closest(".card");

                        let LocalFooterInputElements;
                        let LocalDataFromServer;

                        let jVarLocalJsonConfig = jVarLocalHtmlCard.dataset.jsonconfig;
                        let jVarLocalItemConfig = jVarLocalHtmlCard.dataset.itemconfig;
                        let jVarLocalInsertKey = jVarLocalHtmlCard.dataset.insertkey;

                        let LocalObjectToPost = {};

                        LocalObjectToPost.DataToSearch = {};
                        LocalObjectToPost.DataToSearch[jVarLocalinEvent.name] = jVarLocalCurrentValue;
                        LocalObjectToPost.JsonConfig = JSON.parse(jVarLocalJsonConfig);
                        LocalObjectToPost.ItemConfig = JSON.parse(jVarLocalItemConfig);
                        LocalObjectToPost.insertkey = jVarLocalInsertKey;

                        let jVarLocalFetchUrl = `/${jVarLocalRoute}/${jVarLocalSubRoute}/Data/FromFolder/FromFile/ScreensFromDisplayJson/Tabular/Footer/KeyPress/EnterToServer`;

                        let response = await fetch(jVarLocalFetchUrl, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(LocalObjectToPost)
                        });

                        let FetchData = await response.json();

                        if (FetchData.KTF) {
                            LocalDataFromServer = FetchData.DataFromServer[0];

                            this.ApiFuncs.Vertical.KeyPress.CommonFuncs.AfterFetch({
                                inDataFromServer: LocalDataFromServer,
                                inHtmlCard: jVarLocalHtmlCard,
                                inCurrentName: jVarLocalCurrentName
                            });

                        } else {
                            Swal.fire(FetchData.KReason);
                        }
                    }
                },
                CommonFuncs: {
                    AfterFetch: ({ inDataFromServer, inHtmlCard, inCurrentName }) => {
                        let jVarLocalVerticalInputElements = inHtmlCard.querySelectorAll("[data-dataattribute]");
                        jVarLocalVerticalInputElements.forEach((LoopItem) => {
                            if (LoopItem.name.replace(inCurrentName, "") in inDataFromServer) {
                                LoopItem.value = inDataFromServer[LoopItem.name.replace(inCurrentName, "")];
                            };
                        });
                    }
                }
            }
        }
    };
};

export { KeshavSoftLocalFuncs };