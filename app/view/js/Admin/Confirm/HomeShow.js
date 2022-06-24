import { RefreshTable } from "../../DataTable.js";
import { Fetching } from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";
import { resetForm } from "../../functions/Common.js";
import getObjFormData from "../../functions/ObjectFormData.js";


const saveHomeShowBtn = document.getElementById("saveHomeShowBtn");


export const HomeShows = (id, url = "fetchdata/addnewhomeshow") => {

    resetForm("frmHomeShow", false)
    let modal = "modalSendHome";


    saveHomeShowBtn.dataset.topid = id;
    saveHomeShowBtn.dataset.action = url;
    $("#" + modal).modal("show");

}


export const HomeShowAction = (url, param,userType) => {

    block();
    let data = saveHomeShowBtn.dataset;
    let topid = data.topid
    let id = data.id
    let action = data.action
    let formData = getObjFormData("frmHomeShow");
    formData = { ...formData, ...{ 'id_table': topid,userType } };
    if (formData.type_show === "delete") {
        action = url;
    }

    formData = { ...formData, ...param };


    Fetching(action, formData).then((data) => {
        if (data.status === "true") {
            $("#" + id).modal("hide");
            toast("successful", "success");
            RefreshTable();
            resetForm("frmHomeShow", false);
        } else {
            toast(data.err, "error");
        }

        unblock();
    })


}

