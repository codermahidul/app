import { RefreshTable } from "../../DataTable.js";
import { Fetching } from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";
import { resetForm } from "../../functions/Common.js";
import getObjFormData from "../../functions/ObjectFormData.js";


const SaveTopShowBtn = document.getElementById("saveTopShowBtn");


export const TopShows = (id, url = "fetchdata/addnewtopshow") => {

    resetForm("frmTopShow", false)
    let modal = "modalSendTop";
    SaveTopShowBtn.dataset.topid = id;
    SaveTopShowBtn.dataset.action = url;
    $("#" + modal).modal("show");

}


export const TopShowAction = (url, param, userType) => {

    block();
    let data = SaveTopShowBtn.dataset;
    let topid = data.topid
    let id = data.id
    let action = data.action
    let formData = getObjFormData("frmTopShow");
    formData = { ...formData, ...{ 'id_table': topid, userType } };
    if (formData.type_show === "delete") {
        action = url;
    }

    formData = { ...formData, ...param };


    Fetching(action, formData).then((data) => {
        if (data.status === "true") {
            $("#" + id).modal("hide");
            toast("successful", "success");
            RefreshTable();
            resetForm("frmTopShow", false);
        } else {
            toast(data.err, "error");
        }

        unblock();
    })


}

export const TopShowActionBusiness = (url, param,Reset=()=>{}) => {

    block();

    let action = url


    Fetching(action, param).then((data) => {
        if (data.status === "true") {
         
            toast("successful", "success");
            Reset()
        } else {
            toast(data.err, "error");
        }

        unblock();
    })


}